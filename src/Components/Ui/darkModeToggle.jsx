import React from "react";
import { useDarkMode } from "../../Context/themeContext";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div
      onClick={() => setDarkMode((prev) => !prev)}
      className="h-10 w-10 bg-black fixed bottom-5 right-5 rounded-full"
    ></div>
  );
};

export default DarkModeToggle;
