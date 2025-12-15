import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";
import { Trash2, Package, Edit } from "lucide-react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const AssetsList = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const resp = await axiosSquer.get("/assets");
      return resp.data;
    },
  });

  //   handledelete
  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSquer
          .delete(`/assets/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Asset has been deleted.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => {
            toast.error("error", err);
          });
      }
    });
  };

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
        <h2 className="text-2xl font-bold">All Companyeis Assets List</h2>
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
                        ? "badge-primary"
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
                  <span className="badge badge-outline badge-primary">
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
                  <button
                    onClick={() => handledelete(asset._id)}
                    className="btn btn-xs btn-outline btn-error"
                  >
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
      <ToastContainer />
    </motion.div>
  );
};

export default AssetsList;
