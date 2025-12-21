import express from 'express';
import { loginUser,adminLogin,registerUser,googleLogin } from '../controller/userController.js';


const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/admin",adminLogin);
userRouter.post("/google-login", googleLogin);

export default userRouter;
