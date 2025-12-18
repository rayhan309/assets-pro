import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import confetti from "canvas-confetti";
import Loading from "../../Components/Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router";

const fireConfetti = () => {
  confetti({
    particleCount: 100, // number of particles
    spread: 70, // spread of particles
    origin: { y: 0.6 }, // start point on screen
  });
};

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {

    signInUser(data.email, data.password)
      .then((res) => {
        if (res.user) {
          fireConfetti();
          reset();
          navigate(location?.state || '/');
          window.location.reload();
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };


  return (
    <div className="my-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8 rounded-2xl text-white"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-sm opacity-70">Access your AssetsPro account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <label>Email Address</label>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Enter your email"
            className="input-pro"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          {/* Password */}
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Enter your password"
            className="input-pro"
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm" />
              Remember me
            </label>
            <a href="#" className="text-[#f77e52] hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            className="btn bg-[#f77e52] border-none w-full rounded-xl mt-4"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-xs opacity-60">OR</div>

        {/* Register Redirect */}
        <p className="text-sm text-center opacity-70">
          Don’t have an account?{" "}
          <Link to={"/register"} className="text-[#f77e52] hover:underline">
            Register
          </Link>
        </p>

        {/* Footer */}
        <p className="text-xs text-center opacity-50 mt-6">
          © AssetsPro • Secure Asset Management
        </p>
      <ToastContainer />
      </motion.div>
    </div>
  )
};

export default Login;
