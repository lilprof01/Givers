import { Bell, PanelLeft, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  doc, getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Authentication/Firebase";
import { Link } from "react-router-dom";

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
      className={`bg-white p-6 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 col-start-2 transition-all duration-300 ${
        window.innerWidth < 768 ? "fixed w-full" : ""
      } flex justify-between items-center align-middle z-[1000]`}
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
        <input type="text" className="w-[50%] outline dark:outline-gray-400 rounded-full px-5 py-1 text-gray-600 dark:text-gray-400 placeholder:text-gray-400 hidden lg:block" placeholder="search items, categories..." />
        <Link to="/give" className="sm:flex justify-center items-center align-middle gap-3 bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 hover:from-blue-600 hover:to-green-600 cursor-pointer px-4 py-2 rounded-full text-white font-semibold hidden">
          <Plus size={18} />
          Give Item
        </button>
      </div>
    </header>
  );
};

export default Header;
