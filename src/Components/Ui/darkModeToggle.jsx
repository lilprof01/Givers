import { useDarkMode } from "../../Context/themeContext";
import './Ui.css'

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div
      onClick={() => setDarkMode((prev) => !prev)}
      className={`${!darkMode ? 'toggle shadow-2xl shadow-red-500' : 'toggle-off'} h-5 w-5 fixed bottom-5 right-5 rounded-full cursor-pointer`}
    ></div>
  );
};

export default DarkModeToggle;
