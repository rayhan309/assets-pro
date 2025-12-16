import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import useUserRole from "../../../Hooks/useUserRole";
import { useNavigate } from "react-router";

const AllRequests = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();
  const { userInfo } = useUserRole();
  const navigate = useNavigate();

  // employ data
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSquer.get(`/requests/role?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  //   handleRejected
  const handleRejected = (asset) => {
    if (asset) {
      const hrEmail = asset?.hrEmail;
      const status = { status: "rejected", hrEmail };

      Swal.fire({
        title: "Are you sure?",
        text: "You will be rejected from your employe",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Rejected",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSquer
            .patch(`/requests/${asset._id}/reject`, status)
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                  icon: "success",
                  title: "Employ has been rejected.",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              alert("status not a change");
            });
        }
      });
    }
  };

  // handleApprove
  const handleApprove = (obj) => {
    const object = {...obj};
    if (obj) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be approved from your employe",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Approve",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSquer
            .patch(`/requests/${obj._id}/approve`, object)
            .then((res) => {
              if (res.data) {
                refetch();
                Swal.fire({
                  icon: "success",
                  title: "Employ has been Approved.",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              alert("status not a change");
            });
        }
      });
    }
  };

  // console.log(requests);

  return (
    <div className="overflow-x-auto max-w-7xl mx-auto mt-10 glass-card shadow-xl rounded-2xl p-6">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Employee Info</th>
            <th>Asset Info</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row  */}
          {requests.map((request, i) => {
            return (
              <tr key={i} className="bg-white/10 glass rounded-2xl">
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            request?.assetImage ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{request.requesterName}</div>
                      <div className="text-sm opacity-50">
                        {request.requesterEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {request.assetName}
                  <br />
                  <span
                    className={`badge badge-sm ${
                      request.assetType === "Returnable"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {request.assetType}
                  </span>
                </td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td
                  className={`${
                    request.requestStatus === "pending"
                      ? "badge badge-sm badge-secondary mt-6 text-primary"
                      : request.requestStatus === "rejected"
                      ? "badge badge-sm badge-warning mt-6 text-red-700"
                      : "badge badge-sm bg-yellow-400 border-none text-primary mt-6"
                  }`}
                >
                  {request.requestStatus}.
                </td>
                <th>
                  {/* conditional onclick mama my first */}
                  <button
                    // onClick={() => handleApprove(request)}
                    onClick={() => {
                      if (
                        userInfo.packageEmployees <= userInfo.currentEmployees
                      ) {
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Please upgrade your package!",
                          showCancelButton: true,
                          confirmButtonText: "Go to Upgrade",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate("/dashboard/pricing");
                          }
                        });
                        return;
                      }
                      handleApprove(request);
                    }}
                    className="btn btn-outline btn-primary btn-xs mr-4"
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => handleRejected(request)}
                    className="btn btn-outline btn-warning btn-xs"
                  >
                    Rejected
                  </button>
                </th>
              </tr>
            );
          })}

          {requests.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-10 opacity-60">
                No request found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllRequests;
