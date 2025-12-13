import axios from "axios";
import React from "react";

const axiosSquer = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSquer = () => {
  return axiosSquer;
};

export default useAxiosSquer;
