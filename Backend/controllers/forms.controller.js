const ProductEnquiry    = require('../models/productEnquiry.model');
const BecomePartner     = require('../models/becomePartner.model');
const AfterSalesService = require('../models/afterSalesService.model');

// ── Product Enquiry ──────────────────────────────────────────────────────────
exports.submitProductEnquiry = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, pinCode, address, product, message, hearAbout } = req.body;

    if (!firstName || !lastName || !phone || !email || !pinCode || !product || !hearAbout) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }

    const enquiry = await ProductEnquiry.create({ firstName, lastName, phone, email, pinCode, address, product, message, hearAbout });
    res.status(201).json({ success: true, message: 'Enquiry submitted successfully.', data: enquiry });
  } catch (err) {
    console.error('ProductEnquiry error:', err.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// ── Become a Partner ─────────────────────────────────────────────────────────
exports.submitBecomePartner = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, pinCode, businessName, address, website, businessType, interestedCity, hearAbout } = req.body;

    if (!firstName || !lastName || !phone || !email || !pinCode || !businessName || !businessType || !interestedCity || !hearAbout) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }

    const partner = await BecomePartner.create({ firstName, lastName, phone, email, pinCode, businessName, address, website, businessType, interestedCity, hearAbout });
    res.status(201).json({ success: true, message: 'Partner application submitted successfully.', data: partner });
  } catch (err) {
    console.error('BecomePartner error:', err.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// ── After Sales Service ───────────────────────────────────────────────────────
exports.submitAfterSales = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, model, serial, date, issue } = req.body;

    if (!firstName || !lastName || !phone || !email || !model || !issue) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }

    const invoicePath = req.file ? `/uploads/${req.file.filename}` : '';

    const ticket = await AfterSalesService.create({ firstName, lastName, phone, email, model, serial, date, issue, invoicePath });
    res.status(201).json({ success: true, message: 'Service request submitted successfully.', data: ticket });
  } catch (err) {
    console.error('AfterSales error:', err.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};
