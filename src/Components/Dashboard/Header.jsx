import React, { useState, useEffect } from 'react'


const Header = ({ openNav, setOpenNav}) => {

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
    <header className={`p-6 border-b col-start-2 transition-all duration-300 ${window.innerWidth < 768 ? 'fixed w-full' : ''} flex justify-between sm:justify-end items-center align-middle`}>

      {/* Hamburger menu icon */}
      <div
        onClick={handleOpenNav}
        className={`hamburger h-10 w-10 flex flex-col justify-center items-end align-middle z-[100] hover:cursor-pointer sm:hidden`}
      >
        <div
          className={`h-1 w-12 bg-[#121212] dark:bg-[#f6f4ef] ${openNav ? 'burger1' : 'burger-1'} `}
        ></div>
        <div
          className={`h-1 w-8 bg-[#121212] dark:bg-[#f6f4ef] ${openNav ? 'invisible' : 'show'}`}
        ></div>
        <div
          className={`h-1 w-6 bg-[#121212] dark:bg-[#f6f4ef] ${openNav ? 'burger2' : 'burger-2'} `}
        ></div>
      </div>
    </header>
  )
}

export default Header;