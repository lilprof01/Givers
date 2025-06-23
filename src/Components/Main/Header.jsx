import React from "react";
import logo from "/assets/images/logo.png";

const Header = () => {
  return (
    <header className="header bg-gray-300/50 dark:bg-black/50 h-20 flex items-center justify-between px-1 sm:px-4 shadow-gray-700 sticky -top-[10px] z-[1000000]">
      <div className="flex items-center justify-center">
        <div className="pb-2">
          <img src={logo} width={60} height={60} />
        </div>

        <div>
          <p className="text-xl sm:text-2xl font-bold -ml-2 font-sour-gummy">
            Givers
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg font-semibold cursor-pointer hover:scale-105 hover:bg-green-600 hover:text-white transition-all duration-300">
          Login
        </button>
        <button className="px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold cursor-pointer hover:scale-105 transition-all duration-300">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
