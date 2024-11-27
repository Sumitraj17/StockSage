import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const resp = await axios.post("http://localhost:3000/employee/login", {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });
      toast.success(resp.data.message);
      setTimeout(() => navigate("/employee/dashboard"), 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-500 to-indigo-700 flex justify-center items-center">
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg flex flex-col items-center w-11/12 max-w-md">
        <h1 className="text-3xl font-semibold text-white mb-6">Employee Login</h1>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="relative flex items-center">
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-40 text-white placeholder-white rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            />
            <FaUser className="absolute left-3 text-white" />
          </div>

          {/* Email Input */}
          <div className="relative flex items-center">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-40 text-white placeholder-white rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            />
            <FaEnvelope className="absolute left-3 text-white" />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white bg-opacity-40 text-white placeholder-white rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            />
            <FaLock className="absolute left-3 text-white" />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-3 text-white cursor-pointer"
                onClick={handleShowPassword}
              />
            ) : (
              <FaEye
                className="absolute right-3 text-white cursor-pointer"
                onClick={handleShowPassword}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full py-2 hover:opacity-90 transition-opacity duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeLogin;
