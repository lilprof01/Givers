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
import { Lock, Mail } from "lucide-react";

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
        setTimeout(() => navigate("/dashboard/userDashboard"), 3000);
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

  return (
    <div className="dark:bg-black dark:text-gray-200 h-screen">
      <section className="w-full h-full bg-gradient-to-tl from-blue-400/35 via-transparent to-green-400/10 dark:to-green-400/10 p-5 flex flex-col justify-center items-center align-middle">
        <div className=" p-5 rounded-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm px-10 text-center">
            <h2 className="mt-5 text-2xl/9 font-bold tracking-tight bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 text-transparent">
              Welcome
            </h2>
            <p className="opacity-70 text-sm">
              Sign in to your account to keep giving and receiving
            </p>
          </div>
          <ToastContainer position="top-center" autoClose={3000} />

          <div className="mt-2 w-full sm:mx-auto sm:w-full sm:max-w-sm px-10">
            <form className="space-y-6" onSubmit={signIn} method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md pl-10 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 dark:outline-gray-300 dark:placeholder:text-gray-200/50 focus:outline focus:-outline-offset-2 focus:outline-indigo-400 sm:text-sm/6"
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
                      className="font-semibold text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md pl-10 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 dark:outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 px-3 py-1.5 text-sm/6 font-semibold text-white hover:cursor-pointer hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="flex justify-between items-center align-middle my-5">
              <div className="h-[0.5px] w-[45%] bg-black dark:bg-white"/><p className="text-xs text-center w-[10%]">Or</p><div className="h-[0.5px] w-[45%] bg-black dark:bg-white"/>
            </div>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handleGoogle}
                className="w-full rounded-md text-sm/6 font-bold text-center my-5  px-3 py-1.5 outline -outline-offset-1 outline-gray-300 sm:text-sm/6 hover:text-[15px] dark:hover:text-white cursor-pointer flex justify-center items-center gap-3 transition-all duration-75"
              >
                <IoLogoGoogle className="h-5 w-5" /> Continue with Google
              </button>
            </div>

            <p className="mt-4 text-center text-sm/6 text-gray-500 dark:text-white">
              Not one of us?
              <Link
                to="/signup"
                className="pl-[10px] font-semibold text-indigo-400"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
