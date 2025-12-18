import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Briefcase, 
  Cake, 
  Users, 
  CalendarDays,
  ShieldCheck,
  Building2
} from "lucide-react";

const MyTeam = ({ myTeam = [], uniqueEmployees = [] }) => {
  // Set the first company as default if available
  const [selectedCompany, setSelectedCompany] = useState(uniqueEmployees[0] || "");

  // Filter team based strictly on selected company
  const filteredTeam = myTeam.filter(member => member.companyName === selectedCompany);

  // Filter for Birthdays occurring in the current month
  const upcomingBirthdays = useMemo(() => {
    const currentMonth = new Date().getMonth();
    return myTeam.filter(member => {
      const dob = new Date(member.dateOfBirth);
      return dob.getMonth() === currentMonth;
    });
  }, [myTeam]);

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-10 bg-base-100 min-h-screen">
      
      {/* --- SECTION 1: HEADER & NAVIGATION --- */}
      <div className="mb-10 border-b border-base-200 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-base-content tracking-tight flex items-center gap-3">
              <Building2 className="text-primary" size={36} /> {selectedCompany || "Coding Hero"}
            </h1>
            <p className="text-base-content/60 mt-2 text-lg italic">"Connecting the team, building the future."</p>
          </div>

          {/* Company Selection: Tabs (Desktop) / Select (Mobile) */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase text-primary tracking-widest ml-1">Switch Company</span>
            
            {/* Mobile Dropdown */}
            <select 
              className="select select-bordered w-full md:hidden bg-base-200 border-none"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              {uniqueEmployees.map(com => <option key={com} value={com}>{com}</option>)}
            </select>

            {/* Desktop Tabs */}
            <div className="hidden md:flex join bg-base-200 p-1 rounded-2xl shadow-inner">
              {uniqueEmployees.map(com => (
                <button 
                  key={com}
                  onClick={() => setSelectedCompany(com)}
                  className={`btn btn-md join-item border-none transition-all duration-300 ${
                    selectedCompany === com 
                    ? 'btn-primary shadow-lg scale-105 rounded-xl z-10' 
                    : 'btn-ghost hover:bg-base-300'
                  }`}
                >
                  {com}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: MAIN GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* COLLEAGUE LIST */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
               <Users className="text-primary" size={20} /> Team Members 
               <span className="badge badge-primary badge-outline ml-2">{filteredTeam.length}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTeam.map((member, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  key={member._id}
                  className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="h-2 bg-primary/20 w-full" /> {/* Top Accent Bar */}
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="avatar mb-4">
                        <div className="w-20 rounded-2xl ring ring-primary/10 ring-offset-base-100 ring-offset-4">
                          <img src={member.photo} alt={member.name} />
                        </div>
                      </div>
                      <h3 className="font-extrabold text-xl mb-1">{member.name}</h3>
                      <span className="badge badge-ghost font-medium mb-4">
                        {member.position.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-base-200">
                      <div className="flex items-center gap-3 text-sm text-base-content/70">
                        <Mail size={16} className="text-primary" />
                        <span className="truncate" title={member.email}>{member.email}</span>
                      </div>
                      
                      {member.position === "HR_MANAGER" && (
                        <div className="flex items-center gap-3 text-sm font-bold text-secondary">
                          <ShieldCheck size={16} />
                          <span>Official HR Contact</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* --- SECTION 3: BIRTHDAYS SIDEBAR --- */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-neutral text-neutral-content rounded-3xl p-6 shadow-2xl sticky top-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary rounded-2xl text-primary-content animate-bounce">
                <Cake size={24} />
              </div>
              <div>
                <h2 className="font-black text-xl leading-tight">Monthly Celebrations</h2>
                <p className="text-xs opacity-60 flex items-center gap-1">
                  <CalendarDays size={12} /> Current Month Only
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {upcomingBirthdays.length > 0 ? (
                upcomingBirthdays.map((bday) => (
                  <div key={bday._id} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-colors">
                    <div className="avatar shrink-0">
                      <div className="w-12 rounded-xl">
                        <img src={bday.photo} alt={bday.name} />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">{bday.name}</p>
                      <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                        <Cake size={12} /> 
                        {new Date(bday.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-30 italic text-sm border-2 border-dashed border-white/10 rounded-2xl">
                    No team birthdays this month
                </div>
              )}
            </div>
            
            <div className="mt-8 p-4 bg-primary/10 rounded-2xl border border-primary/20 text-center">
               <p className="text-xs font-bold uppercase tracking-widest text-primary">HR Announcement</p>
               <p className="text-[10px] opacity-70 mt-1 italic text-white">"Don't forget to wish them well on Slack!"</p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default MyTeam;