import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Loading from "../Components/Loading/Loading";
import LogIn from "../Pages/LogIn/LogIn";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../Pages/Dashboard/Profile/Profile";
import Forbidden from "../Pages/Forbidden/Forbidden";
import PrivitePage from "../Context/PrivitePage";
import Subscription from "../Pages/Dashboard/Subscription/Subscription";
import AddAssets from "../Pages/Dashboard/AddAssets/AddAssets";
import HRPrivitePage from "../Context/HRPrivitePage";
import JoinHR from "../Pages/Home/JoinHR/JoinHR";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <Loading />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "join-hr",
        Component: JoinHR,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
      {
        path: "login",
        Component: LogIn,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivitePage>
        <DashboardLayout />
      </PrivitePage>
    ),
    children: [
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "pricing",
        element: (
          <HRPrivitePage>
            <Subscription />
          </HRPrivitePage>
        ),
      },
      {
        path: "add-assets",
        element: (
          <HRPrivitePage>
            <AddAssets />
          </HRPrivitePage>
        ),
      },
    ],
  },
]);
