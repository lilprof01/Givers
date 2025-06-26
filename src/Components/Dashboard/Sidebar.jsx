import Menu from "./Menu";
import logo from "/assets/images/logo.png";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  MdHome,
  MdLeaderboard,
  MdDisplaySettings,
  MdLanguage,
  MdLogout,
} from "react-icons/md";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  selectedMenu,
  handleSelectedMenu,
}) => {
  return (
    // sidebar for dashboard page
    <aside className="border row-span-2 transition-all duration-300 hidden sm:flex flex-col justify-between ">
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
          <Link
            to="/"
            className="mr-2 transition-all duration-300 ml-2"
          >
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 via-black to-green-500 rounded-xl mr-2">
                <img src={logo} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Givers</h3>
                <p className="">Dashboard</p>
              </div>
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="py-8 px-2 h-[80%] flex  flex-col justify-between align-middle">
        <Menu
          icon={<MdHome className="h-6 w-6" />}
          text="Dashboard"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "home"}
          handleSelectedMenu={() => handleSelectedMenu("home")}
        />
        <Menu
          icon={<MdLeaderboard className="h-6 w-6" />}
          text="My Items"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "leaderboard"}
          handleSelectedMenu={() => handleSelectedMenu("leaderboard")}
        />
        <Menu
          icon={<MdLeaderboard className="h-6 w-6" />}
          text="Browse Items"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "leaderboard"}
          handleSelectedMenu={() => handleSelectedMenu("leaderboard")}
        />
        <Menu
          icon={<MdDisplaySettings className="h-6 w-6" />}
          text="Notifications"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "display"}
          handleSelectedMenu={() => handleSelectedMenu("display")}
        />
        <Menu
          icon={<MdLanguage className="h-6 w-6" />}
          text="Settings"
          isCollapsed={isCollapsed}
          selectedMenu={selectedMenu === "language"}
          handleSelectedMenu={() => handleSelectedMenu("language")}
        />
        <Menu
          icon={<MdLogout className="h-6 w-6" />}
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
        } p-3 items-center align-middle gap-8 hover:cursor-pointer`}
      >
        <FaUser className="h-6 w-6" />
        <p
          className={`text-xl ${
            isCollapsed ? "hidden" : "block"
          } transition-all duration-500`}
        >
          Profile
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
