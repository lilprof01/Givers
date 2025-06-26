import React from "react";

const Menu = ({ icon, text, isCollapsed, selectedMenu, handleSelectedMenu }) => {
  return (
    // Menu item
    // When clicked, the corresponding page is rendered
    <div
      onClick={handleSelectedMenu}
      className={` rounded-2xl h-[10%] flex ${
        isCollapsed ? "justify-center" : "gap-4"
      } p-3 items-center align-middle hover:bg-purple-300 dark:hover:bg-[#6c3baa6d] hover:cursor-pointer ${selectedMenu ? 'bg-purple-300 dark:bg-[#6c3baa6d]' : ''}`}
    >
      {icon}
      <p
        className={`text-lg ${
          isCollapsed ? "hidden" : "block transition-all duration-1000"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default Menu;
