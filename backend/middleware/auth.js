import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import Sentry from "../utils/sentry.js";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized, login again"
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // fetch minimal user data
    const user = await userModel
      .findById(token_decode.id)
      .select("_id email");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    // keep your existing behavior
    req.body.userId = user._id;
    req.user = user;

    // ✅ SET SENTRY USER CONTEXT
    Sentry.setUser({
      id: user._id.toString(),
      email: user.email
    });

    next();
  } catch (error) {
    Sentry.captureException(error);

    res.json({
      success: false,
      message: error.message
    });
  }
};

export default authUser;
