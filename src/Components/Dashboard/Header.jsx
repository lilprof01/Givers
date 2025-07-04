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
      className={`bg-white p-6 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 col-start-2 transition-all duration-300 ${
        window.innerWidth < 768 ? "fixed w-full" : ""
      } flex justify-between items-center align-middle z-[1000]`}
    >
      <div className="flex items-center gap-5 w-[40%]">
        <div onClick={() => setIsCollapsed((prev) => !prev)} className="cursor-pointer">
          <PanelLeft strokeWidth={1} size={18} />
        </div>
        <p className="font-semibold text-xl text-gray-800 dark:text-gray-200">
          Dashboard
        </p>
      </div>

      <div className="flex justify-end items-center align-middle gap-5 w-[60%]">
        <input type="text" className="w-[50%] outline dark:outline-gray-400 rounded-full px-5 py-1 text-gray-600 dark:text-gray-400 placeholder:text-gray-400 hidden lg:block" placeholder="search items, categories..." />
        <button className="sm:flex justify-center items-center align-middle gap-3 bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 hover:from-blue-600 hover:to-green-600 cursor-pointer px-4 py-2 rounded-full text-white font-semibold hidden">
          <Plus size={18} />
          Give Item
        </button>
      </div>
    </header>
  );
};

export default Header;
