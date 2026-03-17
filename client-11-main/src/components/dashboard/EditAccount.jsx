import React from 'react';
import { FiCamera } from 'react-icons/fi';

const EditAccount = () => {
  return (
    <div className="w-full max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <h2 className="text-3xl font-black text-dark tracking-tight">Edit Account</h2>
      
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-8 space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[32px] bg-slate-100 border-2 border-primary/20 shrink-0 overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                  alt="Avatar" 
                  className="w-full h-full rounded-[28px] object-cover"
                />
              </div>
              <button className="absolute bottom-1 right-1 bg-white border border-slate-200 p-2.5 rounded-2xl shadow-lg text-primary hover:bg-primary hover:text-white transition-all">
                <FiCamera className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-dark mb-1">Alex Johnson</h3>
              <p className="text-slate-500 font-medium mb-4">Update your photo and personal details.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                 <button className="btn-primary py-2 px-6 text-sm w-full sm:w-auto">Upload Photo</button>
                 <button className="bg-slate-50 text-slate-600 py-2 px-6 rounded-full text-sm font-bold border border-slate-200 hover:bg-slate-100 transition-all w-full sm:w-auto">Remove</button>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-slate-100">
            <h4 className="text-lg font-bold text-dark">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">Full Name</label>
                 <input type="text" defaultValue="Alex Johnson" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">Email Address</label>
                 <input type="email" defaultValue="alex.j@example.com" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Bio</label>
              <textarea rows="4" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none" defaultValue="Aspiring web enthusiast and lifelong learner. Currently mastering Python and React."></textarea>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-slate-100">
            <h4 className="text-lg font-bold text-dark">Password Update</h4>
            <p className="text-sm text-slate-500 -mt-2">Update your password to keep your account secure.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">Current Password</label>
                 <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">New Password</label>
                 <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end pt-8 gap-4 border-t border-slate-100">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
            <button className="w-full sm:w-auto btn-primary">Save All Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
