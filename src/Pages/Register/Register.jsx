import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSquer from "../../Hooks/useAxiosSquer";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import confetti from "canvas-confetti";
import Loading from "../../Components/Loading/Loading";
import { useLocation, useNavigate } from "react-router";
import { UploadCloud } from "lucide-react";

const Register = () => {
  const [role, setRole] = useState("hr");
  const axiosSquer = useAxiosSquer();
  const { createUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fireConfetti = () => {
    confetti({
      particleCount: 100, // number of particles
      spread: 70, // spread of particles
      origin: { y: 0.6 }, // start point on screen
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const imagebbAPIK = import.meta.env.VITE_imagebb_sdk;

    // user photo
    const formData = new FormData();
    formData.append("image", data.photo[0]);
    let logoImg = "";

    // company logo
    if (role === "hr") {
      // company photo
      const formData = new FormData();
      formData.append("image", data?.companyLogo[0]);
      try {
        const response = await axiosSquer.post(
          `https://api.imgbb.com/1/upload?key=${imagebbAPIK}`,
          formData
        );
        console.log(response);
        if (response.data.data.url) {
          logoImg = response.data.data.url;
        } else {
          toast.error("url not found");
        }
      } catch (err) {
        console.log(err);
        toast.error(err, "photo");
      }
    }

    // create user
    // user image
    try {
      const resp = await axiosSquer.post(
        `https://api.imgbb.com/1/upload?key=${imagebbAPIK}`,
        formData
      );
      if (resp.data.data.url) {
        createUser(data.email, data.password)
          .then((res) => {
            if (res.user) {
              updateUser(data.name, resp.data.data.url)
                .then(async () => {
                  let payload = {};

                  if (role === "hr") {
                    // console.log(companyLogo, 'companyLogo');
                    payload = {
                      role: "HR_MANAGER",
                      companyName: data.companyName,
                      companyLogo: logoImg,
                      name: data.name,
                      dateOfBirth: data.dateOfBirth,
                      photo: resp.data.data.url,
                      email: data.email,
                      password: data.password,
                      packageEmployees: 5,
                      currentEmployees: 0,
                      subscription: "basic",
                      status: "ACTIVE",
                    };
                  } else {
                    payload = {
                      role: "EMPLOYEE",
                      name: data.name,
                      dateOfBirth: data.dateOfBirth,
                      photo: resp.data.data.url,
                      email: data.email,
                      password: data.password,
                      companyStatus: "NO_COMPANY",
                      message: "No company affiliation",
                    };
                  }

                  // user save database
                  try {
                    const res = await axiosSquer.post(`/users`, payload);
                    console.log(res);
                  } catch (err) {
                    toast.error(err);
                  }

                  fireConfetti();
                  navigate(location?.state || "/");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      toast.error(err);
    }

    reset();
  };

  // loadin component
  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return loading ? (
    <Loading />
  ) : (
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


                {/* Company photo */}
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
                    <p className="text-error text-sm">
                      {errors.companyLogo.message}
                    </p>
                  )}
                </div>

                {/* HR Name */}
                <label>Full Name</label>
                <input
                  {...register("name", {
                    required: "HR name is required",
                  })}
                  placeholder="HR Manager Name"
                  className="input-pro"
                />
                {errors.name && (
                  <p className="error-text">{errors.name.message}</p>
                )}

                {/* your photo */}
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
                      {...register("photo", {
                        required: "Your photo is required",
                      })}
                    />
                  </label>

                  {errors.photo && (
                    <p className="text-error text-sm">
                      {errors.photo.message}
                    </p>
                  )}
                </div>

                {/* Package Info */}
                <div className="rounded-xl bg-[#f77e5240] border border-primary/20 p-4">
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

                {/* Your Logo */}
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
                      {...register("photo", {
                        required: "Your photo is required",
                      })}
                    />
                  </label>

                  {errors.photo && (
                    <p className="text-error text-sm">
                      {errors.photo.message}
                    </p>
                  )}
                </div>

                <div className="alert alert-info bg-[#f77e5280] border-none text-white text-sm">
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
            className="btn bg-[#f77e52] border-none w-full rounded-xl mt-4"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center opacity-50 mt-6">
          © AssetsPro • Secure Asset Management
        </p>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Register;
