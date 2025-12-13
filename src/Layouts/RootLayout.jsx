import React from "react";
import { Outlet } from "react-router";
import Navber from "../Components/Navber/Navber";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navber />
      <div className="min-h-[calc(100vh-285px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
