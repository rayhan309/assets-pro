import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from 'lucide-react';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full glass-card rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Visual Header */}
                <div className="bg-red-500/20 p-8 flex justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    >
                        <XCircle className="w-20 h-20 text-red-500" />
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">
                        Payment Cancelled
                    </h1>
                    <p className="mb-8">
                        The transaction was not completed. No funds have been deducted from your account. If you experienced a technical issue, please try again.
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button className="w-full btn btn-secondary font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Try Payment Again
                        </button>
                        
                        <button className="w-full btn btn-primary font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Return to Dashboard
                        </button>
                    </div>

                    {/* Support Link */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-sm flex items-center justify-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Need help? <a href="/support" className="text-primary hover:underline font-medium">Contact Support</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentCancel;