import React from 'react';
import { FiMenu, FiBell, FiSearch, FiMessageSquare } from 'react-icons/fi';

const CompanyHeader = ({ setIsSidebarOpen, handleLogout }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors lg:hidden"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl w-72 transition-all focus-within:ring-2 focus-within:ring-primary/20">
          <FiSearch className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search students or analytics..." 
            className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all group">
          <FiBell className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all group">
          <FiMessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        
        <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden sm:block"></div>
        
        <button 
          onClick={handleLogout}
          className="hidden sm:flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-slate-50 rounded-2xl transition-all group"
        >
          <span className="text-sm font-bold text-slate-600 group-hover:text-dark">Logout</span>
          <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Company" alt="Company" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default CompanyHeader;
