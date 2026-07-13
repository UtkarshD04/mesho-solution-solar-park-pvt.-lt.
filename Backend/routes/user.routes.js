 const express = require('express');
 const router = express.Router();
const { body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
router.post('/register', [
     body('email').isEmail().withMessage('Please enter a valid email'),
     body('fullname.firstname').trim().isLength({min: 3, max: 80}).withMessage('First name must be 3 to 80 characters long'),
     body('fullname.lastname').trim().isLength({min: 3, max: 80}).withMessage('Last name must be 3 to 80 characters long'),
     body('phone').trim().matches(/^[+0-9() -]{8,20}$/).withMessage('Please enter a valid phone number'),
    
     body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    
],
 userController.registerUser
);
router.post('/login', [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    ],
    userController.loginUser
    );
router.get('/profile' ,authMiddleware.authUser, userController.getUserProfile);





router.get('/logout', authMiddleware.authUser, userController.logoutUser)
router.put('/update-profile', authMiddleware.authUser, userController.updateProfile)
router.put('/change-password', authMiddleware.authUser, userController.changePassword)
 module.exports = router;
