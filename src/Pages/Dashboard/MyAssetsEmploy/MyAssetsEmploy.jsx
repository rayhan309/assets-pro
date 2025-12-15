import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";
import { FileText, Package, Trash2 } from "lucide-react";

const MyrequestsEmploy = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();

  // employ data
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["myRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSquer.get(`/requests?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

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
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {request.assetType}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="text-sm">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </td>

                  <td className="text-sm">{request.requestStatus}</td>

                  {/* Actions */}
                  <td className="flex items-center gap-2">
                    <button className="btn btn-xs btn-outline btn-primary">
                      <FileText size={14} />
                    </button>
                    <button className="btn btn-xs btn-outline btn-error">
                      <Trash2 size={14} />
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
    </>
  );
};

export default MyrequestsEmploy;
