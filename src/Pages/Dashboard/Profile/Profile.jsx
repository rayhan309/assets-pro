import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Briefcase,
  LogOut,
  Edit,
  Users,
  Bell,
  Gem,
  Building2,
} from "lucide-react";
import useUserRole from "../../../Hooks/useUserRole";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const Profile = () => {
  const { userInfo } = useUserRole();
  const { signOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!userInfo) return null;

  const {
    name,
    role,
    email,
    dateOfBirth,
    photo,
    companyStatus,
    message,
    accountAt,
  } = userInfo;

  //   handleLogoutUser
  const handleLogoutUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your account logOut!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logOut conirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              title: "LogOuted!",
              text: "Your account has ben logouted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-center mt-20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-4xl glass-card shadow-xl rounded-2xl"
      >
        <div className="card-body">
            <h1 className="text-2xl mb-6 font-bold flex items-center justify-center gap-3"><User /> Your  Info</h1>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={photo}
                alt={name}
                className="w-32 h-32 rounded-full object-cover ring ring-primary ring-offset-base-100 ring-offset-2"
              />
              <div className="w-6 h-6 bg-green-400 rounded-full absolute bottom-0 right-3.5"></div>
            </div>

            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <User className="w-6 h-6 text-primary" /> {name}
              </h2>
              <p className="text-sm opacity-70">Role: {role}</p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {email}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> DOB: {dateOfBirth}
              </p>
              <p className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> {companyStatus || "COMPANY"}
              </p>
            </div>
          </div>

          <div className="divider" />

          {/* hr info  */}
          {role === "HR_MANAGER" && (
            <div className="relative">
                <h1 className="text-2xl mb-6 font-bold flex items-center justify-center gap-3"><Building2 /> Your Company Info</h1>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <img
                    className="w-32 h-32 rounded-full object-cover ring ring-primary ring-offset-base-100 ring-offset-2"
                    src={
                      userInfo?.companyLogo ||
                      "https://i.ibb.co.com/Rp8gtTKj/Chat-GPT-Image-Dec-3-2025-11-47-12-AM.png"
                    }
                    alt=""
                  />
                  <div className="w-6 h-6 bg-green-400 rounded-full absolute bottom-0 right-3.5"></div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Briefcase /> {userInfo?.companyName}
                  </h2>

                  <h2 className="flex items-center gap-2">
                    <Users width={17} /> Employees Limit :{" "}
                    {userInfo?.packageEmployees}
                  </h2>

                  <h2 className="flex items-center gap-2">
                    <Users width={17} /> Employees Add :{" "}
                    {userInfo?.currentEmployees}
                  </h2>

                  <h2 className="flex items-center gap-2">
                    <Bell width={17} /> Subscription : {userInfo?.subscription}
                  </h2>

                  <h2 className="flex items-center gap-2">
                    <Gem width={17} /> Status : {userInfo?.status}
                  </h2>

                </div>

              </div>
              <button className="btn btn-secondary absolute bottom-0 right-2">Subscription</button>
            </div>
          )}

          <div className="divider" />

          <p className="text-sm opacity-80">{message}</p>
          <p className="text-xs opacity-60">
            Account Created: {new Date(accountAt).toLocaleString()}
          </p>

          <div className="card-actions justify-end mt-4 gap-2">
            <button
              className="btn btn-primary btn-sm gap-2"
              onClick={() => setIsOpen(true)}
            >
              <Edit className="w-4 h-4" /> Update Profile
            </button>

            <button
              onClick={handleLogoutUser}
              className="btn btn-outline btn-error btn-sm gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Update Profile Modal */}
      {isOpen && (
        <dialog className="modal modal-open">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="modal-box rounded-2xl"
          >
            <h3 className="font-bold text-lg mb-4">Update Profile</h3>

            <div className="space-y-3">
              <input
                type="text"
                defaultValue={name}
                className="input input-bordered w-full"
                placeholder="Name"
              />
              <input
                type="email"
                defaultValue={email}
                className="input input-bordered w-full"
                placeholder="Email"
              />
              <input
                type="date"
                defaultValue={dateOfBirth}
                className="input input-bordered w-full"
              />
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </motion.div>
        </dialog>
      )}
    </div>
  );
};

export default Profile;
