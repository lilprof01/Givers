import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Dashboard/Sidebar";
import MobileNav from "../../../Components/Dashboard/MobileNav";
import Header from "../../../Components/Dashboard/Header";
import { Home, Package, Search, Bell, Settings, LogOut } from "lucide-react";
import DarkModeToggle from "../../../Components/Ui/darkModeToggle";

const DashboardLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openNav, setOpenNav] = useState(false);

  const MenuLinks = [
    {
      icon: <Home strokeWidth={1} />,
      text: "Dashboard",
      menuName: "home",
    },
    {
      icon: <Package strokeWidth={1} />,
      text: "My Gifts",
      menuName: "myGifts",
    },
    {
      icon: <Search strokeWidth={1} />,
      text: "Browse Items",
      menuName: "browseItems",
    },
    {
      icon: <Bell strokeWidth={1} />,
      text: "Notifications",
      menuName: "notifications",
    },
    {
      icon: <Settings strokeWidth={1} />,
      text: "Settings",
      menuName: "settings",
    },
    {
      icon: <LogOut strokeWidth={1} />,
      text: "Logout",
      menuName: "logout",
    },
  ];

  const navigate = useNavigate();

  const handleSelectedMenu = (menu) => {
    if (menu === 'logout') {
      navigate('/');
    } else {
      setSelectedMenu(menu);
    }
    setOpenNav(false);
  };

  return (
    <main
      className={`flex flex-col sm:grid ${
        isCollapsed ? "grid-cols-[80px_1fr]" : "grid-cols-[220px_1fr]"
      } grid-rows-[80px_1fr] h-screen transition-all duration-500 dark:bg-[#121212] dark:text-white`}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        handleSelectedMenu={handleSelectedMenu}
        selectedMenu={selectedMenu}
        MenuLinks={MenuLinks}
      />
      <Header
        setIsCollapsed={setIsCollapsed}
        openNav={openNav}
        setOpenNav={setOpenNav}
        selectedMenu={selectedMenu}
        MenuLinks={MenuLinks}
      />
      {openNav && (
        <MobileNav
          openNav={openNav}
          handleSelectedMenu={handleSelectedMenu}
          selectedMenu={selectedMenu}
        />
      )}
      <Outlet />
      <DarkModeToggle />
    </main>
  );
};

export default DashboardLayout;
