"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card"; // Assuming you have a Card component
import { forecasting } from "@/data/predictions"; // Local fallback data

function StoreSalesCards() {
  const [data, setData] = useState([]);

  // Fetch data from the backend or fallback to local data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/forecasting");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching forecasting data. Falling back to local data.", error);
        setData(forecasting);
      }
    };

    fetchData();
  }, []);

  // Group data by store and include product names
  const groupedData = data.reduce((acc, curr) => {
    const store = acc.find((item) => item.store === curr.store);
    if (store) {
      store.totalSales += curr.sales;
      store.products.push(curr.product_name); // Collect product names
    } else {
      acc.push({
        store: curr.store,
        totalSales: curr.sales,
        products: [curr.product_name],
      });
    }
    return acc;
  }, []);


  
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {groupedData.map((store) => (
        <Card key={store.store} className="p-4 shadow-lg max-w-xs">
          <h2 className="text-2xl font-bold mb-4">Store {store.store}</h2>
          <p className="text-lg mb-4">Total Sales: ${store.totalSales.toFixed(2)}</p>
          <p className="text-lg font-semibold">Products:</p>
          <ul className="list-disc pl-5 mb-4">
            {store.products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

export default StoreSalesCards;
