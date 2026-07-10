const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authAdmin } = require('../middleware/admin.middleware');

// Auth
router.post('/login', adminController.loginAdmin);
router.post('/logout', authAdmin, adminController.logoutAdmin);
router.get('/profile', authAdmin, adminController.getAdminProfile);
router.put('/change-password', authAdmin, adminController.changePassword);

// Dashboard
router.get('/dashboard/stats', authAdmin, adminController.getDashboardStats);

// Product Enquiries
router.get('/enquiries', authAdmin, adminController.getEnquiries);
router.put('/enquiries/:id/status', authAdmin, adminController.updateEnquiryStatus);

// Partner Applications
router.get('/partners', authAdmin, adminController.getPartners);
router.put('/partners/:id/status', authAdmin, adminController.updatePartnerStatus);

// Service Requests
router.get('/service-requests', authAdmin, adminController.getServiceRequests);
router.put('/service-requests/:id/status', authAdmin, adminController.updateServiceStatus);

// Leads
router.get('/leads', authAdmin, adminController.getLeads);
router.post('/leads', authAdmin, adminController.createLead);
router.put('/leads/:id', authAdmin, adminController.updateLead);
router.delete('/leads/:id', authAdmin, adminController.deleteLead);

// Employees
router.get('/employees', authAdmin, adminController.getEmployees);
router.post('/employees', authAdmin, adminController.createEmployee);
router.put('/employees/:id', authAdmin, adminController.updateEmployee);
router.delete('/employees/:id', authAdmin, adminController.deleteEmployee);

// Users
router.get('/users', authAdmin, adminController.getUsers);

module.exports = router;
