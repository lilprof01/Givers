import { ThemeProvider } from "./Context/themeContext";
import Landing from "./Pages/Main/Landing/Landing";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
