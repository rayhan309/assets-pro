import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/assets-logo.png";
import Loading from "../Components/Loading/Loading";
import useUserRole from "../Hooks/useUserRole";
import { Outlet } from "react-router";
import {
  Bell,
  ChartNoAxesCombined,
  CircleUser,
  HelpCircle,
  List,
  Plus,
  SaveAll,
  TextAlignJustify,
  Users,
  UsersRoundIcon,
} from "lucide-react";

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUserRole();

  const { role } = userInfo;

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return loading ? (
    <Loading />
  ) : (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full glass-card sticky top-0 z-40 flex justify-between">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="">
            {/* Sidebar toggle icon */}
            <div className="flex items-center ml-1 cursor-pointer">
              <img src={logo} className="rounded-full w-12 h-12" alt="" />
              <h2 className="px-2 text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary/80 font-bold">Assets<span>Pro</span></h2>
            </div>
          </label>

          <Link to={"/dashboard/profile"} className="mr-6">
            <img
              title={userInfo.name}
              className="w-12 h-12 rounded-full border-2"
              src={userInfo.photo}
              alt=""
            />
          </Link>
        </nav>
        {/* Page content here */}
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50 is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start glass-card is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {role === "HR_MANAGER" && (
              <>
                {/* List item */}
                <li>
                  <NavLink
                    to={"/dashboard/assets-list"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assets List"
                  >
                    {/* add icon */}
                    <List width={17} />
                    <span className="is-drawer-close:hidden">Assets List</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li>
                  <NavLink
                    to={"/dashboard/all-requests"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Request"
                  >
                    {/* add icon */}
                    <HelpCircle width={17} />
                    <span className="is-drawer-close:hidden">All Request</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li>
                  <NavLink
                    to={"/dashboard/my-employeis"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Employeis"
                  >
                    {/* add icon */}
                    <Users width={17} />
                    <span className="is-drawer-close:hidden">My Employeis</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li>
                  <NavLink
                    to={"/dashboard/add-assets"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Assets"
                  >
                    {/* add icon */}
                    <Plus width={17} />
                    <span className="is-drawer-close:hidden">Add Assets</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li>
                  <NavLink
                    to={"/dashboard/subscriptionDashboard/about-us"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Subscription"
                  >
                    {/* add icon */}
                    <Bell width={17} />
                    <span className="is-drawer-close:hidden">Subscription</span>
                  </NavLink>
                </li>


                {/* List item */}
                <li>
                  <NavLink
                    to={"/dashboard/analytics"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Analytics"
                  >
                    {/* add icon */}
                    <ChartNoAxesCombined width={17} />
                    <span className="is-drawer-close:hidden">Analytics</span>
                  </NavLink>
                </li>

                {/* List item */}
                {/* <li>
                  <NavLink
                    to={"/dashboard/my-assets"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Assets"
                  >
                    Settings icon
                    <TextAlignJustify width={17} />
                    <span className="is-drawer-close:hidden">My Assets</span>
                  </NavLink>
                </li> */}
              </>
            )}

            {role === "HR_MANAGER" || (
              <>
                {/* List item */}
                <li>
                  <NavLink
                    to={"/dashboard/my-assetsemploy"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Assets"
                  >
                    {/* Settings icon */}
                    <TextAlignJustify width={17} />
                    <span className="is-drawer-close:hidden">My Assets</span>
                  </NavLink>
                </li>

                {/* List item */}
                <li>
                  <NavLink
                    to={"/dashboard/my-team"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Team"
                  >
                    {/* Settings icon */}
                    <UsersRoundIcon width={17} />
                    <span className="is-drawer-close:hidden">My Team</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/request-an-asset"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Request an Asset"
                  >
                    <HelpCircle width={17} />
                    <span className="is-drawer-close:hidden">
                      Request an Asset
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink
                to={"/dashboard/profile"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                {/* Settings icon */}
                <CircleUser width={17} />
                <span className="is-drawer-close:hidden">Profile</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
