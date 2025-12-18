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
import MyAssets from "../Pages/Dashboard/MyAssets/MyAssets";
import AssetsList from "../Pages/Dashboard/AssetsList/AssetsList";
import RequestAnAsset from "../Pages/Dashboard/Request-an-Asset/RequestAnAsset";
import AllRequests from "../Pages/Dashboard/AllRequests/AllRequests";
import MyAssetsEmploy from "../Pages/Dashboard/MyAssetsEmploy/MyAssetsEmploy";
import MyEmploys from "../Pages/Dashboard/MyEmploys/MyEmploys";
import MyTeam from "../Pages/Dashboard/MyTeam/MyTeam";
import PaynentSuccess from "../Pages/Dashboard/PaynentSuccess/PaynentSuccess";
import PaymentCancle from "../Pages/Dashboard/PaymentCancle/PaymentCancle";
import SubscriptionDashboard from "../Pages/Dashboard/SubscriptionDashboard/SubscriptionDashboard";
import Index_true from "../Pages/Dashboard/SubscriptionDashboard/Index_true/Index_true";
import PaymentHistories from "../Pages/Dashboard/SubscriptionDashboard/PaymentHistories/PaymentHistories";
import Analytics from "../Pages/Dashboard/Analytics/Analytics";

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
        path: "payment-success",
        element: (
          <HRPrivitePage>
            <PaynentSuccess />
          </HRPrivitePage>
        ),
      },
      {
        path: "analytics",
        element: (
          <HRPrivitePage>
            <Analytics />
          </HRPrivitePage>
        ),
      },
      {
        path: "payment-cancle",
        element: (
          <HRPrivitePage>
            <PaymentCancle />
          </HRPrivitePage>
        ),
      },
      {
        path: "subscriptionDashboard",
        element: (
          <HRPrivitePage>
            <SubscriptionDashboard />
          </HRPrivitePage>
        ),
        children: [
          {
            path: 'about-us',
            Component: Index_true,
          },
          {
            path: "pricing",
            element: <Subscription />,
          },
          {
            path: "payment-histories",
            element: <PaymentHistories />,
          },
        ],
      },
      {
        path: "add-assets",
        element: (
          <HRPrivitePage>
            <AddAssets />
          </HRPrivitePage>
        ),
      },
      {
        path: "my-assets",
        element: (
          <HRPrivitePage>
            <MyAssets />
          </HRPrivitePage>
        ),
      },
      {
        path: "my-assetsemploy",
        Component: MyAssetsEmploy,
      },
      {
        path: "my-team",
        Component: MyTeam,
      },
      {
        path: "request-an-asset",
        Component: RequestAnAsset,
      },
      {
        path: "assets-list",
        element: (
          <HRPrivitePage>
            <AssetsList />
          </HRPrivitePage>
        ),
      },
      {
        path: "all-requests",
        element: (
          <HRPrivitePage>
            <AllRequests />
          </HRPrivitePage>
        ),
      },
      {
        path: "my-employeis",
        element: (
          <HRPrivitePage>
            <MyEmploys />
          </HRPrivitePage>
        ),
      },
    ],
  },
]);
