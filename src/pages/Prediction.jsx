"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";

function Prediction() {
  const [data, setData] = useState([]); // All fetched data
  const [filteredData, setFilteredData] = useState([]); // Data filtered by user input
  const [inputValue, setInputValue] = useState(""); // User input
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [isDisabled, setIsDisabled] = useState(false);

  const completPrediction = async () => {
    try {
      // Start loading
      setIsLoading(true);
      setIsDisabled(true);

      // Show loading toast
      toast.loading("Processing your file...", { id: "file-processing" });

      // If the user selects to use old data, make an Axios request to the backend
      const response = await axios.post(
        "http://localhost:3000/api/v1/sales/forecasting",
        {}, // No file data, just use old data
        {
          withCredentials: true, // Include credentials with the request
          responseType: "blob", // Expect the response to be a PDF file
        }
      );

      // Handle the download of the report as a PDF
      const url = window.URL.createObjectURL(new Blob([response.data]), { type: 'application/pdf' });
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "forecasting_report.pdf"); // Set the file name for the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM

      // Show success toast
      toast.success("Report generated successfully!");
    } catch (error) {
      console.error("Error fetching old data:", error);
      toast.error("An error occurred while fetching the forecasting data.");
    } finally {
      setIsLoading(false); // End loading
      setIsDisabled(false); // Enable buttons again
    }
  };

  // Fetch data from the backend or use fallback data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/forecasting");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data, falling back to local data.", error);
        setData([
          { id: 1, store: 1, product_name: "Laptop", sales: 12.07, date: "2024-01-01" },
          { id: 2, store: 1, product_name: "Phone", sales: 8.9, date: "2024-01-02" },
          { id: 3, store: 2, product_name: "Tablet", sales: 6.5, date: "2024-01-03" },
          { id: 4, store: 3, product_name: "Headphones", sales: 4.3, date: "2024-01-04" },
          { id: 5, store: 2, product_name: "Monitor", sales: 10.1, date: "2024-01-05" },
        ]);
      }
    };

    fetchData();
  }, []);

  // Update filtered data when the input value changes
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredData([]);
    } else {
      const lowercasedInput = inputValue.toLowerCase();
      const filtered = data.filter(
        (item) =>
          item.product_name.toLowerCase().includes(lowercasedInput) ||
          item.store.toString().includes(lowercasedInput)
      );
      setFilteredData(filtered);
    }
  }, [inputValue, data]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 px-4 space-y-8">
      {/* Heading Section */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Sales Prediction</h1>

      {/* Button Section */}
      <div className="flex flex-col items-center space-y-2 mb-10">
        <button
          className={`bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition-all shadow-md flex items-center gap-2 ${
            isDisabled ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={completPrediction}
          disabled={isDisabled} // Disable button during prediction
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Get Complete Prediction"
          )}
        </button>
      </div>

      {/* Input Box */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          id="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Store/Product"
          className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            Clear
          </button>
        )}
      </div>

      {/* Table Section */}
      {filteredData.length > 0 ? (
        <Card className="p-6 shadow-lg rounded-lg">
          <div className="overflow-x-auto w-full max-w-4xl mt-6">
            <table className=" table-auto w-full border-collapse border border-gray-300 text-gray-800 ">
              <thead className="rounded-lg">
                <tr className="bg-blue-600 text-white  ">
                  <th className="border border-gray-300 px-4 py-2">Store</th>
                  <th className="border border-gray-300 px-4 py-2">Product Name</th>
                  <th className="border border-gray-300 px-4 py-2">Sales</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-blue-50`}
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {item.store}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {item.product_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      ${item.sales.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : inputValue.trim() !== "" ? (
        <p className="text-gray-600 text-lg mt-6">No results found for "{inputValue}".</p>
      ) : data.length === 0 ? (
        <p className="text-gray-600 text-lg mt-6">No data available. Please try again later.</p>
      ) : null}
    </div>
  );
}

export default Prediction;
