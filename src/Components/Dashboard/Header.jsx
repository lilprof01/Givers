import { Bell, PanelLeft, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  doc, getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Authentication/Firebase";

const Header = ({
  setIsCollapsed,
  openNav,
  setOpenNav,
  selectedMenu,
  MenuLinks,
}) => {
  const [userData, setUserData] = useState({ username: "", email: "" });

useEffect(() => {
  // 1️⃣  Wait for Firebase to emit the current user
  const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
    if (!fbUser) return;           // nobody signed in

    try {
      // 2️⃣  Fetch that user’s document directly by UID
      const snap = await getDoc(doc(db, "users", fbUser.uid));

      if (snap.exists()) {
        const { username = "", email = "" } = snap.data();
        setUserData({ username, email });
      }
    } catch (err) {
      console.error("Failed to load user data:", err);
    }
  });

  // 3️⃣  Clean up the listener when the component unmounts
  return () => unsubscribe();
}, []);


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
    <header
      className={`p-6 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 col-start-2 transition-all duration-300 ${
        window.innerWidth < 768 ? "fixed w-full" : ""
      } flex justify-between items-center align-middle`}
    >
      <div className="flex items-center gap-5 w-[40%]">
        <div onClick={() => setIsCollapsed((prev) => !prev)} className="cursor-pointer">
          <PanelLeft strokeWidth={1} size={18} />
        </div>
        <p className="font-semibold text-xl text-gray-800 dark:text-gray-200">
          Dashboard
        </p>
      </div>

      <div className="flex justify-end items-center align-middle gap-5 w-[60%]">
        <input type="text" className="w-[50%] outline dark:outline-gray-400 rounded-full px-5 py-1 text-gray-600 dark:text-gray-400 placeholder:text-gray-400" placeholder="search items, categories..." />
        <button className="flex justify-center items-center align-middle gap-3 bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 hover:from-blue-600 hover:to-green-600 cursor-pointer px-4 py-2 rounded-full text-white font-semibold">
          <Plus size={18} />
          Give Item
        </button>
        <div><Bell /></div>
        <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 rounded-full flex items-center justify-center text-white">
        
          {userData.username?.[0]?.toUpperCase() || "U"}
        </div>
      </div>

      {/* Hamburger menu icon */}
      <div
        onClick={handleOpenNav}
        className={`hamburger h-10 w-10 flex flex-col justify-center items-end align-middle z-[100] hover:cursor-pointer sm:hidden`}
      >
        <div
          className={`h-1 w-12 bg-[#121212] dark:bg-[#f6f4ef] ${
            openNav ? "burger1" : "burger-1"
          } `}
        ></div>
        <div
          className={`h-1 w-8 bg-[#121212] dark:bg-[#f6f4ef] ${
            openNav ? "invisible" : "show"
          }`}
        ></div>
        <div
          className={`h-1 w-6 bg-[#121212] dark:bg-[#f6f4ef] ${
            openNav ? "burger2" : "burger-2"
          } `}
        ></div>
      </div>
    </header>
  );
};

export default Header;
