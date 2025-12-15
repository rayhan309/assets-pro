import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/assets-logo.png";
import { AuthContext } from "../../Context/AuthContext";
import { ChevronDown, ChevronUp, House } from "lucide-react";
import Swal from "sweetalert2";

const Navber = () => {
  const { user, signOutUser } = use(AuthContext);
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <li className="">
        <NavLink to={"/"}>
          <House width={17} /> Home
        </NavLink>
      </li>
      <li className="">
        <NavLink to={"/dashboard"}>
          <House width={17} /> Dashboard
        </NavLink>
      </li>
    </>
  );
  // handleSignOutUser
  const handleSignOutUser = () => {
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
            setOpen(false);
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

  return (
    <div className="glass-card fixed top-0 left-0 z-50 w-full shadow-sm">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content text-white bg-white/30 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link className="flex items-center gap-1">
            <img className="w-12 h-12 rounded-full" src={logo} alt="" />
            <h4 className="text-2xl">AssetsPro</h4>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">{links}</ul>
        </div>
        <div className="navbar-end">
          <div
            className={`absolute w-40 -top-48 -right-5 z-20 glass-card p-2 rounded-xl transition-all duration-1000 ease-out ${
              open ? "top-18 -right-5 " : ""
            }`}
          >
            <Link
              to={"/dashboard/profile"}
              className="btn btn-ghost w-full hover:bg-white/10 border-none"
            >
              Profile
            </Link>
            <button
              onClick={handleSignOutUser}
              className="btn btn-ghost w-full hover:bg-white/10 border-none"
            >
              LogOut
            </button>
          </div>

          {user ? (
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer flex justify-end items-end relative"
            >
              <img
                title={user?.displayName}
                className="w-12 h-12 rounded-full border-2"
                src={user?.photoURL}
                alt={user?.displayName}
              />
              <div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-6"></div>

              {open ? <ChevronUp /> : <ChevronDown />}
            </div>
          ) : (
            <Link to={"/login"} className="btn bg-slate-900 rounded-2xl">
              LogIn
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
