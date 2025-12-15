import { UploadCloud } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import useAuth from "../../../Hooks/useAuth";

const JoinHR = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSquer = useAxiosSquer();
  const { user } = useAuth();

  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append("image", data.companyLogo[0]);

    const imagebbAPIK = import.meta.env.VITE_imagebb_sdk;


    try {
      const res = await axiosSquer.post(
        `https://api.imgbb.com/1/upload?key=${imagebbAPIK}`,
        formData
      );
      console.log(res.data);
    } catch (err) {
      alert(err);
    }

    // try {
    //   const payload = {
    //     companyName: data.companyName,
    //     companyEmail: data.companyEmail,
    //     message: data.message,
    //     packageEmployees: 5,
    //     currentEmployees: 0,
    //     subscription: "basic",
    //     status: "ACTIVE",
    //   };

    //   const res = await axiosSquer.patch(`/users?email=${user?.email}`, payload);

    //   if (res.ok) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Request Sent",
    //       text: "Your HR join request has been submitted successfully",
    //     });
    //     reset();
    //   } else {
    //     throw new Error("Submission failed");
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: error.message,
    //   });
    // }
    
  };

  return (
    <div className="max-w-xl mx-auto mt-16 mb-10 glass-card shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Join as HR</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Company Name */}
        <label>Company Name</label>
        <input
          type="text"
          placeholder="Company Name"
          className="input-pro w-full"
          {...register("companyName", { required: "Company name is required" })}
        />
        {errors.companyName && (
          <p className="text-error text-sm">{errors.companyName.message}</p>
        )}

        {/* Company Email */}
        <label>Company Email</label>
        <input
          type="email"
          placeholder="Company Email"
          className="input-pro w-full"
          {...register("companyEmail", {
            required: "Company email is required",
          })}
        />
        {errors.companyEmail && (
          <p className="text-error text-sm">{errors.companyEmail.message}</p>
        )}

        {/* Company logo */}

        <div className="space-y-2">
          <label className="font-medium">Company Logo</label>

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
              {...register("companyLogo", {
                required: "Company logo is required",
              })}
            />
          </label>

          {errors.companyLogo && (
            <p className="text-error text-sm">{errors.companyLogo.message}</p>
          )}
        </div>

        {/* Message */}
        <label>Message</label>
        <textarea
          placeholder="Why do you want to join as HR?"
          className="textarea input-pro w-full"
          rows={3}
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && (
          <p className="text-error text-sm">{errors.message.message}</p>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default JoinHR;
