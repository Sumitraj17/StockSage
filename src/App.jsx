
 import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";
 import Home from "./pages/Home";
 import Register from "./pages/Register";
 import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        {/* Add Company Route */}
        <Route path="/Register" element={<Register />} />
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;