import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.css";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
    isSeller: false,
    desc: "",
    phoneCode: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const countryOptions = [
    { name: "India", code: "+91" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    { name: "Australia", code: "+61" },
    { name: "Canada", code: "+1" },
    { name: "Germany", code: "+49" },
    { name: "France", code: "+33" },
    { name: "Japan", code: "+81" },
    { name: "Brazil", code: "+55" },
    { name: "Mexico", code: "+52" },
  ];

  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required.";
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must include at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must include at least one lowercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must include at least one number.";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
      return "Password must include at least one special character.";
    if (/\s/.test(password)) return "Password must not contain spaces.";
    if (/^0+$/.test(password)) return "Password cannot consist only of zeros.";
    return "";
  };

  const validateUsername = (username) => {
    if (!username.trim()) return "Username is required.";
    if (username.length < 3) return "Username must be at least 3 characters.";
    if (username.length > 15) return "Username must not exceed 15 characters.";
    if (!/^[a-zA-Z]/.test(username)) return "Username must start with a letter.";
    if (/[^a-zA-Z0-9]/.test(username))
      return "Username must not contain spaces or special characters.";
    return "";
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) return "Email is required.";
    if (!emailPattern.test(email)) return "Please enter a valid email address.";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Phone number is required.";
    if (!/^\d{10}$/.test(phone))
      return "Phone number must be exactly 10 digits.";
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.username = validateUsername(user.username);
    newErrors.email = validateEmail(user.email);
    newErrors.phone = validatePhone(user.phone);
    newErrors.password = validatePassword(user.password);
    setErrors(newErrors);
    return Object.values(newErrors).every((val) => !val);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      setErrors((prev) => ({ ...prev, username: validateUsername(value) }));
    } else if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "phone") {
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    } else if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];

    if (f) {
      if (f.size > 2 * 1024 * 1024) {
        setFileError("File size must be less than 2MB.");
        setFile(null);
        return;
      }

      if (!["image/jpeg", "image/png", "image/jpg"].includes(f.type)) {
        setFileError("Only JPG, JPEG, and PNG files are allowed.");
        setFile(null);
        return;
      }

      setFileError("");
      setFile(f);
    } else {
      setFileError("");
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const selectedCountryData = countryOptions.find(
      (country) => country.name === selectedCountry
    );
    setUser((prev) => ({
      ...prev,
      country: selectedCountry,
      phoneCode: selectedCountryData?.code || "",
    }));
  };

  const handleSeller = (e) => {
    const { checked } = e.target;
    setUser((prev) => ({ ...prev, isSeller: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const defaultAvatar = "/img/noavatar.jpg";
    const url = file ? await upload(file) : defaultAvatar;

    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          {errors.general && (
            <p className="error-message">{errors.general}</p>
          )}

          <label>
            Username <span className="required">*</span>
          </label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            className={errors.username ? "error" : ""}
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}

          <label>
            Email <span className="required">*</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <p className="error-message">{errors.email}</p>
          )}

          <label>
            Password <span className="required">*</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}

          <label>Profile Picture (Optional)</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg, image/jpg, image/png"
          />
          {fileError && <p className="error-message">{fileError}</p>}

          <label>
            Country <span className="required">*</span>
          </label>
          <select
            name="country"
            value={user.country}
            onChange={handleCountryChange}
            className={errors.country ? "error" : ""}
          >
            <option value="" disabled>
              Select your country
            </option>
            {countryOptions.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="error-message">{errors.country}</p>
          )}
        </div>

        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label>Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>

          <label>
            Phone Number <span className="required">*</span>
          </label>
          <div className="phone-input">
            <input
              type="text"
              value={user.phoneCode}
              readOnly
              className="phone-code"
            />
            <input
              name="phone"
              type="text"
              placeholder="1234567890"
              value={user.phone}
              onChange={handleChange}
              className={`phone-number ${errors.phone ? "error" : ""}`}
            />
          </div>
          {errors.phone && (
            <p className="error-message">{errors.phone}</p>
          )}

          <label>Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            cols="30"
            rows="6"
            value={user.desc}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
