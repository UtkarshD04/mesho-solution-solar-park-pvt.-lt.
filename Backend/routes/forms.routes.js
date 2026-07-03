const express = require('express');
const multer  = require('multer');
const path    = require('path');
const router  = express.Router();
const { submitProductEnquiry, submitBecomePartner, submitAfterSales } = require('../controllers/forms.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
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

router.post('/product-enquiry',  submitProductEnquiry);
router.post('/become-partner',   submitBecomePartner);
router.post('/after-sales',      upload.single('invoice'), submitAfterSales);

module.exports = router;
