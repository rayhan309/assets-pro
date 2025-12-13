import { motion } from "framer-motion";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import Priching from "../Priching/Priching";
import { useState } from "react";
import Loading from "../../../Components/Loading/Loading";
import Features from "../Features/Features";
import TrustSection from "../TrustSection/TrustSection";
import ExtraSections from "../ExtraSections/ExtraSections";

const Home = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if(loading) {
    return <Loading />
  }

  return (
    <div>
      <Banner />
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-bold mb-10 mt-20 text-center bg-gradient-to-r from-slate-50/10 via-white/80 to-slate-50/10 bg-clip-text text-transparent"
        >
          About Us
        </motion.h1>
      </div>
      <AboutUs />
      <Priching />
      <Features />
      <TrustSection />
      <ExtraSections />
    </div>
  );
};

export default Home;
