import express from 'express';
import authUser from '../middleware/auth.js';
import {
  loginUser,
  adminLogin,
  registerUser,
  googleLogin,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  profileinfo
} from '../controller/userController.js';

import auth from '../middleware/auth.js';

const userRouter = express.Router();

// Auth routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/google-login', googleLogin);
userRouter.get('/profile',authUser,profileinfo);

// Email verification routes
userRouter.get('/verify-email/:token', verifyEmail);
userRouter.post('/resend-verification', auth, resendVerificationEmail);


// Forgot password routes
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);


export default userRouter;
