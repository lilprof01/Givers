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
    <div>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-[25px] lg:text-2xl/9 font-bold tracking-tight text-[#6C3BAA]">
          Reset Your Password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full px-[50px] md:px-0 sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleReset} method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
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
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#6C3BAA] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs"
            >
              Reset Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
