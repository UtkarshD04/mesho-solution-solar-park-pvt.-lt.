 const express = require('express');
 const router = express.Router();
const { body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const rateLimit = require('../middleware/rateLimit.middleware');
router.post('/register', rateLimit({ max: 10 }), [
     body('email').isEmail().withMessage('Please enter a valid email'),
     body('fullname.firstname').trim().isLength({min: 3, max: 80}).withMessage('First name must be 3 to 80 characters long'),
     body('fullname.lastname').trim().isLength({min: 3, max: 80}).withMessage('Last name must be 3 to 80 characters long'),
     body('phone').trim().matches(/^[+0-9() -]{8,20}$/).withMessage('Please enter a valid phone number'),

     body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),

],
 userController.registerUser
);
router.post('/login', rateLimit({ max: 8 }), [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    ],
    userController.loginUser
    );
router.get('/profile' ,authMiddleware.authUser, userController.getUserProfile);





router.get('/logout', authMiddleware.authUser, userController.logoutUser)
router.put('/update-profile', authMiddleware.authUser, [
    body('fullname.firstname').trim().isLength({min: 3, max: 80}).withMessage('First name must be 3 to 80 characters long'),
    body('fullname.lastname').trim().isLength({min: 3, max: 80}).withMessage('Last name must be 3 to 80 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('phone').trim().matches(/^[+0-9() -]{8,20}$/).withMessage('Please enter a valid phone number'),
    body('address').optional({checkFalsy: true}).trim().isLength({max: 200}).withMessage('Address is too long'),
], userController.updateProfile)
router.put('/change-password', rateLimit({ max: 5 }), authMiddleware.authUser, userController.changePassword)
router.post('/auth/google', rateLimit({ max: 10 }), userController.googleAuth)
module.exports = router;
