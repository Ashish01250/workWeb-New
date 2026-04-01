import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

// ================= REGISTER =================
export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 5);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User has been created.",
    });
  } catch (err) {
    next(createError(500, "Error creating user"));
  }
};

// ================= LOGIN =================
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;

    res
      .cookie("accessToken", {
        httpOnly: true,
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
    .clearCookie("accessToken", { httpOnly: true })
    .status(200)
    .send("User has been logged out.");
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

    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 30 * 1000;

    await user.save();

    // send email
    await sendEmail(
      user.email,
      "WorkWave Password Reset Code",
      `Hi ${user.username},

Your OTP is: ${otp}

This code will expire in 30 sec.

- WorkWave Team`
    );

    // console.log("OTP:", otp); // for testing

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
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

    if (!user) return next(createError(404, "User not found"));

    if (!user.resetOTP || !user.resetOTPExpire) {
      return next(createError(400, "No reset request found"));
    }

    if (user.resetOTP !== otp) {
      return next(createError(400, "Invalid OTP"));
    }

    if (user.resetOTPExpire < Date.now()) {
      return next(createError(400, "OTP expired"));
    }

    const hashedPassword = bcrypt.hashSync(password, 5);

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