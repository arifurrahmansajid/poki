import React from 'react';
import { FiTrendingUp, FiCheckCircle, FiClock, FiActivity } from 'react-icons/fi';

const StudentAnalytics = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-dark tracking-tight">Student Analytics</h1>
        <p className="text-slate-500 font-medium mt-1">Detailed performance metrics for your company students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Completion Chart Mock */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-dark text-lg">Completion Rates</h3>
              <FiActivity className="text-primary w-6 h-6" />
           </div>
           <div className="space-y-6">
              <ProgressRow label="Python Bootcamp" percent={85} color="bg-primary" />
              <ProgressRow label="UI/UX Design" percent={42} color="bg-amber-500" />
              <ProgressRow label="Business Strategy" percent={68} color="bg-green-500" />
              <ProgressRow label="Frontend Mastery" percent={15} color="bg-red-500" />
           </div>
        </div>

        {/* Engagement Summary */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-dark text-lg">Monthly Engagement</h3>
              <FiTrendingUp className="text-green-500 w-6 h-6" />
           </div>
           <div className="flex items-end justify-between h-48 gap-4 px-2">
              <Bar height="40%" label="M" />
              <Bar height="65%" label="T" />
              <Bar height="90%" label="W" active={true} />
              <Bar height="55%" label="T" />
              <Bar height="75%" label="F" />
              <Bar height="30%" label="S" />
              <Bar height="20%" label="S" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <MetricBox 
            icon={<FiCheckCircle />} 
            label="Total Enrollments" 
            value="342" 
            sub="Across all courses"
            color="text-primary"
            bg="bg-primary/5"
         />
         <MetricBox 
            icon={<FiClock />} 
            label="Avg. Completion Time" 
            value="14 Days" 
            sub="Faster than average"
            color="text-green-600"
            bg="bg-green-50"
         />
         <MetricBox 
            icon={<FiTrendingUp />} 
            label="Overall Score" 
            value="4.8/5" 
            sub="Excellent performance"
            color="text-amber-600"
            bg="bg-amber-50"
         />
      </div>
    </div>
  );
};

const ProgressRow = ({ label, percent, color }) => (
  <div className="space-y-2">
     <div className="flex items-center justify-between text-sm font-bold">
        <span className="text-slate-600">{label}</span>
        <span className="text-dark">{percent}%</span>
     </div>
     <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} 
          style={{ width: `${percent}%` }}
        />
     </div>
  </div>
);

const Bar = ({ height, label, active = false }) => (
  <div className="flex-1 flex flex-col items-center gap-3">
     <div 
       className={`w-full rounded-t-xl transition-all duration-700 ${active ? 'bg-primary' : 'bg-slate-100 hover:bg-slate-200 cursor-pointer'}`}
       style={{ height }}
     />
     <span className="text-xs font-bold text-slate-400">{label}</span>
  </div>
);

const MetricBox = ({ icon, label, value, sub, color, bg }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
     <div className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center text-xl mb-4`}>
        {icon}
     </div>
     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
     <p className="text-2xl font-black text-dark mt-1 tracking-tight">{value}</p>
     <p className="text-xs font-medium text-slate-400 mt-1">{sub}</p>
  </div>
);

export default StudentAnalytics;
