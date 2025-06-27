import { ThemeProvider } from "./Context/themeContext";
import Dashboard from "./Pages/Main/Dashboard/Dashboard";
import DashboardLayout from "./Pages/Main/Dashboard/DashboardLayout";
import Landing from "./Pages/Main/Landing/Landing";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/userDashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
