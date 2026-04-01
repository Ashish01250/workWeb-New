import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/verify-reset-otp",
        form
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data || "Error resetting password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            className="w-full p-3 border rounded-lg mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="w-full p-3 border rounded-lg mb-4"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
            Reset Password
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;