import React, { useEffect, useState } from "react";
import { auth } from "./Firebase";
import { sendEmailVerification } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate("");

  const handleResend = async () => {
    if (user) {
      await sendEmailVerification(user);
      toast.success("Verification email sent again!");
    } else {
      console.error("Error sending verification email:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await user.reload(); // Refresh user data
      if (user.emailVerified) {
        navigate("/dashboard"); // Redirect once verified
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="p-3 dark:bg-[#121212] h-screen flex flex-col justify-center items-center align-middle">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-[25px] lg:text-2xl/9 font-bold tracking-tight text-xl bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 text-transparent">
          Verify Your Email
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full px-[50px] md:px-0 sm:max-w-sm flex flex-col justify-center items-center">
        <p className="mt-3 w-[350px] md:w-full text-center text-[15px] md:text-[25px] font-bold tracking-tight text-black dark:text-white">
          We sent a verification email to {user.email}. Please verify before
          continuing.
        </p>

        <button
          type="submit"
          onClick={handleResend}
          className="mt-4 flex w-[150px] justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs"
        >
          Resend Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
