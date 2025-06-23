import React from "react";
import { useDarkMode } from "../../Context/themeContext";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div
      onClick={() => setDarkMode((prev) => !prev)}
      className="h-5 w-5 bg-black fixed bottom-5 right-5 rounded-full"
    ></div>
  );
};

export default DarkModeToggle;
