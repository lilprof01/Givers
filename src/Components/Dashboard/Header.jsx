import { Bell, PanelLeft, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";

const Header = ({
  setIsCollapsed,
  openNav,
  setOpenNav,
  selectedMenu,
  MenuLinks,
}) => {
  const handleOpenNav = () => {
    setOpenNav(!openNav);

    if (openNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    // Header component for dashboard
    <header
      className={`p-6 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 col-start-2 transition-all duration-300 ${
        window.innerWidth < 768 ? "fixed w-full" : ""
      } flex justify-between items-center align-middle`}
    >
      <div className="flex items-center gap-5 w-full">
        <div onClick={() => setIsCollapsed((prev) => !prev)} className="">
          <PanelLeft strokeWidth={1} size={18} />
        </div>
        <p className="font-semibold text-xl text-gray-800 dark:text-gray-200">
          Dashboard
        </p>
      </div>

      <div className="flex justify-between items-center align-middle w-full">
        <input type="text" className="w-[60%] outline dark:outline-gray-400 rounded-full px-5 py-1 dark:text-gray-400" placeholder="search items, categories..." />
        <button className="flex justify-center items-center align-middle gap-3 bg-gradient-to-r from-blue-500 to-green-500 px-4 py-2 rounded-full">
          <Plus size={15} />
          Give Item
        </button>
        <div><Bell /></div>
        <div className="h-10 w-10 bg-green-300 rounded-full flex items-center justify-center">
          AP
        </div>
      </div>

      {/* Hamburger menu icon */}
      <div
        onClick={handleOpenNav}
        className={`hamburger h-10 w-10 flex flex-col justify-center items-end align-middle z-[100] hover:cursor-pointer sm:hidden`}
      >
        <div
          className={`h-1 w-12 bg-[#121212] dark:bg-[#f6f4ef] ${
            openNav ? "burger1" : "burger-1"
          } `}
        ></div>
        <div
          className={`h-1 w-8 bg-[#121212] dark:bg-[#f6f4ef] ${
            openNav ? "invisible" : "show"
          }`}
        ></div>
        <div
          className={`h-1 w-6 bg-[#121212] dark:bg-[#f6f4ef] ${
            openNav ? "burger2" : "burger-2"
          } `}
        ></div>
      </div>
    </header>
  );
};

export default Header;
