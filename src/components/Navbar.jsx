
import { CgProfile } from "react-icons/cg";

function Navbar() {
  return (
    <div className="w-full bg-[#080a45] flex justify-between items-center">
      <div className="Inventory p-5 mx-8 text-white">

      </div>

      <div className="flex mx-8 items-center justify-center">
        {/* Adjust icon size by passing the size prop */}
       
        <div className="p-2 text-white">
          <CgProfile size={30} /> {/* Set size to 30px */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
