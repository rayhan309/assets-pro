import React from "react";
import useUserRole from "../Hooks/useUserRole";
import Loading from "../Components/Loading/Loading";
import { Navigate } from "react-router";

const HRPrivitePage = ({children}) => {
  const { userInfo, isLoading} = useUserRole();

  const { role } = userInfo;

  if(isLoading) {
    return <Loading />
  }

  if(role === 'HR_MANAGER') {
    return children
  }

  return <Navigate to={'/forbidden'}></Navigate>;
};

export default HRPrivitePage;
