import {
  Info,
  Package,
  Mail,
  Calendar,
  UserCheck,
  ShieldCheck,
  Cake,
  CalendarDays,
} from "lucide-react";
import useUserRole from "../../../Hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MyTeam = () => {
  const axiosSqure = useAxiosSquer();
  const { userInfo } = useUserRole();
  const { newJoinCompaye = [] } = userInfo || {};
  const [companyNameSearch, setCompanyNameSearch] = useState("");

  const { data: myTeam = [], isLoading } = useQuery({
    queryKey: ["myTeam", companyNameSearch],
    queryFn: async () => {
      if (!companyNameSearch) return [];
      const resp = await axiosSqure.get(
        `/my-teams?companyName=${companyNameSearch}`
      );
      return resp.data;
    },
    enabled: !!companyNameSearch,
  });

  // LOGIC: Filter birthdays for the current month
  const upcomingBirthdays = useMemo(() => {
    const currentMonth = new Date().getMonth(); // 0 = Jan, 11 = Dec
    return myTeam.filter((member) => {
      if (!member.dateOfBirth) return false;
      const dob = new Date(member.dateOfBirth);
      return dob.getMonth() === currentMonth;
    });
  }, [myTeam]);

  const uniqueEmployees = Array.from(
    new Set(newJoinCompaye.map((emp) => emp.companyName))
  );

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto px-4 md:px-10 py-10 min-h-screen ">
      {/* Header Section */}
      <div className=" mb-10 flex justify-center items-center gap-3 flex-col">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold flex justify-center items-center gap-3 text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary/80"
        >
          <Package className="text-primary" size={22} /> My Active Team
        </motion.span>
        <p className="flex justify-center items-center gap-2 text-gray-400 mt-2">
          <Info size={16} /> View all company team members and HR administration
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-secondary/10 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary/80">
            Active Companies:{" "}
            <span className="text-secondary">( {uniqueEmployees.length} )</span>
          </h3>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="label font-medium whitespace-nowrap">Filter by:</label>
          <select
            onChange={(e) => setCompanyNameSearch(e.target.value)}
            className="select bg-secondary/20 select-bordered select-primary w-full md:w-64 focus:ring-2"
            value={companyNameSearch}
          >
            <option value="">Select Company</option>
            {uniqueEmployees.map((comName, i) => (
              <option key={i} value={comName}>
                {comName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- UPCOMING BIRTHDAYS SECTION --- */}
      <AnimatePresence>
        {upcomingBirthdays.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-secondary rounded-2xl text-secondary-content animate-pulse">
                <Cake size={24} />
              </div>
              <div>
                <h2 className="font-black text-2xl leading-tight">Monthly Celebrations</h2>
                <p className="text-xs opacity-60 flex items-center gap-1">
                  <CalendarDays size={12} /> Team members born in {new Date().toLocaleString('default', { month: 'long' })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingBirthdays.map((bday) => (
                <div key={bday._id} className="flex items-center gap-4 bg-secondary/10 p-4 rounded-2xl border border-secondary/20 shadow-sm">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                      <img src={bday.photo} alt={bday.name} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">{bday.name}</p>
                    <p className="text-xs font-medium text-secondary flex items-center gap-1">
                      <Cake size={10} /> {new Date(bday.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="divider mt-10 opacity-50">Continue to Directory</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TEAM GRID SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {myTeam.length > 0 ? (
            myTeam.map((member, index) => (
              <motion.div
                key={member._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="card w-full bg-secondary/10 shadow-xl border border-base-300 hover:shadow-2xl transition-all group overflow-hidden"
              >
                <figure className="px-6 pt-6 relative">
                  <div className="avatar ring-primary ring-offset-base-100 ring-2 ring-offset-2 rounded-full">
                    <div className="w-24 rounded-full overflow-hidden bg-base-200">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="group-hover:scale-110 transition-transform duration-300 object-cover"
                      />
                    </div>
                  </div>
                  {member.position === "HR_MANAGER" && (
                    <div className="absolute top-8 right-8 badge badge-secondary gap-1 p-3">
                      <ShieldCheck size={14} /> HR
                    </div>
                  )}
                </figure>

                <div className="card-body items-center text-center">
                  <h2 className="card-title text-xl font-bold">{member.name}</h2>
                  <div className="badge badge-outline badge-sm opacity-70 mb-2">
                    {member.companyName}
                  </div>

                  <div className="space-y-2 mt-2 w-full text-sm">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <Mail size={14} className="text-primary" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <Calendar size={14} className="text-primary" />
                      Joined: {new Date(member.memberShipeDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="card-actions mt-4">
                    <button className="btn btn-primary btn-sm btn-outline rounded-full px-6">
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-secondary/10 rounded-2xl">
              <div className="flex flex-col items-center opacity-40">
                <UserCheck size={64} />
                <p className="text-2xl mt-4">Select a company to see your team members</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyTeam;