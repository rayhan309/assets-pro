import { motion } from "framer-motion";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import assetsLogo from "../../../assets/logo-2.png";
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner />

      <motion.div
        className="w-full my-bg rounded-2xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <img
          className="w-full max-h-[680px] object-fill opacity-30"
          src={assetsLogo}
          alt=""
        />
      </motion.div>

      <div className="mb-10 mt-20 flex justify-center">
        <motion.span
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
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
