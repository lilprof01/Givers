import { Heart, Search, Share } from "lucide-react";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="text-gray-900 flex flex-col items-center justify-center py-16">
      <div className="flex flex-col items-center justify-center py-16 bg-gray-100/40 dark:bg-black/40 dark:text-gray-200 max-w-5xl mx-auto px-10 rounded-xl text-center">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-lg mb-8 opacity-70">
          Givers is a platform that connects people who want to give away items
          they no longer need to those who are looking for specific items. It's
          simple, free, and helps reduce waste.
        </p>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-full lg:w-1/3 flex flex-col items-center justify-center gap-2 hover:-translate-y-2.5 hover:shadow-2xl transition-all duration-300">
            <div className="p-4 bg-gradient-to-tr from-blue-300 to-blue-600 rounded-2xl text-white">
              <Share />
            </div>
            <h3 className="text-xl font-semibold mb-2">Share Your Items</h3>
            <p className="text-sm opacity-70 line-clamp-3">
              List items you no longer need and make them available to others in
              your community.
            </p>
          </div>
          <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-full lg:w-1/3 flex flex-col items-center justify-center gap-2 hover:-translate-y-2.5 hover:shadow-2xl transition-all duration-300">
            <div className="p-4 bg-gradient-to-tr from-purple-500 to-purple-700 rounded-2xl text-white">
              <Search />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Discover Useful Items
            </h3>
            <p className="text-sm opacity-70 line-clamp-3">
              Browse available items and request what you need from your
              neighbors and community members.
            </p>
          </div>
          <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-full lg:w-1/3 flex flex-col items-center justify-center gap-2 hover:-translate-y-2.5 hover:shadow-2xl transition-all duration-300">
            <div className="p-4 bg-gradient-to-tr from-green-400 to-green-600 rounded-2xl text-white">
              <Heart />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect and Share</h3>
            <p className="text-sm opacity-70 line-clamp-3">
              Meet up with givers and receivers to exchange items in a friendly
              manner and build a stronger community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
