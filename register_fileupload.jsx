import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaBuilding,
  FaEye,
  FaEyeSlash,
  FaFileUpload,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import citiesInIndia from "../constants/constants.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    companyLocation: "",
    userName: "",
    email: "",
    password: "",
  });
  const [file, setFile] = useState(null);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    const allowedExtensions = ["pdf", "doc", "csv", "docx", "jpg", "jpeg", "png"];
    const maxSize = 100 * 1024 * 1024; // 5 MB

    if (uploadedFile) {
      const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("Invalid file type. Allowed types: PDF, DOC,CSV, DOCX, JPG, PNG.");
        return;
      }

      if (uploadedFile.size > maxSize) {
        toast.error("File size exceeds the maximum limit of 100 MB.");
        return;
      }

      setFile(uploadedFile);
      toast.success("File uploaded successfully!");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("companyName", form.companyName);
    formData.append("companyLocation", form.companyLocation);
    formData.append("userName", form.userName);
    formData.append("email", form.email);
    formData.append("password", form.password);

    if (file) {
      formData.append("file", file);
    }

    try {
      const resp = await axios.post("http://localhost:3000/admin/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(resp.data.message);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="h-screen w-screen bg-[#080a45] flex justify-center items-center">
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg flex flex-col items-center w-11/12 max-w-md">
        <h1 className="text-3xl font-semibold text-white mb-6">Register</h1>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Company Name Input */}
          {/* ... Other Input Fields ... */}
          
          {/* File Upload Input */}
          <div className="relative flex items-center">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.csv,.jpg,.jpeg,.png"
              className="w-full bg-white bg-opacity-40 text-white placeholder-white rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-[#51487e]"
            />
            <FaFileUpload className="absolute left-3 text-white" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full py-2 hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
