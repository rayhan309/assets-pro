import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSquer from "../../Hooks/useAxiosSquer";

const Register = () => {
  const [role, setRole] = useState("hr");
  const axiosSquer = useAxiosSquer();
  const [photoURL, setPhotoURL] = useState("");
  const [companyURL, setCompany] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const imagebbAPIK = import.meta.env.VITE_imagebb_sdk;
    const formData2 = new FormData();
    formData2.append("image", data?.companyLogo[0]);
    const formData = new FormData();
    formData.append("image", data.hrPhoto[0]);

    if (role === "hr") {
      try {
        const res = await axiosSquer.post(
          `https://api.imgbb.com/1/upload?key=${imagebbAPIK}`,
          formData2
        );
        if (res.data.data.url) {
          setCompany(res.data.data.url);
        }
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }

    try {
      const res = await axiosSquer.post(
        `https://api.imgbb.com/1/upload?key=${imagebbAPIK}`,
        formData
      );
      if (res.data.data.url) {
        setPhotoURL(res.data.data.url);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }

    let payload = {};

    if (role === "hr") {
      payload = {
        role: "HR_MANAGER",
        companyName: data.companyName,
        companyLogo: companyURL,
        hrName: data.hrName,
        dateOfBirth: data.dateOfBirth,
        photo: photoURL,
        email: data.email,
        password: data.password,
        packageEmployees: 5,
        packagePrice: 0,
        status: "ACTIVE",
      };
    } else {
      payload = {
        role: "EMPLOYEE",
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        photo: photoURL,
        email: data.email,
        password: data.password,
        companyStatus: "NO_COMPANY",
        message: "No company affiliation",
      };
    }

    console.log("REGISTER PAYLOAD:", payload);
    reset();
  };

  return (
    <div className="min-h-screen my-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl glass-card p-8 text-white rounded-2xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Registration</h2>
          <p className="text-sm opacity-70">
            Choose how you want to join AssetsPro
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setRole("hr")}
            className={`role-card ${role === "hr" ? "active" : ""}`}
          >
            <h4 className="font-semibold">HR Manager</h4>
            <p className="text-xs opacity-70">
              Register company & manage assets
            </p>
          </button>

          <button
            type="button"
            onClick={() => setRole("employee")}
            className={`role-card ${role === "employee" ? "active" : ""}`}
          >
            <h4 className="font-semibold">Employee</h4>
            <p className="text-xs opacity-70">Personal account only</p>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AnimatePresence mode="wait">
            {role === "hr" && (
              <motion.div
                key="hr"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {/* Company Name */}
                <label>Company Name</label>
                <input
                  {...register("companyName", {
                    required: "Company name is required",
                  })}
                  placeholder="Company Name"
                  className="input-pro"
                />
                {errors.companyName && (
                  <p className="error-text">{errors.companyName.message}</p>
                )}

                {/* Company Logo */}
                <label>Company Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("companyLogo")}
                  className="file-input file-input-bordered w-full"
                />

                {/* HR Name */}
                <label>Full Name</label>
                <input
                  {...register("hrName", {
                    required: "HR name is required",
                  })}
                  placeholder="HR Manager Name"
                  className="input-pro"
                />
                {errors.hrName && (
                  <p className="error-text">{errors.hrName.message}</p>
                )}

                {/* Company Logo */}
                <label>Your Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("hrPhoto")}
                  className="file-input file-input-bordered w-full"
                />

                {/* Package Info */}
                <div className="rounded-xl bg-primary/10 border border-primary/20 p-4">
                  <p className="font-semibold">Default Package</p>
                  <p className="text-sm opacity-70">
                    5 Employees • $0 • Instant Asset Management
                  </p>
                </div>
              </motion.div>
            )}

            {role === "employee" && (
              <motion.div
                key="employee"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <label>Full Name</label>
                <input
                  {...register("name", {
                    required: "Full name is required",
                  })}
                  placeholder="Full Name"
                  className="input-pro"
                />
                {errors.name && (
                  <p className="error-text">{errors.name.message}</p>
                )}

                {/* Company Logo */}
                <label>Your Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("hrPhoto")}
                  className="file-input file-input-bordered w-full"
                />

                <div className="alert alert-info text-sm">
                  No company affiliation. You can join a company later.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Common Fields */}
          <label>Email Address</label>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email Address"
            className="input-pro"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <label>Strogn Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            placeholder="Password"
            className="input-pro"
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}

          <label>Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth", {
              required: "Date of Birth  is required",
            })}
            className="input-pro"
          />
          {errors.dateOfBirth && (
            <p className="error-text">Date of Birth is required</p>
          )}

          <button
            disabled={isSubmitting}
            className="btn btn-primary w-full rounded-xl mt-4"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center opacity-50 mt-6">
          © AssetsPro • Secure Asset Management
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
