import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";
import { FaEnvelope, FaUserTie } from "react-icons/fa";
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
      const resp = await axiosSecure.get(`/approvedAssets?email=${user?.email}`);
      return resp.data;
    },
  });

  if (isLoading) return <Loading />;

  // Create unique employee list based on email
  const uniqueEmployees = Array.from(
    new Map(
      employees.map((emp) => [emp.employeeEmail, emp])
    ).values()
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen glass-card">
      <h2 className="text-3xl font-extrabold text-white mb-8 border-b-4 border-white pb-5">
        💼 Employee Directory (
         <span className="text-primary"> {uniqueEmployees.length}</span> )
      </h2>

      {/* Grid Container for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {uniqueEmployees.map((employee) => (
          <EmployeeCard 
            key={employee.employeeEmail} 
            employee={employee} 
            refetch={refetch} 
            allAssets={employees} 
          />
        ))}
      </div>
    </div>
  );
};

// --- my cards COMPONENT ---
const EmployeeCard = ({ employee, refetch, allAssets }) => {
  const { employeeImage, employeeName, employeeEmail, assignmentDate, _id } = employee;
  const axiosSecure = useAxiosSquer();

  // Format the date
  const formattedDate = assignmentDate
    ? new Date(assignmentDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  // employe assets length
  const assetCount = allAssets.filter(a => a.employeeEmail === employeeEmail).length;

  const handleRemoveEmployee = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the employee's approved asset record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/approvedAssets/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch(); 
              Swal.fire("Deleted!", "Employee record has been removed.", "success");
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Something went wrong during deletion", "error");
          });
      }
    });
  };

  return (
    <div className="glass rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300 ease-in-out border-t-4 border-primary">
      {/* Employee Image & Role Tag */}
      <div className="relative h-32 glass flex justify-center items-center">
        <div className="absolute top-4 right-2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          Assets: {assetCount}
        </div>
        <img
          className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg"
          src={
            employeeImage ||
            "https://i.ibb.co.com/Lw5NHb1/pexels-moein-moradi-209759-672636.jpg"
          }
          alt={employeeName}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
      </div>

      {/* Employee Details */}
      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-primary mb-1 flex items-center justify-center">
          <FaUserTie className="mr-2" />
          {employeeName}
        </h3>

        <p className="text-sm text-gray-300 mb-4 flex items-center justify-center break-all">
          <FaEnvelope className="mr-2" />
          {employeeEmail}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-400">
          <p className="text-xs font-medium text-gray-400">
            Last Assignment Date:
          </p>
          <p className="text-sm font-semibold text-gray-300">{formattedDate}</p>
        </div>

        <div className="mt-4">
          <button
            onClick={() => handleRemoveEmployee(_id)}
            className="btn btn-sm btn-outline btn-error"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyEmploys;