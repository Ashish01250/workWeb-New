import React, { useState, useEffect } from "react";
import "./ForgotPassword.scss";
import newRequest from "../../utils/newRequest";

function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(0);

  // ⏱ Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // 📧 Send OTP
  const handleSendOTP = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    try {
      setLoading(true);

      await newRequest.post("/auth/send-reset-otp", { email });

      setMessage("OTP sent to email");
      setStep(2);
      setTimer(30);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "User not found"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔢 OTP CHANGE
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // 🔥 BACKSPACE FIX
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // 🔥 PASTE OTP
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

    document.getElementById("otp-5").focus();
  };

  // 🔒 RESET PASSWORD
  const handleReset = async () => {
    setError("");
    setMessage("");

    if (otp.join("").length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      await newRequest.post("/auth/verify-reset-otp", {
        email,
        otp: otp.join(""),
        password,
      });

      setMessage("Password reset successful ✅");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot">
      <div className="card">
        <h1>Forgot Password 🔐</h1>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <p className="subtitle">Enter email to receive OTP</p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");     // ✅ clear error
                setMessage("");   // ✅ clear success
              }}
            />

            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}

            <button onClick={handleSendOTP} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p className="subtitle">Enter OTP & New Password</p>

            <div className="otp-box" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, index)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}

            <button onClick={handleReset} disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <p className="resend">
              {timer > 0 ? (
                `Resend in ${timer}s`
              ) : (
                <span onClick={handleSendOTP}>Resend OTP</span>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;