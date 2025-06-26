import Menu from "./Menu";
import logo from "/assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Home, Package, Search, Bell, Settings, LogOut } from "lucide-react";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  selectedMenu,
  handleSelectedMenu,
}) => {
  return (
    // sidebar for dashboard page
    <aside className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 row-span-2 transition-all duration-300 hidden sm:flex flex-col justify-between pt-5">
      <div
        className={`flex ${
          isCollapsed ? "" : ""
        } items-center align-middle transition-all duration-300`}
      >
        {/* <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex flex-col justify-center items-center align-middle gap-1 p-4 hover:cursor-pointer"
        >
          <div className="h-1 w-8 bg-purple-900"></div>
          <div className="h-1 w-8 bg-purple-900"></div>
          <div className="h-1 w-8 bg-purple-900"></div>
        </div> */}

        {!isCollapsed ? (
          <Link to="/" className="mr-2 transition-all duration-300 ml-2">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-500 via-blue-300 to-green-300 rounded-xl mr-2">
                <img src={logo} />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-black dark:from-blue-500 via-blue-400 to-green-400 text-transparent">Givers</h3>
                <p className="text-sm font-light">Dashboard</p>
              </div>
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="py-8 px-2 h-[80%] flex flex-col justify-between align-middle">
        <Menu
          icon={<Home strokeWidth={1} />}
          text="Dashboard"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "home"}
          handleSelectedMenu={() => handleSelectedMenu("home")}
        />
        <Menu
          icon={<Package strokeWidth={1} />}
          text="My Items"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "myItems"}
          handleSelectedMenu={() => handleSelectedMenu("myItems")}
        />
        <Menu
          icon={<Search strokeWidth={1} />}
          text="Browse Items"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "browseItems"}
          handleSelectedMenu={() => handleSelectedMenu("browseItems")}
        />
        <Menu
          icon={<Bell strokeWidth={1} />}
          text="Notifications"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "display"}
          handleSelectedMenu={() => handleSelectedMenu("notifications")}
        />
        <Menu
          icon={<Settings strokeWidth={1} />}
          text="Settings"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "language"}
          handleSelectedMenu={() => handleSelectedMenu("language")}
        />
        <Menu
          icon={<LogOut strokeWidth={1} />}
          text="Logout"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "logout"}
          handleSelectedMenu={() => handleSelectedMenu("logout")}
        />
      </div>
      <div
        onClick={() => handleSelectedMenu("profile")}
        className={`h-[10%] rounded-tr-2xl rounded-tl-2xl flex ${
          isCollapsed ? "justify-center" : "justify-start"
        } p-3 items-center align-middle gap-2 hover:cursor-pointer border-t`}
      >
        <div className="h-10 w-10 bg-green-300 rounded-full flex items-center justify-center">
          {/* <FaUser className="h-6 w-6" /> */}
          AP
        </div>

        <div>
          <p
          className={`font-semibold ${
            isCollapsed ? "hidden" : "block"
          } transition-all duration-500`}
        >
          Aniyajuwon Pelumi
        </p>
        <a className="text-sm font-light">adewumime@gmail.com</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
