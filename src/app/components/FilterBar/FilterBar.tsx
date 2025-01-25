"use client";
import { useState } from "react";
import { HiAdjustments } from "react-icons/hi";
import { BsGrid, BsList } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

interface FilterBarProps {
  applyFilter: (option: string) => void; 
}

const FilterBar: React.FC<FilterBarProps> = ({ applyFilter }) => {
  const [sortOption, setSortOption] = useState("All Products");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortingOptions = ["All Products", "0-10000", "10000-0"];

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setIsDropdownOpen(false);
    applyFilter(option);
  };

  return (
    <div className="bg-[#FBF6EE] py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center gap-3 sm:gap-6">
          <button className="flex items-center gap-2 text-black font-medium text-sm sm:text-base hover:text-gray-700">
            <HiAdjustments className="text-base sm:text-lg" />
            <span>Filter</span>
          </button>

          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-300 rounded hover:border-black text-sm sm:text-base">
              <BsGrid />
            </button>
            <button className="p-2 border border-gray-300 rounded hover:border-black text-sm sm:text-base">
              <BsList />
            </button>
          </div>

          <div className="hidden sm:block w-px h-6 bg-gray-300"></div>

          <span className="text-sm text-gray-600">
            Showing filtered products
          </span>
        </div>

        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-black font-medium text-sm sm:text-base">
              Sort by
            </span>
            <div className="relative">
              <button
                className="h-8 px-3 sm:h-10 sm:px-4 flex items-center border border-gray-300 rounded text-gray-500 text-sm sm:text-base hover:text-black"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {sortOption}
                <IoIosArrowDown
                  className={`ml-2 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                  {sortingOptions.map((option, index) => (
                    <button
                      key={index}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleSortChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
