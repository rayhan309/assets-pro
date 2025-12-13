import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Loading from "../Components/Loading/Loading";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        hydrateFallbackElement: <Loading />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    }
]);
