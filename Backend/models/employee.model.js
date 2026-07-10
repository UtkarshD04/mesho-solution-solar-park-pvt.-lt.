const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  empId:      { type: String, required: true, unique: true },
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  phone:      { type: String, required: true },
  role:       { type: String, required: true },
  department: { type: String, required: true },
  status:     { type: String, enum: ['Active', 'On Leave', 'Inactive'], default: 'Active' },
  password:   { type: String, default: '' },
  joinDate:   { type: Date, default: Date.now },
}, { timestamps: true });

employeeSchema.pre('save', async function () {
  if (this.isModified('password') && this.password)
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('Employee', employeeSchema);
