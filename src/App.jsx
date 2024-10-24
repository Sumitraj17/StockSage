import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from 'react-hot-toast'; // Import Toaster from react-hot-toast

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        {/* Register Route */}
        <Route path="/Register" element={<Register />} />
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* Toaster component for toast notifications */}
      <Toaster 
        position="top-right"   // Set position to top-right
        reverseOrder={false}   // Do not reverse the order of toasts
      />
    </Router>
  );
}

export default App;
