import { motion } from "framer-motion";

const motionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

const FAQ = [
  {
    q: "How long does the process take?",
    a: "Timelines depend on your needs, but most projects are completed efficiently.",
  },
  {
    q: "Do I need technical experience?",
    a: "No, everything is designed to be simple and beginner-friendly.",
  },
  {
    q: "Can I request changes?",
    a: "Yes, we’re flexible and happy to adjust based on your feedback.",
  },
  {
    q: "Is support available?",
    a: "Yes, our support team is always available to help.",
  },
];

const assets = [
  {
    title: "Design Assets",
    text: "High-quality UI kits, icons, and brand-ready visuals to speed up your workflow.",
    meta: "UI Kits • Icons • Graphics",
  },
  {
    title: "Development Assets",
    text: "Reusable components, templates, and integrations built for scalability.",
    meta: "Components • APIs • Templates",
  },
  {
    title: "Documentation",
    text: "Clear guides and references to help you launch and maintain with confidence.",
    meta: "Guides • Tutorials • FAQs",
  },
];

const ExtraSections = () => {
  return (
    <motion.div
      {...motionProps}
      className="p-26 bg-gradient-to-r from-slate-50/10 via-white/70 to-slate-50/20 rounded-2xl my-12 space-y-20"
    >
      {/* How It Works */}
      <motion.section {...motionProps} className="text-center">
        <motion.h2 {...motionProps} className="text-3xl font-bold mb-10">
          How It Works
        </motion.h2>

        <motion.div {...motionProps} className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Step 1: Get Started",
              text: "Sign up or contact us to share your requirements. Getting started takes just a few minutes.",
            },
            {
              title: "Step 2: We Do the Work",
              text: "Our team handles everything while keeping you updated throughout the process.",
            },
            {
              title: "Step 3: Get Results",
              text: "Receive a complete, ready-to-use solution tailored to your goals.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              {...motionProps}
              className="p-6 rounded-2xl shadow-md border bg-white/20"
            >
              <motion.h3
                {...motionProps}
                className="text-xl font-semibold mb-2"
              >
                {step.title}
              </motion.h3>
              <motion.p {...motionProps}>{step.text}</motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section {...motionProps}>
        <motion.h2
          {...motionProps}
          className="text-3xl font-bold text-center mb-10"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div {...motionProps} className="space-y-6">
          {FAQ.map((faq, i) => (
            <motion.details
              key={i}
              {...motionProps}
              className="bg-white/20 border p-5 rounded-2xl"
            >
              <summary className="cursor-pointer">
                <motion.span {...motionProps} className="font-semibold">
                  {faq.q}
                </motion.span>
              </summary>
              <motion.p {...motionProps} className="mt-2">
                {faq.a}
              </motion.p>
            </motion.details>
          ))}
        </motion.div>
      </motion.section>

      {/* Assets Section */}
      <motion.section {...motionProps}>
        <motion.h2
          {...motionProps}
          className="text-3xl font-bold text-center mb-10"
        >
          Assets & Resources
        </motion.h2>

        <motion.div {...motionProps} className="grid gap-8 md:grid-cols-3">
          {assets.map((asset, i) => (
            <motion.div
              key={i}
              {...motionProps}
              className="p-6 rounded-2xl shadow-md border bg-white/20"
            >
              <motion.h3
                {...motionProps}
                className="text-xl font-semibold mb-2"
              >
                {asset.title}
              </motion.h3>
              <motion.p {...motionProps} className="mb-4">
                {asset.text}
              </motion.p>
              <motion.span {...motionProps} className="text-sm font-medium">
                {asset.meta}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        {...motionProps}
        className="rounded-2xl p-10 text-center border bg-white/20"
      >
        <motion.h2 {...motionProps} className="text-3xl font-bold mb-4">
          Ready to Get Started?
        </motion.h2>

        <motion.p {...motionProps} className="mb-6">
          Have questions or want to move forward? Let’s talk.
        </motion.p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-2xl btn border-none font-semibold shadow-md"
        >
          Contact Us
        </motion.button>
      </motion.section>
    </motion.div>
  );
};

export default ExtraSections;
