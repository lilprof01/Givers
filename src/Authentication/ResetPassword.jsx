import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email); // Use auth instead of db
      toast.success("Check your email for password reset instructions.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err.message); // Show a more readable error
    }
  };

  return (
    <div className="dark:bg-black dark:text-gray-200 h-screen">
      <ToastContainer position="top-center" autoClose={3000} />
      <section className="w-full h-full bg-gradient-to-tl from-blue-400/35 via-transparent to-green-400/10 dark:to-green-400/10 p-5 flex flex-col justify-center items-center align-middle">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-[25px] lg:text-2xl/9 font-bold tracking-tight bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 text-transparent">
            Reset Your Password
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full px-[50px] md:px-0 sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleReset} method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs cursor-pointer"
              >
                Reset Email
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
