import "./Landing.css";
import logo from "/assets/images/logo.png";
import wave from "/assets/images/wave-haikei.png";

const Landing = () => {
  return (
    <main className="flex flex-col">
      <header className="header h-20 flex items-center justify-between px-1 sm:px-4 shadow shadow-gray-700 sticky -top-[10px] z-[1000000]">
        <div className="flex items-center justify-center">
          <img src={logo} width={50} height={50} />
          <p className="text-xl sm:text-2xl font-bold -ml-2">Givers</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-white font-semibold cursor-pointer hover:scale-105">
            Login
          </button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-white font-semibold cursor-pointer hover:scale-105">
            Sign Up
          </button>
        </div>
      </header>
      <section
        className={`relative bg-[url(/assets/images/giveHeart.jpg)] bg-cover bg-center h-screen flex items-center justify-center`}
      >
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="text-8xl font-bold mb-4 text-black">Givers</h1>
        </div>
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-transparent via-transparent to-green-400/50" />
      </section>
      <section className="text-gray-800 flex flex-col items-center justify-center py-16 bg-gradient-to-tl from-blue-400/35 via-transparent to-green-400/50">
        <div className="flex flex-col items-center justify-center text-center p-16 lg:w-5xl">
          <h2 className="text-4xl lg:text-7xl font-bold mb-4">
            Transform Unused Items Into{" "}
            <span className="bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 text-transparent">
              Community Treasures
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join a community where giving meets receiving. Share items you no
            longer need with those who can use them. Free, sustainable, and
            meaningful.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-gradient-to-br from-blue-400 to-blue-700 text-white rounded-full hover:scale-105 transition-all duration-300 cursor-pointer font-semibold">
              Start Giving
            </button>
            <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-full hover:scale-105 hover:bg-green-600 hover:text-white transition-all duration-400 cursor-pointer font-semibold">
              Find Item
            </button>
          </div>
          <div></div>
          <div className="flex flex-col lg:flex-row items-center justify-center mt-12">
            <div className="flex items-center justify-center border-r p-4">
              <p>Icon</p>
              <p>10,000+ Community Members</p>
            </div>
            <div className="flex items-center justify-center p-4">
              <p>Icon</p>
              <p>5,000+ Shared Items</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-gray-800 flex flex-col items-center justify-center py-16">
        <div className="flex flex-col items-center justify-center py-16 bg-gray-100 max-w-5xl mx-auto px-10 rounded-xl">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 mb-8">
            Givers is a platform that connects people who want to give away
            items they no longer need with those who are looking for specific
            items. It's simple, free, and helps reduce waste.
          </p>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/3">
              <h3 className="text-xl font-semibold mb-2">Give</h3>
              <p>
                List items you no longer need and make them available to others
                in your community.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/3">
              <h3 className="text-xl font-semibold mb-2">Receive</h3>
              <p>
                Browse available items and request what you need from your
                neighbors.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/3">
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p>
                Meet up with givers and receivers to exchange items in a
                friendly manner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center py-16">
        <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
          <h2 className="text-3xl sm:text-6xl font-bold">
            Benefits For Everyone
          </h2>
          <p className="text-lg sm:text-xl opacity-65">
            Wether You're Giving or Receiving, Givers Create Value for the
            Entire Community
          </p>
        </div>
      </section>
    </main>
  );
};

export default Landing;
