import React, { useState } from "react";
import { auth, app, provider, db } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { MdFacebook } from "react-icons/md";
import { IoLogoGoogle } from "react-icons/io";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential)
        toast.success("Logging you into your account...");
        setTimeout(() => navigate("/dashboard"), 3000);
      })
      .catch((error) => {
        toast.error("Invalid Email or Password", { position: "top-center" });
      });
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User signed in:", user);

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            firstName: "",
            lastName: "",
            username: user.displayName,
            phone: "",
            age: "",
            gender: "",
            email: user.email,
            uid: "",
          });
          navigate("/greetings"); // Navigate new users to greetings page
        } else {
          navigate("/dashboard"); // Navigate existing users to dashboard
        }
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
  };

  const handleFacebook = async (e) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User signed in:", user);

      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            firstName: "",
            lastName: "",
            username: user.displayName,
            phone: "",
            age: "",
            gender: "",
            email: user.email,
            uid: "",
          });
          navigate("/greetings"); // Navigate new users to greetings page
        } else {
          navigate("/dashboard"); // Navigate existing users to dashboard
        }
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
  };

  return (
    <div className="dark:bg-[#121212] h-screen flex flex-col justify-center items-center align-middle">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#6C3BAA]">
          Sign in to your account
        </h2>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="mt-10 w-full sm:mx-auto sm:w-full sm:max-w-sm px-10">
        <form className="space-y-6" onSubmit={signIn} method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white"
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="/forgotpassword"
                  className="font-semibold text-[#6C3BAA]"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#6C3BAA] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:cursor-pointer hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleGoogle}
            className="w-full rounded-md text-sm/6 font-bold text-center my-5 bg-white px-3 py-1.5 text-[#6C3BAA] outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6 hover:bg-[#6c3baa] hover:text-white hover:cursor-pointer flex justify-center items-center transition-all duration-75"
          >
            <IoLogoGoogle className="h-6 w-6" />
          </button>
          <button
            onClick={handleFacebook}
            className="w-full rounded-md text-sm/6 font-bold text-center my-5 bg-white px-3 py-1.5 text-[#6C3BAA] outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6 hover:bg-[#6c3baa] hover:text-white hover:cursor-pointer flex justify-center items-center transition-all duration-75"
          >
            <MdFacebook className="h-6 w-6" />
          </button>
        </div>

        <p className="mt-4 text-center text-sm/6 text-gray-500 dark:text-white">
          Not one of us?
          <Link
            to="/signup"
            className="pl-[10px] font-semibold text-[#6C3BAA] hover:text-[#6C3BAA]"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
