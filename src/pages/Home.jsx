import React, { useRef } from "react"; // Import useRef
import { Link, useNavigate } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";
import SlideShow from "../components/SlideShow";

function Home() {
  const navigate = useNavigate();
  const infoSectionRef = useRef(null); // Create a ref for the information section

  const handleClick = (to) => {
    if (to === "/about") {
      // Scroll to the information section if "About" is clicked
      infoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(to);
    }
  };

  return (
    <div className="h-full w-full bg-[#080a45]">
      {/* Navigation Bar */}
      <nav className="flex text-white justify-between p-5 gap-4 items-center">
        {/* Logo and Link */}
        <div className="m-3 flex items-center gap-4">
          {/* <img src={logo} alt="Logo" className="w-12 h-12" /> */}
          <Link
            to="/"
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] hover:from-[#4ade80] hover:via-[#60a5fa] hover:to-[#a855f7] transition-all duration-500 ease-in-out transform hover:scale-105 tracking-wide custom-text-stroke"
          >
            StockSage
          </Link>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <button
            className="p-2 px-3 bg-gradient-to-r from-[#c59dce] to-[#af6cc5] rounded-lg transition-all duration-300 ease-in-out text-white shadow-md hover:shadow-xl transform hover:scale-105 hover:opacity-90"
            onClick={() => handleClick("/about")}
          >
            About
          </button>
          <button
            className="p-2 px-3 bg-gradient-to-r from-[#c59dce] to-[#af6cc5] rounded-lg transition-all duration-300 ease-in-out text-white shadow-md hover:shadow-xl transform hover:scale-105 hover:opacity-90"
            onClick={() => handleClick("/login")}
          >
            Log In
          </button>
          <button
            className="p-2 px-3 bg-gradient-to-r from-[#c59dce] to-[#af6cc5] rounded-lg transition-all duration-300 ease-in-out text-white shadow-md hover:shadow-xl transform hover:scale-105 hover:opacity-90"
            onClick={() => handleClick("/register")}
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="m-5 p-5 items-center text-white text-center">
        <h1 className="p-5 m-5 font-serif text-4xl md:text-6xl leading-relaxed">
          Efficient Inventory Management System with Demand Forecasting
        </h1>
        <h2 className="p-6 m-5 text-lg md:text-2xl font-light font-mono leading-loose">
          Streamline your inventory operations and make informed decisions with
          our MERN stack-based inventory management system integrated with
          advanced ML algorithms for demand forecasting.
        </h2>

        {/* Get Started Button */}
        <button
          className="relative p-2 px-6 text-lg bg-gradient-to-r bg-[#c59dce] to-[#51487e] text-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl"
          onClick={() => handleClick("/register")}
        >
          <span className="absolute inset-0 bg-[#af6cc5] transition-transform translate-x-full group-hover:translate-x-0 duration-[1500ms] ease-in-out"></span>
          <span className="flex justify-between gap-2 items-center relative z-10">
            Get Started <RiLoginCircleLine />
          </span>
        </button>
      </div>

      {/* SlideShow Component */}
      <div className="overflow-hidden">
        <SlideShow />
      </div>

      {/* Information Section */}
      <div className="w-full py-20" ref={infoSectionRef}>
        {" "}
        {/* Attach the ref here */}
        <div className="flex flex-wrap justify-between items-center text-white p-5">
          {/* Image Section */}
          <div className="w-full sm:w-1/2 lg:w-1/2 p-4">
            <img
              src="https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzk3MzE1NHw&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Real-time Inventory Tracking"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full sm:w-1/2 lg:w-1/2 flex flex-col justify-center p-8 space-y-8">
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-serif font-bold">
                Real-time Inventory Tracking
              </h1>
              <p className="py-3 font-mono text-sm md:text-lg">
                Track your inventory levels in real-time to ensure accurate
                stock management.
              </p>
            </div>

            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-serif font-bold">
                Demand Forecasting
              </h1>
              <p className="py-3 font-mono text-sm md:text-lg">
                Utilize ML algorithms like ARIMA and LSTM for accurate demand
                forecasting to optimize stock levels.
              </p>
            </div>

            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-serif font-bold">
                Automated Deployment
              </h1>
              <p className="py-3 font-mono text-sm md:text-lg">
                Automate deployment using Docker for seamless integration and
                scalability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Streamline Section */}
      <div className="flex justify-center items-center w-full py-16">
        <div className="bg-[#9685c6] p-10 rounded-lg">
          <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap justify-between items-center p-10 rounded-lg shadow-lg bg-[#685e8e] transition-all duration-500 ease-in-out hover:bg-white hover:rotate-[-2deg] group">
            {/* Text Section */}
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-white transition-all duration-500 ease-in-out group-hover:text-[#685e8e]">
                Streamline Your Inventory Management
              </h2>
              <p className="mt-4 text-lg text-white transition-all duration-500 ease-in-out group-hover:text-[#685e8e]">
                Optimize your stock levels and forecast demand accurately with
                our MERN + ML-based Inventory Management System.
              </p>
            </div>

            {/* Button Section */}
            <div className="w-full md:w-auto mt-6 md:mt-0">
              <button className="bg-[#c59dce] text-[#51487e] font-semibold py-3 px-8 rounded-lg transition-all duration-500 ease-in-out hover:bg-[#51487e] hover:text-white">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="border-t-2 border-white opacity-40 mx-4"></div>

      <div className="flex flex-wrap justify-between items-center text-white p-10">
        <div className="flex gap-5">
          <h3>Inventory Management System</h3>
          <h3>StockSage</h3>
        </div>

        <div className="flex gap-4">
          <h3>/privacy-policy</h3>
          <h3>/terms-of-service</h3>
          <h3>/cookies</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
