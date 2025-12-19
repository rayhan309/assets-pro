import { motion } from "framer-motion";
import { Star, Building2, Users, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";



const stats = [
  {
    icon: <Building2 className="w-8 h-8 text-primary" />,
    value: "100+",
    label: "Companies Trust Us",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    value: "50k+",
    label: "Active Users",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    value: "99.9%",
    label: "Uptime Guarantee",
  },
];

const TrustSection = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('/testimonials.json').then(res => res.json()).then(data => {
            setTestimonials(data);
        });
    }, []);

  return (
    <section className="my-12 my-bg rounded-2xl p-4 md:p-20">
      <div className="">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-4xl font-bold  my-text">
            Trusted by Teams Worldwide
          </span>
          <p className="max-w-2xl mt-4 mx-auto">
            Thousands of professionals rely on our platform to build, scale, and
            succeed.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="flex flex-col items-center text-center p-6 rounded-xl border my-bg"
            >
              {stat.icon}
              <h3 className="text-3xl font-bold mt-4">{stat.value}</h3>
              <p className="mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="my-bg border p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* Stars */}
              <div className="flex mb-4 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="mb-6">“{item.feedback}”</p>

              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
