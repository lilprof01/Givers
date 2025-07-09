import React, { useState } from "react";
import { auth, app, db, provider } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
// import { FaGoogle } from 'react-icons/fa6'
import { getDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { MdFacebook } from "react-icons/md";
import { IoLogoGoogle } from "react-icons/io";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);

      // Store additional user data in Firestore
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          firstName: firstname,
          lastName: lastname,
          username: username,
          phone: phone,
          gender: gender,
          email: user.email,
          address: address,
          uid: user.uid,
        });
      }

      toast.success("Creating your account...");
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
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

        if (userSnap.exists()) {
          // Existing user -> Navigate to dashboard
          navigate("/dashboard");
        } else {
          await setDoc(doc(db, "users", user.uid), {
            firstName: "",
            lastName: "",
            username: user.displayName,
            phone: "",
            gender: "",
            address: "",
            email: user.email,
            uid: "",
          });
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
  };

  return (
    <div className="dark:bg-black dark:text-gray-200 w-full h-screen flex flex-col justify-center items-center align-middle">
      <section className="w-full h-full bg-gradient-to-tl from-blue-400/35 via-transparent to-green-400/10 dark:to-green-400/10 p-5 flex flex-col justify-center items-center align-middle">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-4xl/9 font-bold tracking-tight bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 text-transparent">
            Welcome to Givers
          </h2>
          <h5 className="mt-2 text-center opacity-70 tracking-tight">
            Create your account and start sharing
          </h5>
        </div>
        <ToastContainer position="top-center" autoClose={3000} />

        <div className="mt-5 sm:mx-auto sm:w-full md:px-0 sm:max-w-sm">
          <form
            onSubmit={signUp}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <div className="mt-2 flex justify-center items-center gap-7">
                <input
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  placeholder="First Name"
                  className="block w-full md:w-full rounded-md px-3 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-300 sm:text-sm/6"
                />
                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  placeholder="Last Name"
                  className="block w-full md:w-full rounded-md px-3 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-300 sm:text-sm/6"
                />
              </div>
              <div className="mt-2 flex justify-center items-center align-middle gap-7">
                <input
                  type="text"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your Username"
                  className="block w-full md:w-full rounded-md mt-2 px-3 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-300 sm:text-sm/6"
                />
                <input
                  type="text"
                  id="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="block w-full md:w-full rounded-md px-3 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-300 sm:text-sm/6"
                />
              </div>
              <div>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Address"
                    className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-300 sm:text-sm/6"
                  />
                </div>
                <div className="flex justify-center items-center gap-7">
                  <select
                    id="gender"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full rounded-md px-3 py-1.5 mt-2 text-base text-gray-900 dark:text-gray-200 outline outline-gray-300 focus:outline-2 focus:outline-indigo-300 sm:text-sm *:dark:bg-black"
                  >
                    <option value="" disabled defaultValue>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="Address"
                  className="block w-full rounded-md mt-2 px-3 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-300 sm:text-sm/6"
                />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="block w-full rounded-md mt-2 px-3 py-1.5 text-base text-gray-900 dark:text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-300 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 px-3 py-1.5 text-sm/6 font-semibold text-white hover:cursor-pointer hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex justify-between items-center align-middle my-5">
            <div className="h-[0.5px] w-[45%] bg-black dark:bg-white" />
            <p className="text-xs text-center w-[10%]">Or</p>
            <div className="h-[0.5px] w-[45%] bg-black dark:bg-white" />
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handleGoogle}
              className="w-full rounded-md text-sm/6 font-bold text-center px-3 py-1.5 outline -outline-offset-1 outline-gray-300 sm:text-sm/6 hover:text-[15px] dark:hover:text-white cursor-pointer flex justify-center items-center gap-3 transition-all duration-75"
            >
              <IoLogoGoogle className="h-5 w-5" /> Continue with Google
            </button>
          </div>

          <p className="text-center text-sm/6 text-gray-500">
            Already one of us?
            <Link
              to="/login"
              className="pl-[10px] font-semibold text-indigo-400"
            >
              Log in to your account
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Signup;
