# Razorpay payment gateway

The backend owns the product price and calculates every total in paise. Never accept an amount or a Razorpay key secret from the client.

## Environment

Copy `.env.example` values into the deployment environment. Use Razorpay test keys locally and live keys only in production. Do not commit either secret.

Configure this Razorpay webhook URL:

`https://<api-host>/api/payments/webhook`

Subscribe to `payment.captured` and `payment.failed`, set the webhook secret as `RAZORPAY_WEBHOOK_SECRET`, and enable only HTTPS in production.

## Checkout API

Authenticated customers create an order with:

```json
POST /api/payments/orders
{ "items": [{ "productId": "<Mongo product id>", "quantity": 1 }] }
```

The response includes `orderId`, `amount`, `currency`, and public `keyId` for Razorpay Checkout. Send the checkout response to `POST /api/payments/verify` for an immediate signature check, but only treat an order as paid after the signed `payment.captured` webhook updates its status.

Every sellable product needs a valid `priceInPaise` (for example, `1499999` for ₹14,999.99). Prices are intentionally not seeded: set reviewed prices through the protected product administration API before accepting payments.
