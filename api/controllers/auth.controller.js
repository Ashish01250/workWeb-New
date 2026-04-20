import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";


// ================= REGISTER =================
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
     
    // validation
    if (!username || !email || !password) {
      return next(createError(400, "All fields are required"));
    }

    // check existing user/email
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return next(createError(400, "Username or Email already exists"));
    }

    // hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // create user
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User has been created successfully",
    });

  } catch (err) {
    next(createError(500, "Error creating user"));
  }
};


// ================= LOGIN =================
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // validation
    if (!username || !password) {
      return next(createError(400, "Username and password required"));
    }

    // find user
    const user = await User.findOne({ username });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // compare password
    const isCorrect = bcrypt.compareSync(password, user.password);

    if (!isCorrect) {
      return next(createError(400, "Wrong username or password"));
    }

    // create token
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    // remove sensitive/internal fields
    const {
      password: userPassword,
      resetOTP,
      resetOTPExpire,
      __v,
      ...info
    } = user._doc;

    // send cookie
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json(info);

  } catch (err) {
    next(err);
  }
};


// ================= LOGOUT =================
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({
      success: true,
      message: "User logged out successfully",
    });
};


// ================= SEND RESET OTP =================
export const sendResetOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(createError(400, "Email is required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save otp and expiry
    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    // send email
    await sendEmail(
      user.email,
      "WorkWave Password Reset Code",
      `Hi ${user.username},

Your OTP is: ${otp}

This code will expire in 5 minutes.

- WorkWave Team`
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully to email",
    });

  } catch (err) {
    next(err);
  }
};


// ================= VERIFY OTP + RESET PASSWORD =================
export const verifyOTPAndResetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return next(createError(400, "Email, OTP and password required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (!user.resetOTP || !user.resetOTPExpire) {
      return next(createError(400, "No reset request found"));
    }

    if (user.resetOTP !== otp) {
      return next(createError(400, "Invalid OTP"));
    }

    if (user.resetOTPExpire < Date.now()) {
      return next(createError(400, "OTP expired"));
    }

    // hash new password
    const hashedPassword = bcrypt.hashSync(password, 10);

    user.password = hashedPassword;
    user.resetOTP = "";
    user.resetOTPExpire = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (err) {
    next(err);
  }
};