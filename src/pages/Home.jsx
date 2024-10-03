import background from '../assets/SageStock-bg.jpeg';
import logo from '../assets/logo.png';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddCompany from './AddCompany';
import Login from './Login';

function Home() {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/login'); 
  };

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      

      {/* Center Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-xl shadow-xl max-w-3xl">


          {/* Navigation */}
      <div className="absolute top-5 right-5 flex space-x-8 text-white">
        <Link to="/addcompany" className="hover:underline">Add Company</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </div>
        
          <h1 className="text-white p-5 text-4xl font-bold mb-4">StockSage</h1>

          <div className="flex items-center gap-5">
            {/* Paragraph */}
            <p className="text-gray-300 mb-6 flex-1 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repudiandae dolorem ipsa, blanditiis error quam voluptatum quas libero repellendus dolorum amet illo fugiat excepturi unde eius ipsum asperiores porro commodi.
            </p>
            {/* Logo Image */}
            <img className="max-w-80 object-contain" src={logo} alt="StockSage Logo" />
          </div>

          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg"
            onClick={handleClick}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/addcompany" element={<AddCompany />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
 
  );
}
export default Home

