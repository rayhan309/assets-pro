import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSquer from "../../../../Hooks/useAxiosSquer";
import Loading from "../../../../Components/Loading/Loading";

const PaymentHistories = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();

  const {data: myPayment = [], isLoading} = useQuery({
    queryKey: ["myPayment", user?.email],
    queryFn: async () => {
      const res = await axiosSquer.get(`/payment?email=${user?.email}`);
      return res.data;
    },
  });

  if(isLoading) {
    return <Loading />
  }

  return (
    <div className="glass-card min-h-20 w-full rounded-2xl">
      <p>payment histories ({myPayment.length})</p>
    </div>
  );
};

export default PaymentHistories;
