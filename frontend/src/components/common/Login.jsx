import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="flex items-center bg-gray-700 rounded-md">
              <Mail className="h-5 w-5 text-gray-400 ml-2" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">
              Password
            </label>
            <div className="flex items-center bg-gray-700 rounded-md">
              <Lock className="h-5 w-5 text-gray-400 ml-2" />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-medium px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-purple-400 hover:underline">
              Sign Up
            </a>
          </p>
          <p className="text-gray-400 text-sm mt-2">
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
