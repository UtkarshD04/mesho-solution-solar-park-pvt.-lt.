const mongoose = require('mongoose');

const becomePartnerSchema = new mongoose.Schema({
  firstName:      { type: String, required: true, trim: true },
  lastName:       { type: String, required: true, trim: true },
  phone:          { type: String, required: true },
  email:          { type: String, required: true, trim: true, lowercase: true },
  pinCode:        { type: String, required: true },
  businessName:   { type: String, default: '', trim: true },
  address:        { type: String, default: '' },
  website:        { type: String, default: '' },
  businessType:   { type: String, required: true },
  interestedCity: { type: String, required: true },
  hearAbout:      { type: String, required: true },
  status:         { type: String, enum: ['new', 'reviewing', 'approved', 'rejected'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('BecomePartner', becomePartnerSchema);
