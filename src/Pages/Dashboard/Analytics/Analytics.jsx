import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import useAxiosSquer from '../../../Hooks/useAxiosSquer';
import Loading from '../../../Components/Loading/Loading';

const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

const Analytics = () => {
  const axiosSecure = useAxiosSquer();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['allAssets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/assets/type');
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  // 1. Group Data for Pie Chart (Returnable vs Non-returnable)
  const pieData = assets.reduce((acc, curr) => {
    const type = curr.productType || "Unknown";
    const existing = acc.find(item => item.name === type);
    if (existing) {
      existing.value += curr.requestCount;
    } else {
      acc.push({ name: type, value: curr.requestCount });
    }
    return acc;
  }, []);

  // 2. Top 5 Requested Assets for Bar Chart
  // Note: Ensure your API returns 'assetName'. If not, change 'assetName' to your actual key.
  const barData = [...assets]
    .sort((a, b) => b.requestCount - a.requestCount)
    .slice(0, 5);

  return (
    <div className="p-4 md:p-8 min-h-screen  text-white">
      <div className="mb-10">
        <span className="text-3xl font-extrabold my-text">
          Asset Analytics Dashboard
        </span>
        <p className="text-gray-400 mt-2">Real-time distribution and request tracking</p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Pie Chart: Glass Effect */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl h-[450px] flex flex-col">
            <span className="text-xl font-semibold mb-6 bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Items Distribution</span>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80} 
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart: Glass Effect */}
        <div className="relative group">
          <div className="absolute -inset-0.5 my-bg rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl h-[450px] flex flex-col">
            <h3 className="text-xl font-semibold mb-6 my-text">Top 5 Requested Assets</h3>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="requestCount" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }}
                  />
                  <Bar 
                    dataKey="requestCount" 
                    fill="url(#barGradient)" 
                    radius={[6, 6, 0, 0]} 
                    barSize={50} 
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;