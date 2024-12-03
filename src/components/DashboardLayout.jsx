import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-[#080a45] min-w-[200px]">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="w-full">
          <Navbar />
        </div>

        {/* Outlet (for nested routes) */}
        <div className="flex-1 overflow-auto m-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
