import React from 'react';
import { FiMenu, FiSearch, FiBell, FiLogOut } from 'react-icons/fi';

const AdminHeader = ({ setIsSidebarOpen, handleLogout }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-30 shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <button 
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FiMenu className="w-6 h-6 text-slate-600" />
        </button>
        <div className="max-w-md w-full relative hidden md:block">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search users or courses..." 
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all group">
          <FiBell className="w-6 h-6 group-hover:text-primary" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
        <div className="flex items-center gap-3 group">
           <button className="flex items-center gap-3 cursor-default">
              <div className="text-right hidden sm:block">
                 <p className="text-sm font-bold text-dark group-hover:text-primary transition-colors">Super Admin</p>
                 <p className="text-[12px] text-slate-500 font-medium text-left">Admin Account</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 p-0.5 border border-slate-200 shrink-0">
                 <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                    alt="Avatar" 
                    className="w-full h-full rounded-[10px] object-cover"
                 />
              </div>
           </button>
           <button 
              onClick={handleLogout}
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Logout"
           >
              <FiLogOut className="w-5 h-5" />
           </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
