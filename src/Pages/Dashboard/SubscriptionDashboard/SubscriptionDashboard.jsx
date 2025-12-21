import React from 'react';
import SubscritionNavber from '../SubscritionNavber/SubscritionNavber';
import { Outlet } from 'react-router';

const SubscriptionDashboard = () => {
    // Apni ekhane dynamic bhabe plan er nam boshate paren
    const currentPlan = "Premium Pro"; 

    return (
        <div className="min-h-screen p-2 md:p-16">
            <div className='mx-auto rounded-2xl'>
            {/* Header Section */}
            <div className="my-bg rounded-2xl shadow-sm p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <span className="text-sm font-semibold my-text tracking-wide uppercase">
                            Subscription Overview
                        </span>
                        <h1 className="text-3xl font-bold mt-1">
                            You've Updated To <span className="my-text">{currentPlan}</span>
                        </h1>
                        <p className="text-gray-300 mt-2">
                            Enjoy all your premium features and exclusive tools.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button className=" text-white rounded-xl font-medium btn btn-primary transition-all shadow-md">
                            Manage Plan
                        </button>
                    </div>
                </div>

                {/* Choto ekta feature bar (Optional) */}
                <div className="mt-6 pt-6 border-t border-gray-50 flex gap-6">
                    <div className="flex items-center text-sm text-gray-200">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Active Account
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Next Billing: Oct 24, 2026
                    </div>
                </div>
            </div>

            {/* navber */}
            <SubscritionNavber />

            {/* Baki Dashboard Content Ekhane Hobe */}

            <div className="min-h-50 my-bg my-8 py-10 px-3 rounded-2xl">
                <Outlet />
            </div>

            </div>
        </div>
    );
};

export default SubscriptionDashboard;