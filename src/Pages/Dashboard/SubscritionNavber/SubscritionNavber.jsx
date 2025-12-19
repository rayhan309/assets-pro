import React, { useState } from "react";
import { Link, NavLink } from "react-router";

const SubscritionNavber = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="glass-card border-b border-gray-100 sticky top-0 z-50 rounded-2xl">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 1. Logo Section */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-extrabold my-text tracking-tight">
              Sub<span className="">Sync</span>
            </span>
          </div>

          {/* 2. Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center gap-3">
              <li>
                <NavLink to={"/dashboard/subscriptionDashboard/about-us"}>
                  AbutUs
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/subscriptionDashboard/pricing"}>
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/subscriptionDashboard/payment-histories"}
                >
                  Payment Histories
                </NavLink>
              </li>
            </ul>
          </div>

          {/* 3. User Actions Section */}
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <button className="p-2 hover:text-gray-600 bg-primary rounded-full transition-all">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 pr-3 hover:bg-primary cursor-pointer rounded-full border border-transparent transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-blue-600 font-bold">
                  JD
                </div>
                <span className="hidden sm:block text-sm font-medium ">
                  John Doe
                </span>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-lg border border-gray-100 py-2 transition-all">
                  <Link
                    to={"/dashboard/profile"}
                    className="block px-4 py-2 text-sm  hover:bg-gray-50/10"
                  >
                    Profile Settings
                  </Link>
                  <button className="block w-full text-start px-4 py-2 text-sm hover:bg-gray-50/10">
                    Usage Report
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <ul className="md:hidden">
                    <li className="block px-4 py-2 text-sm  hover:bg-gray-50/10">
                      <NavLink to={"/dashboard/subscriptionDashboard/about-us"}>
                        AbutUs
                      </NavLink>
                    </li>
                    <li className="block px-4 py-2 text-sm  hover:bg-gray-50/10">
                      <NavLink to={"/dashboard/subscriptionDashboard/pricing"}>
                        Pricing
                      </NavLink>
                    </li>
                    <li className="block px-4 py-2 text-sm  hover:bg-gray-50/10">
                      <NavLink
                        to={
                          "/dashboard/subscriptionDashboard/payment-histories"
                        }
                      >
                        Payment Histories
                      </NavLink>
                    </li>
                  </ul>
                  <Link
                    to={"/dashboard/profile"}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50/10"
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SubscritionNavber;
