import validator from 'validator';
import userModel from '../models/userModel.js';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';



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
            res.json({ success: false, message: "user does't exists" })
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

        const newUser = new userModel({
            name,
            email,
            password: hasedPassword
        })

        const user = await newUser.save();

        const token = createtoken(user._id);

        res.json({ success: true, token ,message:"user registerd"})


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }



}


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

export { loginUser, registerUser, adminLogin };