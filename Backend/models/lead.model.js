const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  source:      { type: String, enum: ['Website', 'Referral', 'Exhibition', 'Direct', 'Social Media', 'Other'], default: 'Website' },
  status:      { type: String, enum: ['Hot', 'Warm', 'Cold', 'Converted', 'Lost'], default: 'Cold' },
  product:     { type: String, default: '' },
  estValue:    { type: Number, default: 0 },
  notes:       { type: String, default: '' },
  assignedTo:  { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },
  followUpDate:{ type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
