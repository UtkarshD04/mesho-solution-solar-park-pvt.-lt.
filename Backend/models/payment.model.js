const mongoose = require('mongoose');

const paymentItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  model: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitAmount: { type: Number, required: true, min: 1 }, // paise
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  receipt: { type: String, required: true, unique: true },
  gateway: { type: String, enum: ['razorpay'], default: 'razorpay' },
  currency: { type: String, default: 'INR', immutable: true },
  amount: { type: Number, required: true, min: 1 }, // paise; calculated only on the server
  items: { type: [paymentItemSchema], required: true },
  status: { type: String, enum: ['created', 'authorized', 'paid', 'failed', 'refunded'], default: 'created', index: true },
  gatewayOrderId: { type: String, unique: true, sparse: true },
  gatewayPaymentId: { type: String, unique: true, sparse: true },
  gatewaySignature: { type: String, select: false },
  webhookEventIds: { type: [String], default: [] },
  paidAt: Date,
  failureReason: String,
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Payment', paymentSchema);
