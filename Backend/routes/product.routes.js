const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authAdmin } = require('../middleware/admin.middleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype))
      return cb(null, true);
    cb(new Error('Only image files allowed.'));
  },
});

// Admin routes (must be before /:id to avoid conflict)
router.get('/admin/all', authAdmin, productController.getAllProducts);
router.post('/admin', authAdmin, upload.single('image'), productController.createProduct);
router.put('/admin/:id', authAdmin, upload.single('image'), productController.updateProduct);
router.delete('/admin/:id', authAdmin, productController.deleteProduct);

// Public routes
router.get('/', productController.getPublicProducts);
router.get('/:id', productController.getPublicProduct);

module.exports = router;
