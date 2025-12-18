import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";
import { Trash2, Package, Edit, X, Save } from "lucide-react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const AssetsList = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();
  const [searchText, setSearchText] = useState("");
  const [currentEdite, setCurrentEdite] = useState({});
  const modaleRef = useRef();

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch Data
  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assets", user?.email, searchText],
    queryFn: async () => {
      const resp = await axiosSquer.get(
        `/assets?email=${user?.email}&search=${searchText}`
      );
      return resp.data;
    },
  });

  // Sync Form with selected Asset
  useEffect(() => {
    if (currentEdite) {
      reset({
        productName: currentEdite.productName,
        productType: currentEdite.productType,
        productQuantity: currentEdite.productQuantity,
      });
    }
  }, [currentEdite, reset]);

  // Handle Delete
  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSquer
          .delete(`/assets/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "Asset has been removed.", "success");
            }
          })
          .catch(() => toast.error("Error deleting asset"));
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target.search.value);
  };

  const handleEdite = (obj) => {
    setCurrentEdite(obj);
    modaleRef.current.showModal();
  };

  // Handle Update (React Hook Form Submit)
  const onSubmitUpdate = async (data) => {
    try {
      const resp = await axiosSquer.patch(`/assets/${currentEdite._id}`, data);
      if (resp.data) {
        refetch();
        modaleRef.current.close();
        Swal.fire({
          icon: "success",
          title: "Asset Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        toast.info("No changes made");
        modaleRef.current.close();
      }
    } catch {
      toast.error("Failed to update asset");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="flex justify-center items-center gap-2 my-10">
        <Package size={32} className="text-primary" />
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Assets Management
        </h1>
      </div>

      {/* Search Bar & Stats */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 my-10 mx-3 md:mx-14 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-medium text-white/80">
            Total Assets: <span className="text-primary font-bold">{assets.length}</span>
          </h3>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <input
            name="search"
            className="w-72 h-12 px-5 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary transition-all placeholder:text-white/40"
            type="search"
            placeholder="Search by name..."
          />
        </form>
      </div>

      {/* Main Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card shadow-2xl rounded-3xl mx-3 md:mx-14 overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <div className="overflow-x-auto p-4">
          <table className="table w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-white/60 border-none">
                <th className="bg-transparent">#</th>
                <th className="bg-transparent">Asset Details</th>
                <th className="bg-transparent">Category</th>
                <th className="bg-transparent text-center">Stock</th>
                <th className="bg-transparent">Date Added</th>
                <th className="bg-transparent text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset, index) => (
                <tr key={asset._id} className="group hover:bg-white/5 transition-colors">
                  <td className="text-white/50">{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="p-1 bg-white/10 rounded-xl">
                        <img
                          src={asset.productImage}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-white">{asset.productName}</p>
                        <p className="text-xs text-white/40">{asset.hrCompanyName}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      asset.productType === "Returnable" 
                      ? "bg-yellow-500/20 text-yellow-500" 
                      : "bg-cyan-500/20 text-cyan-500"
                    }`}>
                      {asset.productType}
                    </span>
                  </td>
                  <td className="text-center font-mono text-primary">{asset.productQuantity}</td>
                  <td className="text-white/60 text-sm">
                    {new Date(asset.postAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdite(asset)}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handledelete(asset._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {assets.length === 0 && (
            <div className="text-center py-20 text-white/40">No assets found matching your search.</div>
          )}
        </div>
      </motion.div>

      {/* --- Glass Effect Edit Modal --- */}
      <dialog ref={modaleRef} className="modal backdrop-blur-md">
        <div className="modal-box max-w-md bg-[#161b22]/90 border border-white/10 shadow-2xl p-0 overflow-hidden">
          
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Edit size={20} className="text-primary" /> Edit Information
            </h3>
            <form method="dialog">
              <button className="text-white/50 hover:text-white"><X size={24} /></button>
            </form>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit(onSubmitUpdate)} className="p-8 space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Asset Name</label>
              <input
                {...register("productName", { required: "Name is required" })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              {errors.productName && <p className="text-red-400 text-xs mt-1">{errors.productName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">Category</label>
                <select
                  {...register("productType")}
                  className="w-full bg-[#1c2128] border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">Quantity</label>
                <input
                  type="number"
                  {...register("productQuantity", { required: true, min: 0 })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
               <button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                <Save size={18} /> Update Asset
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

export default AssetsList;