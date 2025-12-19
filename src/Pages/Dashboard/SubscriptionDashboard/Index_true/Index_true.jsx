import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, CreditCard, Download, ExternalLink, Zap } from 'lucide-react';


export const StatsCard = ({ title, value, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="relative group p-[1px] rounded-2xl transition-all duration-500 shadow-sm"
  >
    <div className="glass-card p-6 rounded-[15px] flex items-center justify-between h-full">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">{value}</h3>
      </div>
      <div className="text-2xl p-3 group-hover:bg-primary/10 group-hover:text-primary rounded-xl transition-colors duration-300">
        {icon}
      </div>
    </div>
  </motion.div>
);

const Index_true = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 p-2 md:p-6"
    >


      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden rounded-4xl p-8 md:p-12 shadow-2xl"
      >

        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-primary mb-4">
              <Zap size={20} fill="currentColor" />
              <span className="text-sm font-bold uppercase tracking-[0.2em]">Active Membership</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Premium Pro</span>
            </h1>
            <p className="mt-4 text-slate-400 text-lg max-w-lg">
              You have full access to our exclusive tools, priority support, and advanced analytics.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="my-btn hover:bg-primary/90 font-bold rounded-xl transition-all shadow-lg shadow-secondary/25 active:scale-95">
                Explore Benefits
              </button>
              <button className="btn btn-outline font-bold rounded-lg backdrop-blur-md transition-all border border-white/10">
                Documentation
              </button>
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
          >
             <CheckCircle size={80} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
          </motion.div>
        </div>
      </motion.div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Current Plan" value="Premium Pro" icon={<Zap size={24}/>} index={1} />
        <StatsCard title="Next Billing" value="Dec 24, 2025" icon={<Calendar size={24}/>} index={2} />
        <StatsCard title="Total Spent" value="$145.00" icon={<CreditCard size={24}/>} index={3} />
      </div>

    </motion.div>
  );
};

export default Index_true;