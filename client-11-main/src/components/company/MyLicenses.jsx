import React, { useState, useEffect } from 'react';
import { FiTag, FiUsers, FiLayers, FiActivity } from 'react-icons/fi';

const MyLicenses = () => {
  const [licenses, setLicenses] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('companyLicenses')) || {};
    setLicenses(saved);
  }, []);

  const licenseList = Object.values(licenses);

  return (
    <div className="space-y-6 animate-fade-in text-dark">
      <div>
        <h1 className="text-2xl font-black tracking-tight">My Licenses</h1>
        <p className="text-slate-500 font-medium mt-1">Inventory of purchased course seats for your company.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {licenseList.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[32px] border border-slate-100 border-dashed">
             <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🏷️</div>
             <p className="text-slate-400 font-bold">You haven't purchased any licenses yet. Go to Explore Courses to get started.</p>
          </div>
        ) : (
          licenseList.map((license) => (
            <div key={license.title} className="bg-white rounded-[32px] border border-slate-100 p-6 flex flex-col shadow-sm hover:shadow-md transition-all group">
              <div className="flex gap-4 mb-6">
                 <img src={license.image} className="w-16 h-16 object-cover rounded-2xl shadow-inner border border-slate-50" />
                 <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-dark text-sm line-clamp-2 leading-tight mb-1">{license.title}</h3>
                    <div className="text-[10px] font-black uppercase text-primary tracking-tighter bg-primary/5 px-2 py-0.5 rounded-md inline-block">
                       Purchased for ${license.price}/seat
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                 <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total Seats</p>
                    <p className="text-xl font-black text-dark">{license.count}</p>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Remaining</p>
                    <p className="text-xl font-black text-primary">{license.count - (license.used || 0)}</p>
                 </div>
              </div>

              <div className="mt-6 space-y-2">
                 <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-500">Seat Utilization</span>
                    <span className="text-dark">{Math.round(((license.used || 0) / license.count) * 100)}%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-700" 
                      style={{ width: `${((license.used || 0) / license.count) * 100}%` }}
                    />
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
         <div className="flex items-center gap-6 relative z-10 text-center md:text-left">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm text-primary group-hover:scale-110 transition-transform">
               <FiActivity />
            </div>
            <div>
               <h3 className="text-xl font-black text-dark tracking-tight">Need more seats?</h3>
               <p className="text-slate-500 font-medium">Add more licenses to your inventory anytime as your team grows.</p>
            </div>
         </div>
         <button className="bg-dark text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-black transition-all shadow-lg shadow-dark/20 relative z-10 w-full md:w-auto">
            Contact Enterprise Support
         </button>
         <div className="absolute top-0 right-0 p-8 text-[120px] text-primary/5 select-none leading-none -mr-10 -mt-10">
            <FiTag />
         </div>
      </div>
    </div>
  );
};

export default MyLicenses;
