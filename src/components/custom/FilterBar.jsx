import React, { useState, useEffect, useRef } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io"; // Dropdown icon

const FilterBar = ({ onToggleSidebar }) => {
  const [selectedOption, setSelectedOption] = useState("Best Seller");
  const [isOpen, setIsOpen] = useState(false); // Dropdown visibility state

  const options = ["Best Seller", "Low to High", "High to Low", "Newest First"];
  const dropdownRef = useRef(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-bar border-b border-t py-2">
      <div className="container w-full p-0 mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between">
          {/* Filter Section */}
          <div
            className="filter-sidebar flex items-center space-x-2 pl-4 cursor-pointer"
            onClick={onToggleSidebar} // Toggle the sidebar
          >
            <AiOutlineBars size={14} className="text-gray-600" />
            <span className="text-gray-800 text-sm">Filters</span>
          </div>

          {/* Sorting Section */}
          <div
            className="sorting relative flex items-center text-sm pr-4"
            ref={dropdownRef}
          >
            <span className="text-gray-800 mr-2">Sort by:</span>
            <div className="relative">
              {/* Dropdown trigger */}
              <button
                className="flex items-center text-gray-800 bg-white border border-gray-300 px-3 py-1.5 rounded-md shadow-sm focus:outline-none"
                onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown
              >
                {selectedOption}
                <IoIosArrowDown size={16} className="ml-2 text-gray-600" />
              </button>

              {/* Dropdown options */}
              {isOpen && (
                <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-2 z-10">
                  {options.map((option) => (
                    <li
                      key={option}
                      className={`px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-100 ${
                        option === selectedOption ? "font-semibold" : ""
                      }`}
                      onClick={() => handleOptionChange(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
