import { ThemeProvider } from "./Context/themeContext";
import Dashboard from "./Pages/Main/Dashboard/Dashboard";
import DashboardLayout from "./Pages/Main/Dashboard/DashboardLayout";
import Landing from "./Pages/Main/Landing/Landing";
import { Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ResetPassword from "./Authentication/ResetPassword";
import VerifyEmail from "./Authentication/VerifyEmail";
import GiveItemForm from "./Pages/Main/Dashboard/Give";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ResetPassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/give" element={<GiveItemForm />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
