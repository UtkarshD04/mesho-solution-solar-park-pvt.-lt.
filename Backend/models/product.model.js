const mongoose = require('mongoose');

const specSchema = new mongoose.Schema({ label: String, value: String }, { _id: false });

const productSchema = new mongoose.Schema({
  series:      { type: String, required: true },
  model:       { type: String, required: true, unique: true },
  tagline:     { type: String, default: '' },
  type:        { type: String, default: '' },
  badge:       { type: String, default: '' },
  description: { type: String, default: '' },
  image:       { type: String, default: null },
  color:       { type: String, default: '#033e74' },
  specs:       { type: [specSchema], default: [] },
  useCases:    { type: [String], default: [] },
  stock:       { type: Number, default: 0 },
  status:      { type: String, enum: ['Active', 'Low Stock', 'Out of Stock'], default: 'Active' },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
