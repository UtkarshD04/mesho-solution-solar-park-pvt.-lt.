const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role:     { type: String, enum: ['super_admin', 'admin', 'manager'], default: 'admin' },
}, { timestamps: true });

adminSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, role: this.role, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '12h' });
};

adminSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Admin', adminSchema);
