import { BarChart } from "@/components/BarChart";
import { HistoryChart } from "@/components/HistoryChart";
import { PieChart } from "@/components/PieChart";
import DashboardContextProvider from "@/context/DashboardContextProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function Dashboard() {
  const [highlights,setHighlight] = useState({
    totalProduct:"",
    totalCustomer:"",
    totalItems:"",
  })
  const fetchData = async()=>{
    try {
      const resp = await axios.get("http://localhost:3000/api/v1/sales/dashboard",{withCredentials:true});
      const data = resp.data.data;
      setHighlight({
        totalCustomer:data.totalCustomer,
        totalProduct:data.totalProduct,
        totalItems:data.totalItems
      })
    } catch (error) {
      console.log(error)
      toast.error(error?.response.data.message);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])
  return (
    <DashboardContextProvider>
      <div className="flex flex-col space-y-8 px-4">
        {/* Header Section */}
        <div className="w-full flex flex-col max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans text-start">
            Dashboard
          </h1>
          <hr className="my-4 w-full border-gray-300" />
        </div>

        {/* Summary Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card: Total Sales */}
          <div className="flex flex-col text-center text-black p-6 font-sans border-4 rounded-lg shadow-xl bg-white">
            <h1 className="text-2xl font-bold">{highlights.totalItems}</h1>
            <h2 className="text-green-600">Items Sold</h2>
          </div>

          {/* Card: Total Products */}
          <div className="flex flex-col text-center text-black p-6 font-sans border-4 rounded-lg shadow-xl bg-white">
            <h1 className="text-2xl font-bold">{highlights.totalProduct}</h1>
            <h2 className="text-green-600">Total Products</h2>
          </div>

          {/* Card: Total Customers */}
          <div className="flex flex-col text-center text-black p-6 font-sans border-4 rounded-lg shadow-xl bg-white">
            <h1 className="text-2xl font-bold">{highlights.totalCustomer}</h1>
            <h2 className="text-green-600">Total Customers</h2>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-center bg-white rounded-lg p-4 shadow-md">
            <BarChart />
          </div>

          <div className="flex items-center justify-center bg-white rounded-lg p-4 shadow-md ">
            <PieChart />
          </div>

          {/* history using barchat  */}
          <div>
              <HistoryChart />
          </div>
        </div>
      </div>
    </DashboardContextProvider>
  );
}

export default Dashboard;
