import React, { useState } from "react";
import "./App.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  dob: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Email address is invalid";
        return "";
      case "phone":
        if (!value.match(/^\d{10}$/)) return "Phone number is required";
        return "";
      case "country":
        if (!value) return "Please select country";
        return "";
      case "dob":
        if (!value) return "Date of birth is required";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      case "confirmPassword":
        if (!value) return "Confirm Password is required";
        if (value !== allValues.password) return "Passwords do not match";
        return "";
      case "terms":
        if (!value) return "Accept terms to proceed";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key], formData);
      if (msg) nextErrors[key] = msg;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(updated);

    if (touched[name]) {
      const msg = validateField(name, updated[name], updated);
      setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      alert("Form Submitted Successfully ✅");
      setFormData(initialForm);
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.firstName}
                placeholder="First Name"
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.lastName}
                placeholder="Last Name"
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
                placeholder="Email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.phone}
                placeholder="Phone"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.country}
              >
                <option value="">Select...</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
              {errors.country && <span className="error">{errors.country}</span>}
            </div>
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.dob}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.password}
                placeholder="Password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.confirmPassword}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {" "}I agree to Terms & Conditions
            </label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default App;