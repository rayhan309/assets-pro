import React from 'react';
import useUserRole from '../../Hooks/useUserRole';
import Loading from '../../Components/Loading/Loading';
import { Navigate } from 'react-router';

const EmployPrivitePage = ({children}) => {
  const { userInfo, isLoading} = useUserRole();

  const { role } = userInfo;

  if(isLoading) {
    return <Loading />
  }

  if(role === 'EMPLOYEE') {
    return children
  }

  return <Navigate to={'/forbidden'}></Navigate>;
};

export default EmployPrivitePage;