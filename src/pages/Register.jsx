import { FaUser, FaLock, FaEnvelope, FaBuilding } from "react-icons/fa";

function Register() {
  return (
    <div className="h-screen w-screen bg-[#080a45] flex justify-center items-center">
      {/* Registration Form */}
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg flex flex-col items-center w-11/12 max-w-md">
        <h1 className="text-3xl font-semibold text-white mb-6">Register</h1>

        <form className="w-full flex flex-col gap-4">
          {/* Company Name Input */}
          <div className="relative flex items-center">
            <input
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Company Name"
              className="w-full bg-white bg-opacity-40 text-white placeholder-white rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-[#51487e]"
            />
            <FaBuilding className="absolute left-3 text-white" />
          </div>

          {/* Username Input */}
          <div className="relative flex items-center">
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="User Name"
              className="w-full bg-white bg-opacity-40 text-white placeholder-white rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-[#51487e]"
            />
            <FaUser className="absolute left-3 text-white" />
          </div>

          {/* Email Input */}
          <div className="relative flex items-center">
            <input
              type="email"
              name="Email"
              id="Email"
              placeholder="Email"
              className="w-full bg-white bg-opacity-40 text-white placeholder-white rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-[#51487e]"
            />
            <FaEnvelope className="absolute left-3 text-white" />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center">
            <input
              type="password"
              name="Password"
              id="Password"
              placeholder="Password"
              className="w-full bg-white bg-opacity-40 text-white placeholder-white rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-[#51487e]"
            />
            <FaLock className="absolute left-3 text-white" />
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
