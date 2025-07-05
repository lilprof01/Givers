import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import {
  HandHeart,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Authentication/Firebase";

const Sidebar = ({
  isCollapsed,
  selectedMenu,
  handleSelectedMenu,
  MenuLinks,
}) => {
  const [userData, setUserData] = useState({ username: "", email: "" });

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const { username = "", email = "" } = userDoc.data();
        setUserData({ username, email });
      }
    }
  });

  return () => unsubscribe();
}, []);

  return (
    // sidebar for dashboard page
    <aside
      className={`bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 row-span-2 transition-all duration-300 sm:flex flex-col justify-between pt-5 ${
        window.innerWidth < 768 ? "fixed w-[250px] h-full z-[999]" : ""
      } ${
        window.innerWidth < 768 && isCollapsed ? "-translate-x-[250px]" : ""
      }`}
    >
      <div
        className={`flex ${
          isCollapsed ? "" : ""
        } items-center align-middle transition-all duration-300`}
      >
        <Link to="/" className="mr-2 transition-all duration-300 ml-2">
          <div className="flex items-center mb-6">
            <div
              className={`${
                isCollapsed ? "ml-2" : ""
              } inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 rounded-xl mr-2 transition-all duration-500`}
            >
              <HandHeart className="text-white" />
            </div>
            <div className={``}>
              <h3
                className={`${
                  isCollapsed ? "text-[0px]" : "text-2xl"
                } font-bold bg-clip-text bg-gradient-to-r from-black dark:from-blue-500 via-blue-400 to-green-400 text-transparent transition-all duration-500`}
              >
                Givers
              </h3>
              <p
                className={`${
                  isCollapsed ? "text-[0px]" : "text-xs"
                } font-light transition-all duration-500`}
              >
                Dashboard
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="py-8 px-2 h-[80%] flex flex-col justify-between align-middle">
        {MenuLinks.map((menu, index) => (
          <>
            <Menu
              key={index}
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
        className={`h-[10%] rounded-tr-2xl rounded-tl-2xl flex p-3 items-center align-middle gap-2 hover:cursor-pointer border-t`}
      >
        <div
          className={`${
            isCollapsed ? "ml-2" : ""
          } h-10 w-10 bg-gradient-to-r from-blue-400 to-green-400 dark:from-blue-600 dark:to-green-600 rounded-full flex items-center justify-center text-white transition-all duration-500`}
        >
          {userData.username?.[0]?.toUpperCase() || "U"}
        </div>

        <div
          className={`${
            isCollapsed ? "text-[0px]" : ""
          } transition-all duration-500`}
        >
          <p className="font-semibold">{userData.username || "User"}</p>
          <a
            className={`${
              isCollapsed ? "text-[0px]" : "text-xs"
            } font-light transition-all duration-500`}
          >
            {userData.email || "user@gmail.com"}
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
