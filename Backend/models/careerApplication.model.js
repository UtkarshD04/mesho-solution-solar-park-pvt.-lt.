const mongoose = require('mongoose');

const careerApplicationSchema = new mongoose.Schema({
  firstName:  { type: String, required: true, trim: true },
  lastName:   { type: String, required: true, trim: true },
  phone:      { type: String, required: true },
  email:      { type: String, required: true, trim: true, lowercase: true },
  department: { type: String, required: true },
  experience: { type: String, default: '', trim: true },
  message:    { type: String, default: '' },
  status:     { type: String, enum: ['new', 'reviewing', 'shortlisted', 'rejected'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('CareerApplication', careerApplicationSchema);
