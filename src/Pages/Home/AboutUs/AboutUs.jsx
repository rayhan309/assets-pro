import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Layers, Clock, BarChart3 } from "lucide-react";

const benefits = [
  {
    title: "Centralized Asset Control",
    desc: "Manage hardware, software, and licenses from a single, unified dashboard without friction.",
    icon: <Layers className="w-6 h-6 text-[#f77e52]" />,
  },
  {
    title: "Improved Compliance & Security",
    desc: "Stay audit‑ready with automated logs, tracking, and permission‑based access for teams.",
    icon: <ShieldCheck className="w-6 h-6 text-[#f77e52]" />,
  },
  {
    title: "Save Time with Automation",
    desc: "Cut 40% of manual work using automated alerts, asset lifecycles, and real‑time updates.",
    icon: <Clock className="w-6 h-6 text-[#f77e52]" />,
  },
  {
    title: "Data‑Driven Decision Making",
    desc: "Access asset health, utilization patterns, and ROI dashboards to reduce overspending.",
    icon: <BarChart3 className="w-6 h-6 text-[#f77e52]" />,
  },
];

const AboutUs = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-20 glass-card mb-12 p-4 md:p-20 rounded-2xl text-white"
    >
      <div className="">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Why Teams Trust AssetVerse
          </h2>
          <p className="mt-4 text-lg">
            A modern platform built for organizations that value efficiency,
            compliance, and clarity.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-lg border bg-[#f77e5230] border-slate-100 hover:shadow-xl transition cursor-pointer"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semiboldmb-2">{item.title}</h3>
              <p className=" text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
