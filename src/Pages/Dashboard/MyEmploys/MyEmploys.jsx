import { useQuery } from "@tanstack/react-query";
// import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";

const MyEmploys = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();
  // const [usersColl, setUsersColl] = useState([]);

  const { data: emploeis = [], isLoading } = useQuery({
    queryKey: ["employeis", user?.email],
    queryFn: async () => {
      const resp = await axiosSquer.get(`/approvedAssets?email=${user?.email}`);
      return resp.data;
    },
  });

  // Array-er object gulo unique korar poddhoti
  const uniqueArray = Array.from(
    new Set(emploeis.map((a) => a.employeeEmail)) 
  ).map((employeeEmail) => {
    // Unique email-er jonnyo abar object toiri kora hocche
    return { employeeEmail: employeeEmail };
  });

//   useEffect(() => {
//     uniqueArray.map( async (userEmail) => {
//         try{
//        const res = await axiosSquer.get(`users?email=${userEmail.employeeEmail}`);
//         setUsersColl(res.data);
//         }catch {
//             alert('errooriir')
//         }
//     });
//   }, [axiosSquer, uniqueArray]);

  if (isLoading) return <Loading />;



//   console.log(uniqueArray);

  return <div>my mmployee {uniqueArray.length}</div>;
};

export default MyEmploys;
