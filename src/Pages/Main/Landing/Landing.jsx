import Benefits from "../../../Components/LandingPage/Benefits";
import Community from "../../../Components/LandingPage/Community";
import Hero from "../../../Components/LandingPage/Hero";
import HowItWorks from "../../../Components/LandingPage/HowItWorks";
import Footer from "../../../Components/Main/Footer";
import Header from "../../../Components/Main/Header";
import DarkModeToggle from "../../../Components/Ui/darkModeToggle";
import "./Landing.css";
import { Share, Search, Heart } from "lucide-react";

const Landing = () => {
  return (
    <main className="flex flex-col bg-gray-300 dark:bg-black dark:text-white">
      <DarkModeToggle />
      <Header />
      <section className="bg-gradient-to-tl from-blue-400/35 via-transparent to-green-400/50 dark:to-green-400/10">
        <Hero />
        <HowItWorks />
        <Benefits />
        <Community />
      </section>
      <Footer />
    </main>
  );
};

export default Landing;
