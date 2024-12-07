"use client";

import  { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { forecasting } from "@/data/predictions"; // Assuming this is your local fallback data
import { Card } from "@/components/ui/card";

function Forecasting() {
  const [data, setData] = useState([]);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

  // Fetch data from the backend or fallback to local data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/forecasting");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching forecasting data. Falling back to local data.", error);
        setData(forecasting.slice(0, 5)); // Limit to 5 items for brevity
      }
    };

    fetchData();
  }, []);

  // Format data for PieChart (group sales by product)
  const pieData = data.reduce((acc, item) => {
    const product = acc.find(p => p.name === item.product_name);
    if (product) {
      product.value += item.sales;
    } else {
      acc.push({ name: item.product_name, value: item.sales });
    }
    return acc;
  }, []);

  return (
    <div className=" flex flex-col justify-center forecasting-page-container font-sans space-y-8">
      <h1 className="text-4xl font-bold text-center mb-6">Product Sales Forecasting</h1>

      {/* Bar Chart */}
      <h1 className="text-3xl font-bold text-center ">Bar Graph</h1>

      
      <div className="chart-container flex justify-center">
      <Card className= "shadow-xl">
        <BarChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" name="Sales" />
        </BarChart>
        </Card>
      </div>

      
      

      {/* Line Chart */}
      <h1 className="text-3xl font-bold text-center mb-6">Line Chart</h1>
      <div className="chart-container flex justify-center">
      <Card className= "shadow-xl">
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
        </LineChart>
        </Card>
      </div>

      {/* Pie Chart */}

      <h1 className="text-3xl font-bold text-center mb-6">Pie Chart</h1>
      <div className="chart-container flex justify-center">
      <Card className= "shadow-xl">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </Card>
      </div>
    </div>
  );
}

export default Forecasting;
