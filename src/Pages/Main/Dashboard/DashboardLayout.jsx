import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../../Components/Dashboard/Sidebar'
import MobileNav from '../../../Components/Dashboard/MobileNav'
import Header from '../../../Components/Dashboard/Header'

const DashboardLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const handleSelectedMenu = (menu) => {
    setSelectedMenu(menu);
    setOpenNav(false);
  };

  return (
    <main
          className={`flex flex-col sm:grid ${
            isCollapsed ? "grid-cols-[80px_1fr]" : "grid-cols-[200px_1fr]"
          } grid-rows-[80px_1fr] h-screen transition-all duration-300 dark:bg-[#121212] dark:text-white`}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            handleSelectedMenu={handleSelectedMenu}
            selectedMenu={selectedMenu}
          />
          <Header openNav={openNav} setOpenNav={setOpenNav} />
          {/* {selectedMenu === "home" && <Levels />}
          {selectedMenu === "leaderboard" && <Leaderboard />}
          {selectedMenu === "display" && <Display />}
          {selectedMenu === "language" && <Language />}
          {selectedMenu === "profile" && <Profile />}
          {selectedMenu === "logout" && <Logout />} */}
          {/* {openNav && (
            <MobileNav
              openNav={openNav}
              handleSelectedMenu={handleSelectedMenu}
              selectedMenu={selectedMenu}
            />
          )} */}
        </main>
  )
}

export default DashboardLayout
