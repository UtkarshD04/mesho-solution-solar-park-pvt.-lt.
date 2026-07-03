const mongoose = require('mongoose');

const productEnquirySchema = new mongoose.Schema({
  firstName:  { type: String, required: true, trim: true },
  lastName:   { type: String, required: true, trim: true },
  phone:      { type: String, required: true },
  email:      { type: String, required: true, trim: true, lowercase: true },
  pinCode:    { type: String, required: true },
  address:    { type: String, default: '' },
  product:    { type: String, required: true },
  message:    { type: String, default: '' },
  hearAbout:  { type: String, required: true },
  status:     { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('ProductEnquiry', productEnquirySchema);
