import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSquer from "../../../../Hooks/useAxiosSquer";
import Loading from "../../../../Components/Loading/Loading";
import { CreditCard, Calendar, UserPlus } from "lucide-react";

const PaymentHistories = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();

  const { data: myPayment = [], isLoading } = useQuery({
    queryKey: ["myPayment", user?.email],
    queryFn: async () => {
      const res = await axiosSquer.get(`/payment?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <div className="">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Billing History</h2>
          <p className="text-slate-300">View and manage your recent plan subscriptions.</p>
        </div>

        {/* Glass Card Container */}
        <div className="relative overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <span className="text-white font-medium">Recent Transactions</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white uppercase tracking-wider">
              {myPayment.length} Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-4 text-slate-200 font-semibold uppercase text-xs">Plan Details</th>
                  <th className="p-4 text-slate-200 font-semibold uppercase text-xs text-center">Limit</th>
                  <th className="p-4 text-slate-200 font-semibold uppercase text-xs">Transaction ID</th>
                  <th className="p-4 text-slate-200 font-semibold uppercase text-xs text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {myPayment.map((pay) => (
                  <tr key={pay._id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg">
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <p className="text-white font-bold">{pay.pricingName}</p>
                          <p className="text-slate-400 text-sm">Monthly Subscription</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-1 text-slate-300 bg-white/5 px-3 py-1 rounded-md">
                        <UserPlus size={14} />
                        <span>{pay.employeeLimit}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <code className="text-xs text-cyan-300 font-mono bg-cyan-900/30 px-2 py-1 rounded border border-cyan-500/20">
                        {pay.transactionId.substring(0, 15)}...
                      </code>
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {myPayment.length === 0 && (
             <div className="p-20 text-center text-slate-400">
                No payment records found.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistories;