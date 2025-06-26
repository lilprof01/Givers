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
  MenuLinks,
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

        
          <Link to="/" className="mr-2 transition-all duration-300 ml-2">
            <div className="flex items-center mb-6">
              <div className={`${isCollapsed ? 'ml-2' : ''} inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-500 via-blue-300 to-green-300 rounded-xl mr-2 transition-all duration-500`}>
                <img src={logo} />
              </div>
              <div className={``}>
                <h3 className={`${isCollapsed ? 'text-[0px]' : 'text-2xl'} font-bold bg-clip-text bg-gradient-to-r from-black dark:from-blue-500 via-blue-400 to-green-400 text-transparent transition-all duration-500`}>
                  Givers
                </h3>
                <p className={`${isCollapsed ? 'text-[0px]' : 'text-xs'} font-light transition-all duration-500`}>Dashboard</p>
              </div>
            </div>
          </Link>
      </div>
      <div className="py-8 px-2 h-[80%] flex flex-col justify-between align-middle">
        {MenuLinks.map((menu) => (
          <>
            <Menu
              icon={menu.icon}
              text={menu.text}
              isCollapsed={isCollapsed}
              selectedMenu={selectedMenu === menu.menuName}
              handleSelectedMenu={() => handleSelectedMenu(menu.menuName)}
            />
          </>
        ))}
      </div>
      <div
        onClick={() => handleSelectedMenu("profile")}
        className={`h-[10%] rounded-tr-2xl rounded-tl-2xl flex ${
          isCollapsed ? "justify-center" : "justify-start"
        } p-3 items-center align-middle gap-2 hover:cursor-pointer border-t`}
      >
        <div className="h-10 w-10 bg-green-300 rounded-full flex items-center justify-center">
          AP
        </div>

        <div className={`${isCollapsed ? 'text-[0px]' : ''} transition-all duration-500`}>
          <p
            className={`font-semibold`}
          >
            Aniyajuwon Pelumi
          </p>
          <a className={`${isCollapsed ? 'text-[0px]' : 'text-xs'} font-light transition-all duration-500`}>adewumime@gmail.com</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
