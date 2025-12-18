import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";


const axiosSquer = axios.create({
  baseURL: "https://assest-pro.vercel.app",
});

const useAxiosSquer = () => {
  const { user } = useAuth();

  useEffect(() => {
    const req = axiosSquer.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user?.accessToken}`;
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const res = axiosSquer.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    return (
      () => axiosSquer.interceptors.request.eject(req),
      axiosSquer.interceptors.response.eject(res)
    );
  }, [user?.accessToken]);

  return axiosSquer;
};

export default useAxiosSquer;
