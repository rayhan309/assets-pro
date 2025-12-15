import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSquer from './useAxiosSquer';

const useUserRole = () => {
    const {user} = useAuth();
    const axiosSquer = useAxiosSquer();

    const {data: userInfo = {}, isLoading} = useQuery({
        queryKey: ["logged-user", user?.email],
        queryFn: async () => {
            const res = await axiosSquer.get(`/users?email=${user?.email}`);
            return res.data;
        }
    });

    return {userInfo, isLoading};
};

export default useUserRole;