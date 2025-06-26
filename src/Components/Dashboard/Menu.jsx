import React from "react";

const Menu = ({ icon, text, isCollapsed, selectedMenu, handleSelectedMenu }) => {
  return (
    // Menu item
    // When clicked, the corresponding page is rendered
    <div
      onClick={handleSelectedMenu}
      className={` rounded-lg h-[10%] flex ${
        isCollapsed ? "justify-center" : "gap-4"
      } p-3 items-center align-middle hover:bg-gradient-to-r from-blue-300 to-green-300 dark:from-blue-500 dark:to-green-500 hover:cursor-pointer ${selectedMenu ? 'bg-gradient-to-r from-blue-300 to-green-300 dark:from-blue-500 dark:to-green-500' : ''} transition-all duration-300`}
    >
      {icon}
      <p
        className={` ${
          isCollapsed ? "hidden" : "block transition-all duration-1000"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default Menu;
