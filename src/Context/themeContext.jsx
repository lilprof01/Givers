import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
    // 1. Check local storage first for user's explicit preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      return true;
    }
    if (storedTheme === 'light') {
      return false;
    }
    // 2. If no preference in local storage, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Effect to listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Handler for changes in system theme preference
    const handleChange = (e) => {
      // Only update if the user hasn't manually set a theme (i.e., no 'theme' in localStorage)
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
        console.log("window theme applied", mediaQuery)
      }
    };

    // Add event listener for changes
    mediaQuery.addEventListener('change', handleChange);

    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDarkMode = () => useContext(ThemeContext);
