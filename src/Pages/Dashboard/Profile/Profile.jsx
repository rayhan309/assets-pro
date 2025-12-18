import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Calendar,
  Briefcase,
  LogOut,
  Edit,
  Users,
  Bell,
  Gem,
  Building2,
  Camera,
  UploadCloud,
} from "lucide-react";
import Swal from "sweetalert2";
import useUserRole from "../../../Hooks/useUserRole";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";

const Profile = () => {
  const { userInfo } = useUserRole();
  const { signOutUser, updateUser, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register } = useForm();
  const axiosSecure = useAxiosSquer();

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

  const handleLogoutUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser();
      }
    });
  };

  // handle update profile
  const onSubmit = async (data) => {
    // console.log(data);

    const formData = new FormData();
    formData.append("image", data.photo[0]);
    const imagebbAPIK = import.meta.env.VITE_imagebb_sdk;

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imagebbAPIK}`,
        formData
      );
      // console.log(res.data.data.url);
      if(res.data.data.url) {
        updateUser(data.name , res.data.data.url).then(() => {
            const updateUserDoc = {
            name: data.name,
            photo: res.data.data.url,
            dateOfBirth: data.dateOfBirth,
          }

          axiosSecure.patch(`/users/root?email=${user?.email}`, updateUserDoc).then(res => {
            // console.log(res.data);
            window.location.reload();
          }).catch(() => {
            toast.error('Your profile update is filed');
          })
          // toast.success('Updated yor profile');
          
        }).catch(() => {
          toast.error('Upadted filed.')
        })
        
      }
    } catch (err) {
      toast.error(err);
    }
  };


  return (
    <div className="max-w-6xl mx-auto my-6 px-4">
      {/* Cover Photo */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src="https://i.ibb.co.com/JFtVzr2d/pexels-jegor-nagel-113940522-30084316.jpg"
          className="w-full max-h-72 object-cover"
          alt="cover"
        />
        <button className="my-btn border-none absolute right-4 bottom-8 gap-2">
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="glass-card rounded-2xl shadow-xl p-6 relative -mt-6">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="relative">
            <img
              src={photo}
              alt={name}
              className="w-40 h-40 rounded-full ring ring-primary ring-offset-4 object-cover"
            />
            <span className="w-5 h-5 bg-green-500 rounded-full absolute bottom-3 right-4" />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="opacity-70">{role}</p>
            <p className="text-sm mt-1">
              {companyStatus || "Professional User"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="my-btn gap-2"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
            <button
              onClick={handleLogoutUser}
              className="btn btn-outline rounded-lg btn-error gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card glass-card shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title">Intro</h2>
            <p className="text-sm opacity-80">
              {userInfo.role === "HR_MANAGER" ? (
                <div>
                  <p>My employeis count : {userInfo?.currentEmployees}</p>
                </div>
              ) : (
                <p>{message}</p>
              )}
            </p>
            <div className="divider" />
            <p className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" /> {email}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" /> {dateOfBirth}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4" />{" "}
              {companyStatus || userInfo?.companyName}
            </p>
            <p className="text-xs opacity-60 mt-2">
              Joined: {new Date(accountAt).toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        {/* Timeline Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 card glass-card shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title">Posts & Activity</h2>
              <div>
                <p>
                  sorry im a jonior developer. jokhon sniyer hobo rieltime post
                  system dibo akhono parbo kintu somoi nai man
                </p>
              </div>
       
          </div>
        </motion.div>
      </div>

      {/* Company Info for HR */}
      {role === "HR_MANAGER" && (
        <div className="card glass-card shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Building2 /> Company Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Employees Limit:{" "}
                {userInfo?.packageEmployees}
              </p>
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Employees Added:{" "}
                {userInfo?.currentEmployees}
              </p>
              <p className="flex items-center gap-2">
                <Bell className="w-4 h-4" /> Subscription:{" "}
                {userInfo?.subscription}
              </p>
              <p className="flex items-center gap-2">
                <Gem className="w-4 h-4" /> Status: {userInfo?.status}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isOpen && (
        <dialog className="modal modal-open glass-card">
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="modal-box glass-card space-y-3"
          >
            <h3 className="font-bold text-xl mb-4">Update Profile</h3>

            {/* name */}
            <label>Your Name</label>
            <input
              {...register("name")}
              className="input-pro w-full mb-2"
              defaultValue={name}
            />

            {/* photo */}
            <div className="space-y-2">
              <label className="font-medium">Your Photo</label>

              <label
                className="flex flex-col items-center justify-center w-full h-28 md:h-36 border-2 border-dashed rounded-xl cursor-pointer 
                      hover:border-primary transition bg-base-200/40"
              >
                <UploadCloud className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm font-medium">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs opacity-60">PNG, JPG up to 2MB</p>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("photo")}
                />
              </label>
            </div>

            {/* Date of Birth */}
            <label>Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="input-pro w-full"
              defaultValue={dateOfBirth}
            />

            {/* actions */}
            <div className="modal-action">
              <button className="btn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </motion.form>
        </dialog>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
