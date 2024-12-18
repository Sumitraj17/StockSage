import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ role }) { // Destructure role from props
  const content = ["Dashboard", "Employee", "Product", "Sales", "Forecasting"];
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (to) => {
    if (to === "Dashboard") to = "";
    navigate("/dashboard/" + to.toLowerCase());
  };
  useEffect(()=>{
    role = localStorage.getItem('role')
  },[])
  return (
    <div
      className="h-screen w-2/12 bg-[#080a45] flex flex-col justify-start items-center p-4 fixed top-0 left-0 overflow-y-auto scrollbar-hide"
    >
      <div className="text-white text-3xl mb-8">StockSage</div>
      {content
        .filter((item) => role || item !== "Employee") // Filter out "Employee" if role is false
        .map((item, index) => (
          <div key={index} className="w-full justify-center items-center">
            <div
              className={`text-white text-center p-2 m-2 w-full ${
                location.pathname.includes("/dashboard/" + item.toLowerCase())
                  ? "bg-[#2a2d80]"
                  : "hover:bg-[#2a2d80]"
              }`}
            >
              <button
                className="p-4 text-lg"
                onClick={() => handleClick(item)}
              >
                {item}
              </button>
            </div>
            <hr className="w-full justify-center m-2" />
          </div>
        ))}
    </div>
  );
}

export default Sidebar;
