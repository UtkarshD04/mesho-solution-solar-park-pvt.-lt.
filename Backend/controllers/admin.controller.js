const Admin = require('../models/admin.model');
const blacklistTokenModel = require('../models/blacklistToken.model');
const ProductEnquiry = require('../models/productEnquiry.model');
const BecomePartner = require('../models/becomePartner.model');
const AfterSalesService = require('../models/afterSalesService.model');
const Lead = require('../models/lead.model');
const Employee = require('../models/employee.model');
const User = require('../models/user.model');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 12 * 60 * 60 * 1000,
};

// ── Auth ───────────────────────────────────────────────────────────
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) return res.status(401).json({ message: 'Invalid credentials.' });

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

  const token = admin.generateAuthToken();
  res.cookie('adminToken', token, cookieOptions);
  res.status(200).json({ admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
};

exports.logoutAdmin = async (req, res) => {
  res.clearCookie('adminToken', cookieOptions);
  const token = req.cookies.adminToken || req.headers.authorization?.split(' ')[1];
  if (token) await blacklistTokenModel.create({ token }).catch(() => {});
  res.status(200).json({ message: 'Logged out.' });
};

exports.getAdminProfile = (req, res) => {
  res.status(200).json({ admin: { _id: req.admin._id, name: req.admin.name, email: req.admin.email, role: req.admin.role } });
};

// ── Dashboard Stats ───────────────────────────────────────────────────────────
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalEnquiries, totalServiceRequests, totalLeads, totalPartners, totalEmployees] = await Promise.all([
      User.countDocuments(),
      ProductEnquiry.countDocuments(),
      AfterSalesService.countDocuments(),
      Lead.countDocuments(),
      BecomePartner.countDocuments(),
      Employee.countDocuments(),
    ]);

    const openServiceRequests = await AfterSalesService.countDocuments({ status: 'open' });
    const newEnquiries = await ProductEnquiry.countDocuments({ status: 'new' });
    const hotLeads = await Lead.countDocuments({ status: 'Hot' });

    res.status(200).json({
      totalUsers,
      totalEnquiries,
      totalServiceRequests,
      openServiceRequests,
      newEnquiries,
      totalLeads,
      hotLeads,
      totalPartners,
      totalEmployees,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats.' });
  }
};

// ── Product Enquiries ─────────────────────────────────────────────────────────
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await ProductEnquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch enquiries.' });
  }
};

exports.updateEnquiryStatus = async (req, res) => {
  try {
    const enquiry = await ProductEnquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' });
    res.status(200).json(enquiry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update enquiry.' });
  }
};

// ── Partner Applications ──────────────────────────────────────────────────────
exports.getPartners = async (req, res) => {
  try {
    const partners = await BecomePartner.find().sort({ createdAt: -1 });
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch partners.' });
  }
};

exports.updatePartnerStatus = async (req, res) => {
  try {
    const partner = await BecomePartner.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!partner) return res.status(404).json({ message: 'Partner not found.' });
    res.status(200).json(partner);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update partner.' });
  }
};

// ── Service Requests ──────────────────────────────────────────────────────────
exports.getServiceRequests = async (req, res) => {
  try {
    const requests = await AfterSalesService.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch service requests.' });
  }
};

exports.updateServiceStatus = async (req, res) => {
  try {
    const request = await AfterSalesService.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!request) return res.status(404).json({ message: 'Request not found.' });
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service request.' });
  }
};

// ── Leads ─────────────────────────────────────────────────────────────────────
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leads.' });
  }
};

exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create lead.' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found.' });
    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update lead.' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Lead deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete lead.' });
  }
};

// ── Employees ─────────────────────────────────────────────────────────────────
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch employees.' });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ message: `${field === 'empId' ? 'Employee ID' : 'Email'} already exists.` });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(err.errors).map(e => e.message).join(', ') });
    }
    res.status(500).json({ message: err.message || 'Failed to create employee.' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    Object.assign(employee, req.body);
    await employee.save();
    res.status(200).json(employee);
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ message: `${field === 'empId' ? 'Employee ID' : 'Email'} already exists.` });
    }
    res.status(500).json({ message: 'Failed to update employee.' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete employee.' });
  }
};

// ── Change Password ──────────────────────────────────────────────────────────
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ message: 'All fields required.' });
  if (newPassword.length < 6) return res.status(400).json({ message: 'New password must be at least 6 characters.' });
  try {
    const admin = await Admin.findById(req.admin._id).select('+password');
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect.' });
    admin.password = await Admin.hashPassword(newPassword);
    await admin.save();
    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to change password.' });
  }
};

// ── Users ─────────────────────────────────────────────────────────────────────
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
};
