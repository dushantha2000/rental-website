import React, { useState } from "react";
import { apiUrl } from "../common/Http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [accountType, setAccountType] = useState("user");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();


  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.username.trim()) formErrors.username = "Username is required.";
    if (!formData.email.includes("@")) formErrors.email = "Invalid email address.";
    if (formData.password.length < 6)
      formErrors.password = "Password must be at least 6 characters.";
    if (!formData.phone.match(/^\d{10}$/))
      formErrors.phone = "Phone number must be 10 digits.";
    if (!formData.address.trim()) formErrors.address = "Address is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`${apiUrl}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name: formData.username, 
            email: formData.email, 
            role: accountType === "user" ? "buyer" : "seller", // Updated role assignment
            phone: formData.phone, 
            address: formData.address, 
            password: formData.password 
          }),
        });

        const result = await response.json();
        if (result.status === 200) {
          toast.success("register successful!");
          setFormData({
            username: "",
            email: "",
            password: "",
            phone: "",
            address: "",
          });
          setErrors({});
          navigate('/admin/login');
        } else {
          toast.error("register failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("An error occurred. Please try again.");
      
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>

        {/* Account Type Selection */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 mx-2 rounded-md ${
              accountType === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setAccountType("user")}
          >
            Buyer Account
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-md ${
              accountType === "rentalOwner" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setAccountType("rentalOwner")}
          >
            Rental Owner
          </button>
        </div>

        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="username"
              placeholder="Enter your username"
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none ${
                errors.username && "border-red-500 border"
              }`}
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none ${
                errors.email && "border-red-500 border"
              }`}
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none ${
                errors.password && "border-red-500 border"
              }`}
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none ${
                errors.phone && "border-red-500 border"
              }`}
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-300 text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none ${
                errors.address && "border-red-500 border"
              }`}
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-medium px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
