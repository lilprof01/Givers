import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../Authentication/Firebase";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut(auth);
        console.log("Logged out");
        navigate("/login"); // Redirect after logout
      } catch (error) {
        console.error("Error logging out", error);
        navigate("/"); // Redirect to home if error
      }
    };
    logoutUser();
  }, [navigate]);

  return <p>Logging out...</p>; // Simple feedback
};

export default Logout;