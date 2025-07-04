import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Dashboard/Sidebar";
import MobileNav from "../../../Components/Dashboard/MobileNav";
import Header from "../../../Components/Dashboard/Header";
import { Home, Package, Bell, Settings, LogOut } from "lucide-react";
import DarkModeToggle from "../../../Components/Ui/darkModeToggle";
import Dashboard from "./Dashboard";
import MyItems from "./MyItems";
import Profile from "./Profile";

const DashboardLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openNav, setOpenNav] = useState(false);

  const MenuLinks = [
    {
      icon: <Home strokeWidth={1} />,
      text: "Home",
      menuName: "home",
    },
    {
      icon: <Package strokeWidth={1} />,
      text: "My Items",
      menuName: "myItems",
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
      if (window.innerWidth <= 765) {
        setIsCollapsed(true);
      }
    }
    setOpenNav(false);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "home":
        return <Dashboard />;
      case "myItems":
        return <MyItems />;
      case "profile":
        return <Profile />
    }
  }

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
      {renderContent()}
      <DarkModeToggle />
    </main>
  );
};

export default DashboardLayout;
