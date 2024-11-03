import { useNavigate } from "react-router-dom";

function Sidebar() {
  const content = ["Dashboard", "Employee", "Prediction", "Product"];
  const navigate = useNavigate();

  const handleClick = (to) => {
    navigate("/" + to.toLowerCase());
  };

  return (
    <div className="h-screen w-2/12 bg-[#080a45] flex flex-col justify-start items-center p-4 fixed top-0 left-0">
      <div className="text-white text-2xl mb-8">StockSage</div>
      <hr className="w-full mb-4" />
      {content.map((item, index) => (
        <div key={index} className="w-full">
          <button
            className="text-white text-center hover:bg-[#2a2d80] p-2 m-5 w-full text-left"
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
          <hr className="w-full" />
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
