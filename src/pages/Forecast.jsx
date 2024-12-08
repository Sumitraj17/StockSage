import { useNavigate } from "react-router-dom";
import { FaUpload, FaArrowRight } from "react-icons/fa";

function Forecasting() {
  const navigate = useNavigate();

  const handleOldDataClick = () => {
    navigate("/forecastpage");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle file upload logic here if needed
    navigate("/forecastpage");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-r from-blue-50 via-white to-blue-50">
      {/* Heading Section */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Forecasting Data
      </h1>

      {/* Old Data Button */}
      <div className="flex flex-col items-center space-y-2 mb-10">
        <button
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition-all shadow-md flex items-center gap-2"
          onClick={handleOldDataClick}
        >
          <FaArrowRight className="text-white" />
          Use Old Data
        </button>
        <span className="text-lg font-semibold text-gray-600">or</span>
      </div>

      {/* Form for Updated Data */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Provide Updated Data
        </h2>
        <label
          htmlFor="file"
          className="cursor-pointer flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all shadow-md"
        >
          <FaUpload className="text-white" />
          Upload File
          <input
            id="file"
            type="file"
            name="file"
            className="hidden"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
        >
          <FaArrowRight className="text-white" />
          Submit
        </button>
      </form>

     
      
    </div>
  );
}

export default Forecasting;
