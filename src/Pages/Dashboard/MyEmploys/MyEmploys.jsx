import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";
import {
  FaEnvelope,
  FaTrashAlt,
  FaBriefcase,
  FaUserPlus,
} from "react-icons/fa";
import Swal from "sweetalert2";

const MyEmploys = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSquer();

  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employees", user?.email],
    queryFn: async () => {
      const resp = await axiosSecure.get(
        `/approvedAssets?email=${user?.email}`
      );
      return resp.data;
    },
  });

  if (isLoading) return <Loading />;

  const uniqueEmployees = Array.from(
    new Map(employees.map((emp) => [emp.employeeEmail, emp])).values()
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // console.log(employees)

  return (
    <div className="p-4 sm:p-6 lg:p-10 min-h-screen">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10 text-center md:text-left"
      >
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary inline-block">
          Employee Directory
        </h2>
        <p className="text-gray-400 mt-2 flex items-center justify-center md:justify-start gap-2">
          <FaBriefcase /> Total Active Members:{" "}
          <span className="text-white font-bold">{uniqueEmployees.length}</span>
        </p>
      </motion.div>

      {uniqueEmployees.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center mt-20 p-10 border-2 border-dashed border-gray-700 rounded-3xl bg-slate-900/20"
        >
          <div className="bg-slate-800 p-6 rounded-full mb-4">
            <FaUserPlus className="text-5xl text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No Employees Found
          </h3>
          <p className="text-gray-400 text-center max-w-md">
            It looks like you haven't added any employees to your team yet, or
            there are no approved assets assigned.
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {uniqueEmployees.map((employee) => (
              <EmployeeCard
                key={employee.employeeEmail}
                employee={employee}
                refetch={refetch}
                allAssets={employees}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

const EmployeeCard = ({ employee, refetch, allAssets }) => {
  const {
    employeeImage,
    employeeName,
    employeeEmail,
    assignmentDate,
    _id,
    companyName,
  } = employee;
  const axiosSecure = useAxiosSquer();

  const formattedDate = assignmentDate
    ? new Date(assignmentDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No Date";

  const assetCount = allAssets.filter(
    (a) => a.employeeEmail === employeeEmail
  ).length;

  const handleRemoveEmployee = (employeeEmail, companyName) => {
    // alert(companyName);
    Swal.fire({
      title: "Are you sure?",
      text: "Remove this employee record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Remove",
      background: "#1e1b4b",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(
            `/approvedAssets?email=${employeeEmail}&companyName=${companyName}`
          )
          .then(() => {
            refetch();
            Swal.fire("Deleted!", "Record removed.", "success");
          });
      }
    });
  };

  return (
    <motion.div
      layout
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ y: -10 }}
      className="relative group"
    >
      <div className="h-px bg-linear-to-r "></div>

      <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-800 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>

      <div className="relative  backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden p-6 shadow-2xl">
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
            {assetCount} Assets
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative p-1 bg-linear-to-tr from-blue-500 to-purple-500 rounded-full mb-4">
            <img
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 shadow-xl"
              src={employeeImage || "https://i.ibb.co/Lw5NHb1/placeholder.jpg"}
              alt={employeeName}
            />
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
            {employeeName}
          </h3>
          <p className="text-sm text-gray-400 flex items-center mt-1">
            <FaEnvelope className="mr-2 text-xs" /> {employeeEmail}
          </p>

          <div className="w-full mt-6 grid grid-cols-1 gap-3">
            <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                Last Assignment
              </p>
              <p className="text-sm text-gray-300 font-medium">
                {formattedDate}
              </p>
            </div>

            <button
              onClick={() => handleRemoveEmployee(employeeEmail, companyName)}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl transition-all duration-300 font-semibold text-sm"
            >
              <FaTrashAlt className="text-xs" /> Remove Member
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MyEmploys;
