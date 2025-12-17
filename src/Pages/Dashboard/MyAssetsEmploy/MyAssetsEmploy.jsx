import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";
import { FileText, LogOut, Package, Search, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useState } from "react";

const MyrequestsEmploy = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();
  const [searchText, setSearchTExt] = useState("");
  const [type, setType] = useState("");

  // employ data
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["myRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSquer.get(`/requests?email=${user?.email}&type=${type}&search=${searchText}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  console.log(searchText, type);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mt-10 glass-card shadow-xl rounded-2xl p-6"
      >
        {/* Header */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <Package className="text-primary" />
          <h2 className="text-2xl font-bold">All Requested Asset!</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Asset</th>
                <th>Type</th>
                <th>Request Date</th>
                <th>Request Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id} className="glass rounded-xl">
                  <td>{index + 1}</td>

                  {/* request Info */}
                  <td className="flex items-center gap-3">
                    <img
                      className="w-14 h-14 rounded-2xl"
                      src={
                        request?.assetImage ||
                        "https://i.ibb.co.com/7tZ3tFXs/pexels-c-125803429-11829002.jpg"
                      }
                      alt=""
                    />
                    <div>
                      <p className="font-semibold">{request.assetName}</p>
                      <p className="text-xs opacity-60">
                        {request.companyName}
                      </p>
                    </div>
                  </td>

                  {/* Type */}
                  <td>
                    <span
                      className={`badge ${
                        request.assetType === "Returnable"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {request.assetType}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="text-sm">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </td>

                  <td
                    className={`${
                      request.requestStatus === "pending"
                        ? "text-secondary"
                        : request.requestStatus === "rejected"
                        ? " text-red-400"
                        : "text-success"
                    }`}
                  >
                    {request.requestStatus}
                  </td>

                  {/* Actions */}
                  <td className="flex items-center gap-2">
                    <button className="btn btn-xs btn-outline btn-primary">
                      <FileText size={14} />
                    </button>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-10 opacity-60">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 mt-20 flex justify-between items-center max-w-7xl mx-auto"
      >
        <div className="text-2xl font-normal">
          Approved Assets (
          {requests.filter((a) => a.requestStatus === "approved").length})
        </div>

        <div>
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
            className="input-pro text-primary"
          >
            <option value="" className="text-primary">
              Select type
            </option>
            <option value="Non-returnable" className="text-primary">
              Non-returnable
            </option>
            <option value="Returnable" className="text-primary">
              Returnable
            </option>
          </select>
        </div>

        {/* <!-- From Uiverse.io by antonypjohnson -->  */}
        <div className="relative" id="input">
          <input
            onChange={(e) => {
              setSearchTExt(e.target.value)
            }}
            placeholder="Search..."
            className="input-pro"
            id="floating_outlined"
            type="text"
          />
          <label
            className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] glass-card data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            for="floating_outlined"
          >
            Search...
          </label>
          <div className="absolute top-2 right-3 text-primary">
           <Search />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto my-10 glass-card shadow-xl rounded-2xl p-6"
      >
        {/* Header */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <Package className="text-primary" />
          <h2 className="text-2xl font-bold">All My Approved Asset!</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Asset</th>
                <th>Type</th>
                <th>Requested Date</th>
                <th>Approved Date</th>
                <th>Request Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests
                .filter((a) => a.requestStatus === "approved")
                .map((request, index) => (
                  <tr key={request._id} className="glass rounded-xl">
                    <td>{index + 1}</td>

                    {/* request Info */}
                    <td className="flex items-center gap-3">
                      <img
                        className="w-14 h-14 rounded-2xl"
                        src={
                          request?.assetImage ||
                          "https://i.ibb.co.com/7tZ3tFXs/pexels-c-125803429-11829002.jpg"
                        }
                        alt=""
                      />
                      <div>
                        <p className="font-semibold">{request.assetName}</p>
                        <p className="text-xs opacity-60">
                          {request.companyName}
                        </p>
                      </div>
                    </td>

                    {/* Type */}
                    <td>
                      <span
                        className={`badge ${
                          request.assetType === "Returnable"
                            ? "badge-warning"
                            : "badge-success"
                        }`}
                      >
                        {request.assetType}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="text-sm">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </td>

                    {/* Date */}
                    <td className="text-sm">
                      {new Date(request.approvalDate).toLocaleDateString()}
                    </td>

                    <td
                      className={`${
                        request.requestStatus === "pending"
                          ? "text-secondary"
                          : request.requestStatus === "rejected"
                          ? "text-primary"
                          : "text-success"
                      }`}
                    >
                      {request.requestStatus}
                    </td>

                    {/* Actions */}
                    <td className="flex items-center gap-2">
                      <button className="btn btn-xs btn-outline btn-primary">
                        <FileText size={14} />
                      </button>

                      {request.assetType === "Returnable" && (
                        <button
                          title="Return"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, return it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                Swal.fire({
                                  title: "Deleted!",
                                  text: "Your asset has been returned.",
                                  icon: "success",
                                });
                              }
                            });
                          }}
                          className="btn btn-xs btn-outline btn-error"
                        >
                          <LogOut size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-10 opacity-60">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
};

export default MyrequestsEmploy;
