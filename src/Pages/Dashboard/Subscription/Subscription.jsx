import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Crown, Rocket } from "lucide-react";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import useUserRole from "../../../Hooks/useUserRole";

const Subscription = () => {
  const axiosSquer = useAxiosSquer();
  const { user } = useAuth();
  const {userInfo} = useUserRole();

  const { data: priceing = [], isLoading } = useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const res = await axiosSquer.get("/priceing");
      return res.data;
    },
  });
  // console.log(userInfo)

  if (isLoading) return <Loading />;

  const handlePayment = (plan) => {
    const subPlan = { ...plan, customerEmail: user?.email };
    axiosSquer.post(`create-checkout-session`, subPlan)
      .then(res => {
        if (res.data.url) window.location.href = res.data.url;
      })
      .catch(() => toast.error("Payment failed. Try again."));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/*  */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10" />

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-4 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md"
        >
          <span className="text-primary text-sm font-bold tracking-widest uppercase flex items-center gap-2">
            <Sparkles size={14} /> Pricing Plans
          </span>
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Scale?</span>
        </h2>
        <p className="max-w-xl mx-auto text-gray-400 text-lg">
          Choose a plan that works best for your team and start managing assets like a pro.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {priceing.map((plan, idx) => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            whileHover={{ y: -12 }}
            className="group relative my-bg rounded-3xl"
          >
            {/*  */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
            
            <div className="relative h-full border border-white/5 p-8 rounded-[23px] flex flex-col shadow-2xl">
              
              <div className="mb-6">
                {idx === 0 ? <Rocket className="text-primary" size={32} /> : idx === 1 ? <Sparkles className="text-blue-400" size={32} /> : <Crown className="text-yellow-500" size={32} />}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 mb-8 border border-white/5">
                <p className="text-sm text-gray-300">
                  Manage up to <span className="text-primary font-bold">{plan.employeeLimit}</span> employees effortlessly.
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                    <div className="mt-1 bg-primary/20 p-0.5 rounded-full">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
              disabled={idx === 0 || userInfo.subscription === plan.name}
                onClick={() => handlePayment(plan)}
                className="w-full relative group/btn overflow-hidden rounded-xl btn btn-primary text-white font-bold transition-all hover:shadow-[0_0_30px_-5px_rgba(var(--p),0.5)] active:scale-95"
              >
                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                Get Started with {plan.name}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};

export default Subscription;