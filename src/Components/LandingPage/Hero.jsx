import { Gift, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="text-gray-900 dark:text-gray-200 flex flex-col items-center justify-center py-16 h-screen">
      <div className="flex flex-col items-center justify-center text-center p-16 lg:w-5xl">
        <h2 className="text-4xl lg:text-7xl font-bold mb-4">
          Transform Unused Items Into{" "}
          <span className="bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 text-transparent">
            Community Treasures
          </span>
        </h2>
        <p className="text-lg opacity-70 mb-8">
          Join a community where giving meets receiving. Share items you no
          longer need with those who can use them. Free, sustainable, and
          meaningful.
        </p>
        <div className="flex space-x-4">
          <Link to="/signup" className="px-6 py-3 bg-gradient-to-br from-blue-400 to-blue-700 text-white rounded-full hover:scale-105 transition-all duration-300 cursor-pointer font-semibold">
            Start Giving
          </Link>
          <Link to="/signup" className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full hover:scale-105 hover:bg-green-600 hover:text-white transition-all duration-400 cursor-pointer font-semibold">
            Find Item
          </Link>
        </div>
        <div></div>
        <div className="flex flex-col lg:flex-row items-center justify-center mt-12">
          <div className="flex items-center justify-center border-r p-4">
            <Users className="text-blue-400" />
            <p>10,000+ Community Members</p>
          </div>
          <div className="flex items-center justify-center p-4">
            <Gift className="text-green-400" />
            <p>5,000+ Shared Items</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
