import { ThemeProvider } from "./Context/themeContext";
import DashboardLayout from "./Pages/Main/Dashboard/DashboardLayout";
import Landing from "./Pages/Main/Landing/Landing";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
