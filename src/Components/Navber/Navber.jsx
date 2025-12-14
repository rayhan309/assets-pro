import React, { use } from "react";
import { Link, NavLink } from "react-router";
import logo from '../../assets/assets-logo.png';
import { AuthContext } from "../../Context/AuthContext";
import { House } from "lucide-react";

const Navber = () => {
  const authInfo = use(AuthContext);
  // console.log(authInfo);

  const links = <>
  <li className="">
    <NavLink to={'/'}><House width={17} /> Home</NavLink>
  </li>
  </>

  return (
    <div className="bg-white/20 fixed top-0 left-0 z-50 w-full shadow-sm">
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
          <img className="w-12 h-12 rounded-2xl" src={logo} alt="" />
          <h4 className="text-3xl">AssetsPro</h4>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <Link to={'/login'} className="btn bg-slate-900 rounded-2xl">LogIn</Link>
      </div>
    </div>
    </div>
  );
};

export default Navber;
