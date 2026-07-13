const express = require('express');
const multer  = require('multer');
const path    = require('path');
const crypto  = require('crypto');
const { body, validationResult } = require('express-validator');
const rateLimit = require('../middleware/rateLimit.middleware');
const router  = express.Router();
const { submitProductEnquiry, submitBecomePartner, submitAfterSales } = require('../controllers/forms.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'));
  },
});

const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });
    next();
  },
];

const commonFields = [
  body('firstName').trim().isLength({ min: 2, max: 80 }),
  body('lastName').trim().isLength({ min: 2, max: 80 }),
  body('email').trim().isEmail().normalizeEmail(),
  body('phone').trim().matches(/^[+0-9() -]{8,20}$/),
  body('pinCode').trim().matches(/^\d{6}$/),
];

router.post('/product-enquiry', rateLimit({ max: 10 }), validate([...commonFields, body('product').trim().isLength({ min: 1, max: 120 }), body('hearAbout').trim().isLength({ min: 1, max: 100 })]), submitProductEnquiry);
router.post('/become-partner', rateLimit({ max: 10 }), validate([...commonFields, body('businessName').trim().isLength({ min: 2, max: 120 }), body('businessType').trim().isLength({ min: 1, max: 100 }), body('interestedCity').trim().isLength({ min: 1, max: 100 }), body('hearAbout').trim().isLength({ min: 1, max: 100 })]), submitBecomePartner);
router.post('/after-sales', rateLimit({ max: 10 }), upload.single('invoice'), validate([body('firstName').trim().isLength({ min: 2, max: 80 }), body('lastName').trim().isLength({ min: 2, max: 80 }), body('email').trim().isEmail().normalizeEmail(), body('phone').trim().matches(/^[+0-9() -]{8,20}$/), body('model').trim().isLength({ min: 1, max: 120 }), body('issue').trim().isLength({ min: 5, max: 2000 })]), submitAfterSales);

module.exports = router;
