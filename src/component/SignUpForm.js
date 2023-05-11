import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateForm(formData));
    setSubmitted(true);
    if (Object.keys(errors).length === 0) {
      // Submit the form
      // Submit the form data or perform further actions
      console.log(formData);
      // Reset the form
      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        password: "",
      });
      setSubmitted(false);

      // Make the API call to signup
      axios
        .post("http://localhost:3001/api/auth/signup", formData)
        .then((response) => {
          console.log(response.data);
          // Handle the response accordingly
          navigate("/login"); // Redirect to the login page
        })
        .catch((error) => console.log(error));
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (data.firstName.length < 5) {
      errors.firstName = "First name must be at least 5 characters long";
    }

    if (!data.email) {
      errors.email = "Email is required";
    }

    if (!data.mobileNumber.match(/^\d{10}$/)) {
      errors.mobileNumber = "Mobile number must be 10 digits";
    }

    if (
      data.password.length < 5 ||
      !/[A-Z]/.test(data.password) ||
      !/[0-9]/.test(data.password) ||
      !/[^A-Za-z0-9]/.test(data.password)
    ) {
      errors.password =
        "Password must be at least 5 characters long and include an uppercase letter, a number, and a special character";
    }

    return errors;
  };
  
  return (
    <div className="container">
      <h1 className="mt-4">Signup</h1>
      {submitted && Object.keys(errors).length === 0 && (
        <p>Form submitted successfully!</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="form-control"
          />
          {submitted && errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number:
          </label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
             className="form-control"
          />
          {submitted && errors.mobileNumber && (
            <span className="error">{errors.mobileNumber}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
          />
          {submitted && errors.email && (
            <span className="error">{errors.email}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            autoComplete="on"
            onChange={handleInputChange}
            className="form-control"
          />
          {submitted && errors.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};



export default SignupForm;  