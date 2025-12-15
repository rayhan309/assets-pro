import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";
import { Trash2, Package, Edit } from "lucide-react";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();

  // hr data
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const resp = await axiosSquer.get(`/assets?email=${user?.email}`);
      return resp.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto mt-10 glass-card shadow-xl rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Package className="text-primary" />
        <h2 className="text-2xl font-bold">My Assets</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Asset</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Available</th>
              <th>Requests</th>
              <th>Added</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset, index) => (
              <tr key={asset._id} className="glass rounded-xl">
                <td>{index + 1}</td>

                {/* Asset Info */}
                <td className="flex items-center gap-3">
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{asset.productName}</p>
                    <p className="text-xs opacity-60">{asset.hrCompanyName}</p>
                  </div>
                </td>

                {/* Type */}
                <td>
                  <span
                    className={`badge ${
                      asset.productType === "Returnable"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {asset.productType}
                  </span>
                </td>

                {/* Quantity */}
                <td>{asset.productQuantity}</td>

                {/* Available */}
                <td>
                  <span className="font-semibold">
                    {asset.availableQuantity}
                  </span>
                </td>

                {/* Requests */}
                <td>
                  <span className="badge badge-outline">
                    {asset.requestCount}
                  </span>
                </td>

                {/* Date */}
                <td className="text-sm">
                  {new Date(asset.postAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="flex gap-2">
                  <button className="btn btn-xs btn-outline btn-primary">
                    <Edit size={14} />
                  </button>
                  <button className="btn btn-xs btn-outline btn-error">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}

            {assets.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-10 opacity-60">
                  No assets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyAssets;
