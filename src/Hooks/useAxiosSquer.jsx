import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSquer = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSquer = () => {
  const { user } = useAuth();

  useEffect(() => {
    const res = axiosSquer.interceptors.request.use((config) => {

      if(user?.accessToken) {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
      }

      return config;
    }, (err) => {
      return Promise.reject(err);
    });

    return () => axiosSquer.interceptors.request.eject(res);

  }, [user?.accessToken]);

  return axiosSquer;
};

export default useAxiosSquer;
