
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Sidebar />
      <div className="content-area">
        <Outlet /> {/* This will render the specific page components */}
      </div>
    </div>
  );
}

export default DashboardLayout;
