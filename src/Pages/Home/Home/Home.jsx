import { motion } from "framer-motion";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import Priching from "../Priching/Priching";
import { useState } from "react";
import Loading from "../../../Components/Loading/Loading";
import Features from "../Features/Features";
import TrustSection from "../TrustSection/TrustSection";
import ExtraSections from "../ExtraSections/ExtraSections";
import Subscription from "../../Dashboard/Subscription/Subscription";

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
      <div className="mb-10 mt-20 flex justify-center">
        <motion.span
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-bold my-text"
        >
          About Us
        </motion.span>
      </div>
      <AboutUs />
      <div className="my-bg rounded-2xl">
      <Subscription />
      </div>
      <Features />
      <TrustSection />
      <ExtraSections />
    </div>
  );
};

export default Home;
