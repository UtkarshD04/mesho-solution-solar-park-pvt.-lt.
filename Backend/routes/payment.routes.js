const express = require('express');
const router = express.Router();
const { authUser } = require('../middleware/auth.middleware');
const paymentController = require('../controllers/payment.controller');

router.post('/orders', authUser, paymentController.createOrderValidation, paymentController.createOrder);
router.post('/verify', authUser, paymentController.verifyCheckout);
router.get('/:id', authUser, paymentController.getMyPayment);

module.exports = router;
