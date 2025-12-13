import { Outlet } from "react-router";
import Navber from "../Components/Navber/Navber";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navber />
      <div className="min-h-[calc(100vh-285px)] w-11/12 mx-auto pt-12">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
