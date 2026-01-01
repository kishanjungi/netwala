import validator from 'validator';
import userModel from '../models/userModel.js';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);




// token creation

const createtoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
//  user login  
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" });
        }

        if (!user.isEmailVerified) {
            return res.json({
              success: false,
              message: "Please verify your email first"
            });
          }

        const isMatch = await bycrpt.compare(password, user.password);

        if (isMatch) {
            const token = createtoken(user._id);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


//  user register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "User Already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid Email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" });

        }

        // hasing the password
        const salt = await bycrpt.genSalt(10);
        const hasedPassword = await bycrpt.hash(password, salt)

       // generate email verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

     const newUser = new userModel({
        name,
        email,
        password: hasedPassword,
        verificationToken,
        verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });


        const user = await newUser.save();

        const token = createtoken(user._id);

// send verification email (non-blocking)
        const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        sendEmail({
          to:user.email,
          subject:"Verify your email",
         html: `
            <h2>Email Verification</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationLink}">${verificationLink}</a>
            <p>This link will expire in 24 hours.</p>
          `
    });


        res.json({
        success: true,
        token,
        message: "User registered. Please verify your email."
        });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }



}



const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await userModel.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link"
      });
    }

    user.isEmailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const resendVerificationEmail = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ success: true, message: "Email already verified" });
    }

    const newToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = newToken;
    user.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    sendEmail({
      to:user.email,
      subject:"Reset your password",
      html:`
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `
  });


    res.json({
      success: true,
      message: "Verification email resent"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// forgot password function
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User with this email does not exist"
      });
    }

    if (user.isGoogleUser) {
      return res.json({
        success: false,
        message: "Please login using Google"
      });
    }

    const resetToken = crypto.randomBytes(10).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to:user.email,
      subject:"Reset your password",
      html:`
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `
  });


    res.json({
      success: true,
      message: "Password reset link sent to your email"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// reset password function 
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link"
      });
    }

    const salt = await bycrpt.genSalt(10);
    user.password = await bycrpt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



//  user admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password,process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { name, email } = ticket.getPayload();

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                name,
                email,
                isGoogleUser: true
            });
        }

        const jwtToken = createtoken(user._id);

        res.json({
            success: true,
            token: jwtToken
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Google authentication failed"
        });
    }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  googleLogin,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword
};
