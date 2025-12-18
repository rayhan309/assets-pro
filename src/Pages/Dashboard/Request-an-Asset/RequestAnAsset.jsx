import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import { Package } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import useUserRole from "../../../Hooks/useUserRole";

const RequestAnAsset = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();
  const {userInfo} = useUserRole();

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets", user?.email],
    queryFn: async () => {
      const resp = await axiosSquer.get("/assets");
      return resp.data;
    },
  });

  if (isLoading) return <Loading />;

  const availableAssets = assets.filter((asset) => asset.availableQuantity > 0);

  const handleSubmitRequest = () => {
    const requestData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      assetImage: selectedAsset.productImage,
      requesterEmail: user?.email,
      requesterName: user?.displayName,
      requesterPhoto: user?.photoURL,
      requesterDateOfBirth: userInfo.dateOfBirth,
      hrEmail: selectedAsset.hrEmail,
      role: userInfo.role,
      companyName: selectedAsset.hrCompanyName,
      note,
      approvalDate: null,
      requestStatus: "pending",
      requestDate: new Date().toISOString(),
    };

    axiosSquer
      .post("/requests", requestData)
      .then((res) => {
        if(res.data.message === 'alrady requested'){
          return      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your request filed, Because you requested it before.",
          // footer: '<a href="#">Why do I have this issue?</a>',
        });
        }
        if (res.data.updateResult.modifiedCount && res.data.result.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your request has been submitted successfully. Please wait for approval.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your request filed, Please try again.",
          // footer: '<a href="#">Why do I have this issue?</a>',
        });
      });

    // console.log("REQUEST CREATED:", requestData);

    // reset
    setSelectedAsset(null);
    setNote("");
  };

  return (
    <div className="px-10 pb-10 pt-4">
      <div className="flex justify-center items-center gap-2 mt-6">
        <Package className="text-primary text-5xl" />
        <h2 className="text-3xl text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary/80 font-semibold">
          Request an Asset
        </h2>
      </div>
      <p className="mb-6 text-center text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary/80">
        All Companeis Assets Chouse Assets & Find
      </p>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableAssets.map((asset) => (
          <div
            key={asset._id}
            className="rounded-xl bg-secondary/10 shadow-sm p-4 flex flex-col"
          >
            <img
              src={asset.productImage}
              alt={asset.productName}
              className="max-h-52 w-full object-cover rounded-lg mb-4"
            />

            <span className="text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary/80">
              {asset.productName}
            </span>
            <p className="text-sm my-2">Type: {asset.productType}</p>
            <p className="text-sm mb-2">Available: {asset.availableQuantity}</p>
            <p className="text-sm mb-2">Company: {asset.hrCompanyName}</p>

            <button
              onClick={() => setSelectedAsset(asset)}
              className="my-btn"
            >
              Request
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 glass-card flex items-center justify-center z-50">
          <div className="rounded-xl w-full max-w-md p-6 bg-white/40">
            <h3 className="text-xl font-semibold mb-2 text-primary">
              Request: {selectedAsset.productName}
            </h3>

            <textarea
              placeholder="Add a note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded-lg p-3 h-28 mb-4 focus:outline-none focus:ring"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedAsset(null)}
                className="btn btn-outline btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleSubmitRequest} className="btn btn-primary">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default RequestAnAsset;
