import express from "express";
import {
  register,
  login,
  logout,
  sendResetOTP,
  verifyOTPAndResetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// forgot password OTP
router.post("/send-reset-otp", sendResetOTP);
router.post("/verify-reset-otp", verifyOTPAndResetPassword);

export default router;