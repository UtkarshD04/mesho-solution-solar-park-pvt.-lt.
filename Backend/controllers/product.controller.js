const Product = require('../models/product.model');

// Public — get all published products
exports.getPublicProducts = async (req, res) => {
  try {
    const products = await Product.find({ isPublished: true }).sort({ createdAt: 1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
};

// Public — get single product
exports.getPublicProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product.' });
  }
};

// Admin — get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
};

// Admin — create product
exports.createProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    if (typeof data.specs === 'string') data.specs = JSON.parse(data.specs);
    if (typeof data.useCases === 'string') data.useCases = JSON.parse(data.useCases);
    if (typeof data.isPublished === 'string') data.isPublished = data.isPublished === 'true';
    if (req.file) data.image = `/uploads/${req.file.filename}`;

    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to create product.' });
  }
};

// Admin — update product
exports.updateProduct = async (req, res) => {
  try {
    const data = { ...req.body };

    if (typeof data.specs === 'string') data.specs = JSON.parse(data.specs);
    if (typeof data.useCases === 'string') data.useCases = JSON.parse(data.useCases);
    if (typeof data.isPublished === 'string') data.isPublished = data.isPublished === 'true';
    if (req.file) data.image = `/uploads/${req.file.filename}`;

    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product.' });
  }
};

// Admin — delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product.' });
  }
};
