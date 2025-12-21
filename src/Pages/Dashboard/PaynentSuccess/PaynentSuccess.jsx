import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Download, Share2 } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";

const PaymentSuccess = () => {
  const axiosSquer = useAxiosSquer();
  const [searchParams] = useSearchParams();
  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    axiosSquer
      .patch(`payment-success?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
        setTransactionId(res.data.transactionId);
        setAmount(res.data.amount);
      })
      .catch((err) => {
        alert(err);
      });
  }, [axiosSquer, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full glass-card rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Animated Header */}
        <div className="bg-green-500/20 p-10 flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            <CheckCircle2 className="w-24 h-24 text-green-500" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="mb-6">
              Thank you for your purchase. Your transaction has been completed
              successfully.
            </p>
          </motion.div>

          {/* Transaction Info Box */}
          <div className="glass rounded-xl p-4 mb-8 border border-gray-100 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Amount Paid</span>
              <span className=" font-semibold">{amount}</span>
            </div>
            <div className="flex flex-wrap justify-between">
              <span className="text-sm">Transaction ID</span>
              <span className="font-mono text-xs">{transactionId}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full btn btn-success font-semibold transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-300">
              View Receipt
              <Download className="w-4 h-4" />
            </button>

            <Link to={'/dashboard/assets-list'} className="w-full  font-semibold btn btn-primary transition duration-200 flex items-center justify-center gap-2">
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Footer Social/Share */}
          <button className="mt-6 text-sm text-gray-200 hover:text-gray-400 transition flex items-center justify-center gap-2 mx-auto cursor-pointer">
            <Share2 className="w-3 h-3" />
            Share confirmation
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
