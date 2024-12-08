import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DateFormat } from "@/constants/dateFormatter";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // To track the current page

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/sales/getAllDetails",
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSalesData(response.data.sales);
    } catch (err) {
      console.error("Error fetching sales data:", err);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/sales/create-sale",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setFile(null);
      fetchSalesData();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(error.response?.data.message || "File upload failed");
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(salesData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const currentSalesData = salesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div
      className="sales-container"
      style={{
        padding: "20px",
        fontFamily: "'Roboto', sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2
          style={{
            color: "#343a40",
            fontSize: "2rem",
            marginBottom: "20px",
          }}
        >
          <b>Sales Data</b>
        </h2>
        <form
          onSubmit={handleFileUpload}
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              padding: "5px",
              marginRight: "10px",
              fontSize: "1rem",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 16px",
              backgroundColor: "#008000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background-color 0.3s",
            }}
          >
            Upload
          </button>
        </form>
      </div>

      <div style={{ overflowX: "hidden" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead style={{ backgroundColor: "#007BFF", color: "#fff" }}>
            <tr>
              <th style={tableHeaderStyle}>S.No</th>
              <th style={tableHeaderStyle}>Store ID</th>
              <th style={tableHeaderStyle}>Product ID</th>
              <th style={tableHeaderStyle}>Product Name</th>
              <th style={tableHeaderStyle}>Customer Name</th>
              <th style={tableHeaderStyle}>Units Sold</th>
              <th style={tableHeaderStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentSalesData.map((sale, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td style={tableCellStyle}>{sale.storeId}</td>
                <td style={tableCellStyle}>{sale.productId}</td>
                <td style={tableCellStyle}>{sale.productName}</td>
                <td style={tableCellStyle}>{sale.customerId}</td>
                <td style={tableCellStyle}>{sale.unitsSold}</td>
                <td style={tableCellStyle}>{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={paginationButtonStyle}
        >
          Back
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={paginationButtonStyle}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  padding: "10px",
  textAlign: "center",
  border: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "10px",
  textAlign: "center",
  border: "1px solid #ddd",
};

const paginationButtonStyle = {
  padding: "10px 16px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background-color 0.3s",
  opacity: 0.7,
};

export default Sales;
