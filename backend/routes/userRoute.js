import express from 'express';
import {
  loginUser,
  adminLogin,
  registerUser,
  googleLogin,
  verifyEmail,
  resendVerificationEmail
} from '../controller/userController.js';

import auth from '../middleware/auth.js';

const userRouter = express.Router();

// Auth routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/google-login', googleLogin);

// Email verification routes
userRouter.get('/verify-email/:token', verifyEmail);
userRouter.post('/resend-verification', auth, resendVerificationEmail);

export default userRouter;
