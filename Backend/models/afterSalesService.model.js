const mongoose = require('mongoose');

const afterSalesSchema = new mongoose.Schema({
  firstName:   { type: String, required: true, trim: true },
  lastName:    { type: String, required: true, trim: true },
  phone:       { type: String, required: true },
  email:       { type: String, required: true, trim: true, lowercase: true },
  model:       { type: String, required: true },
  serial:      { type: String, default: '' },
  date:        { type: String, default: '' },
  issue:       { type: String, required: true },
  invoicePath: { type: String, default: '' },
  status:      { type: String, enum: ['open', 'in-progress', 'resolved', 'closed'], default: 'open' },
}, { timestamps: true });

module.exports = mongoose.model('AfterSalesService', afterSalesSchema);
