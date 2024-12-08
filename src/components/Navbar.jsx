import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-[#080a45] flex justify-between items-center py-4 px-8 shadow-lg">
      <div className="text-white">
        <h1 className="font-serif text-2xl font-bold tracking-wide">
     
        </h1>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          className="p-2 text-white cursor-pointer hover:bg-[#2a2d80] rounded-full transition-all"
          onClick={toggleDropdown}
        >
          <CgProfile size={30} />
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 overflow-hidden">
            <div className="flex flex-col items-center p-4 border-b">
              <CgProfile size={40} className="text-gray-500" />
              <h2 className="text-lg font-semibold">John Doe</h2>
              <p className="text-sm text-gray-600">johndoe@example.com</p>
            </div>
            <ul className="text-black">
              <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-600">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
