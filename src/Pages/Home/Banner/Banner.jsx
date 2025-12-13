import React from "react";
import { motion } from "framer-motion";

export default function Banner({
  title = "Secure assets. Smarter teams.",
  subtitle = "Centralize your hardware & licenses, automate tracking, and cut costs.",
  ctaText = "Get Started",
  secondaryCta = "Request Demo",
  imageUrl = "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=1600&q=80",
}) {
  return (
    <section className="relative bg-gradient-to-r from-slate-50/10 via-white to-slate-50/20 my-10 rounded-2xl overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full bg-gradient-to-r from-slate-50/10 via-white to-slate-50/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="inline-block rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-medium shadow-sm">
              Trusted by high-growth teams
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
              {title}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-lg text-slate-600 max-w-xl"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href="#"
                className="inline-flex items-center justify-center border-none rounded-2xl bg-slate-900 text-white btn py-3 text-sm "
                aria-label={ctaText}
              >
                {ctaText}
              </a>

              <a
                href="#"
                className="inline-flex items-center text-sm justify-center bg-gray-300 rounded-2xl btn py-3 "
                aria-label={secondaryCta}
              >
                {secondaryCta}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="pt-4 text-sm text-slate-500"
            >
              <span className="font-medium text-slate-800">24/7 support</span>
              <span className="mx-2">•</span>
              <span>Enterprise-ready security</span>
            </motion.div>
          </motion.div>

          {/* Right - Image / Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <img
                src={imageUrl}
                alt="Professional corporate"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                loading="lazy"
              />

              {/* Subtle overlay cards */}
              <div className="absolute left-6 bottom-6 flex flex-col gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md border border-white/60"
                >
                  <p className="text-xs text-slate-500">Active assets</p>
                  <p className="text-sm font-semibold text-slate-900">1,248</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md border border-white/60"
                >
                  <p className="text-xs text-slate-500">Recently added</p>
                  <p className="text-sm font-semibold text-slate-900">24</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
