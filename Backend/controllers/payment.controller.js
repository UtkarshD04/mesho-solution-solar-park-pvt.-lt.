const crypto = require('crypto');
const Razorpay = require('razorpay');
const { body, validationResult } = require('express-validator');
const Product = require('../models/product.model');
const Payment = require('../models/payment.model');

const MAX_QUANTITY_PER_ITEM = 10;

function getGateway() {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) throw new Error('Payment gateway is not configured.');
  return new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left || '', 'utf8');
  const rightBuffer = Buffer.from(right || '', 'utf8');
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

exports.createOrderValidation = [
  body('items').isArray({ min: 1, max: 20 }),
  body('items.*.productId').isMongoId(),
  body('items.*.quantity').isInt({ min: 1, max: MAX_QUANTITY_PER_ITEM }).toInt(),
];

exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid order items.', errors: errors.array() });

  try {
    const quantities = new Map();
    for (const item of req.body.items) {
      quantities.set(item.productId, (quantities.get(item.productId) || 0) + item.quantity);
    }
    if ([...quantities.values()].some((quantity) => quantity > MAX_QUANTITY_PER_ITEM)) {
      return res.status(400).json({ message: `Maximum quantity per product is ${MAX_QUANTITY_PER_ITEM}.` });
    }

    const products = await Product.find({ _id: { $in: [...quantities.keys()] }, isPublished: true })
      .select('model priceInPaise stock status');
    if (products.length !== quantities.size) return res.status(400).json({ message: 'One or more products are unavailable.' });

    const items = [];
    for (const product of products) {
      const quantity = quantities.get(String(product._id));
      if (!Number.isInteger(product.priceInPaise) || product.priceInPaise < 100) {
        return res.status(400).json({ message: `${product.model} does not have a valid price.` });
      }
      if (product.status === 'Out of Stock' || product.stock < quantity) {
        return res.status(400).json({ message: `${product.model} is not available in the requested quantity.` });
      }
      items.push({ product: product._id, model: product.model, quantity, unitAmount: product.priceInPaise });
    }

    const amount = items.reduce((total, item) => total + item.unitAmount * item.quantity, 0);
    const receipt = `pay_${crypto.randomUUID().replace(/-/g, '').slice(0, 28)}`;
    const gatewayOrder = await getGateway().orders.create({ amount, currency: 'INR', receipt, notes: { userId: String(req.user._id) } });
    const payment = await Payment.create({ user: req.user._id, receipt, amount, items, gatewayOrderId: gatewayOrder.id });

    return res.status(201).json({
      paymentId: payment._id,
      orderId: gatewayOrder.id,
      amount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Payment order creation failed:', error.message);
    return res.status(503).json({ message: 'Unable to create payment order. Please try again.' });
  }
};

// This is a convenience confirmation for the checkout UI. Fulfilment must rely on the webhook below.
exports.verifyCheckout = async (req, res) => {
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;
  if (![orderId, paymentId, signature].every((value) => typeof value === 'string' && value.length < 256)) {
    return res.status(400).json({ message: 'Invalid payment verification payload.' });
  }
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '').update(`${orderId}|${paymentId}`).digest('hex');
  if (!safeEqual(expected, signature)) return res.status(400).json({ message: 'Payment signature verification failed.' });

  const payment = await Payment.findOne({ gatewayOrderId: orderId, user: req.user._id });
  if (!payment) return res.status(404).json({ message: 'Payment order not found.' });
  if (payment.gatewayPaymentId && payment.gatewayPaymentId !== paymentId) return res.status(409).json({ message: 'Payment already has a different transaction.' });
  if (payment.status === 'created') {
    payment.status = 'authorized';
    payment.gatewayPaymentId = paymentId;
    payment.gatewaySignature = signature;
    await payment.save();
  }
  return res.status(200).json({ message: 'Payment received. Confirmation is pending.', status: payment.status });
};

exports.handleWebhook = async (req, res) => {
  const signature = req.get('x-razorpay-signature');
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return res.status(400).json({ message: 'Webhook signature is required.' });
  const expected = crypto.createHmac('sha256', secret).update(req.body).digest('hex');
  if (!safeEqual(expected, signature)) return res.status(400).json({ message: 'Invalid webhook signature.' });

  let event;
  try { event = JSON.parse(req.body.toString('utf8')); } catch { return res.status(400).json({ message: 'Invalid webhook body.' }); }
  const orderId = event.payload?.payment?.entity?.order_id;
  const paymentId = event.payload?.payment?.entity?.id;
  if (!orderId || !paymentId) return res.status(200).json({ received: true });

  const update = { $addToSet: { webhookEventIds: event.id } };
  const query = { gatewayOrderId: orderId, webhookEventIds: { $ne: event.id } };
  if (event.event === 'payment.captured') Object.assign(update, { $set: { status: 'paid', gatewayPaymentId: paymentId, paidAt: new Date() } });
  if (event.event === 'payment.failed') {
    query.status = { $ne: 'paid' };
    Object.assign(update, { $set: { status: 'failed', gatewayPaymentId: paymentId, failureReason: event.payload.payment.entity.error_description || 'Payment failed' } });
  }
  await Payment.findOneAndUpdate(query, update);
  return res.status(200).json({ received: true });
};

exports.getMyPayment = async (req, res) => {
  const payment = await Payment.findOne({ _id: req.params.id, user: req.user._id }).select('-gatewaySignature -webhookEventIds');
  if (!payment) return res.status(404).json({ message: 'Payment not found.' });
  return res.status(200).json(payment);
};
