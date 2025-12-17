import React from 'react';

// 1. StatsCard Component (Ei choto card gulo stats dekhay)
export const StatsCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className="text-3xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl">
        {icon}
      </div>
    </div>
  </div>
);

const Index_true = () => {
  return (
    <div className="space-y-8">
      
      {/* 2. Header Section (Agey design kora header) */}
      <div className="glass-card rounded-3xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold">You've Updated to <span className='text-primary'>Premium Pro</span></h1>
        <p className="mt-2 text-lg">Your subscription is active. Enjoy all premium features.</p>
        <button className="mt-6 btn btn-primary font-semibold rounded-lg transition-colors">
          View Benefits
        </button>
      </div>

      {/* 3. Stats Grid (Etai holo StatsCard er bebohar) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Current Plan" value="Premium Pro" icon="💎" />
        <StatsCard title="Next Billing" value="Dec 24, 2025" icon="📅" />
        <StatsCard title="Total Spent" value="$145.00" icon="💰" />
      </div>

      {/* 4. Recent Activity Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Billing History</h2>
          <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-700">Dec 01, 2025</td>
                <td className="px-6 py-4 font-medium text-gray-900">Premium Subscription</td>
                <td className="px-6 py-4 text-gray-700">$29.00</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 font-medium hover:text-blue-800">Invoice</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Index_true;
