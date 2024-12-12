import { useNavigate } from "react-router-dom";
import { FaUpload, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function Forecasting() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // To store the uploaded file
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [isDisabled, setIsDisabled] = useState(false); // To disable buttons during prediction

  const handleOldDataClick = async () => {
    navigate('/dashboard/prediction')
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Start loading
      setIsLoading(true);
      setIsDisabled(true);

      // Show loading toast
      toast.loading("Processing your file...", { id: "file-processing" });

      // Send the file to the backend
      const response = await axios.post(
        "http://localhost:3000/api/v1/sales/forecasting",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Add credentials to the request
          responseType: "blob", // Expect the response to be a PDF file
        }
      );

      navigate('/dashboard/prediction')
      

      // Show success toast
      toast.success("Report generated successfully!", { id: "file-processing" });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while processing the forecasting data.");
    } finally {
      setIsLoading(false); // End loading
      setIsDisabled(false); // Enable buttons again
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      {/* Heading Section */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Forecasting Data
      </h1>

      {/* Old Data Button */}
      <div className="flex flex-col items-center space-y-2 mb-10">
        <button
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition-all shadow-md flex items-center gap-2"
          onClick={handleOldDataClick}
          disabled={isDisabled} // Disable button during prediction
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
            onChange={(e) => setFile(e.target.files[0])} // Store the uploaded file in state
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
          disabled={isDisabled} // Disable button during prediction
        >
          <FaArrowRight className="text-white "  />
          Submit
        </button>
      </form>
    </div>
  );
}

export default Forecasting;
