import { motion } from "framer-motion";

const features = [
  {
    title: "Fast Performance",
    description:
      "Experience lightning-fast speeds and smooth interactions across the platform.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
  {
    title: "Easy Integration",
    description:
      "Seamlessly integrate with your existing tools and workflows in minutes.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
  {
    title: "Secure & Reliable",
    description:
      "Top-notch security features to keep your data safe and reliable at all times.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    title: "Customizable",
    description:
      "Easily adapt the platform to your unique needs and branding preferences.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h4l3 10h4l3-10h4"
        />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description:
      "Our team is always ready to help you with quick and reliable support.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 12H4"
        />
      </svg>
    ),
  },
  {
    title: "Analytics",
    description:
      "Gain actionable insights with detailed analytics and reporting features.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3"
        />
      </svg>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-16 bg-gradient-to-r from-slate-50/10 via-white/70 to-slate-50/20 rounded-2xl p-20 my-12"
    >
      <div className="px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Key Features</h2>
        <p className="mb-12">
          Discover what makes our product stand out with these amazing features.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              key={index}
              className="bg-white/20 p-6 rounded-xl border shadow hover:shadow-lg transition"
            >
              <div className="text-emerald-600 mb-4 text-4xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
