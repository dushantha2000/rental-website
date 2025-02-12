import React, { useContext, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { apiUrl } from "../common/Http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const {login} =useContext(AdminAuthContext)
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Login submission handler
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);

    // If inputs are valid, proceed with login
    if (isValid) {
      const data = { email, password };
      try {
        const response = await fetch(`${apiUrl}/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
          toast.success("Login successful!");
          console.log(result);

          if(result.status ==200){
            const adminInfo ={
              token :result.token,
              id:result.id,
              role:result.role,
              name :result.name,
            }
            localStorage.setItem('adminInfo',JSON.stringify(adminInfo))

            
            login(adminInfo)
            navigate('/');      
          }else {
            toast.error(result.message);
          }
        } else {
          toast.error(result.message || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <div className="flex items-center bg-gray-700 rounded-md">
              <Mail className="w-5 h-5 ml-2 text-gray-400" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-700 rounded-md focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="flex items-center bg-gray-700 rounded-md">
              <Lock className="w-5 h-5 ml-2 text-gray-400" />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-700 rounded-md focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-purple-600  text-white font-semibold px-6 py-3 rounded-lg hover:from-purple-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-purple-400 hover:underline">
              Sign Up
            </a>
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Forgot your password?{" "}
            <a href="#" className="text-purple-400 hover:underline">
              Reset It
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
