import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiBarChart2, 
  FiSettings, 
  FiX, 
  FiLogOut,
  FiCheckCircle,
  FiTag
} from 'react-icons/fi';


const NavItem = ({ icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 group
      ${active 
        ? 'bg-primary text-white shadow-lg shadow-primary/25' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-dark'}
    `}
  >
    <span className={`text-xl transition-transform group-hover:scale-110 ${active ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}>
      {icon}
    </span>
    {label}
  </button>
);

const CompanySidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, handleLogout }) => {
  return (
    <>
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8 pb-10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#59B1C9] rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                L
              </div>
              <span className="text-2xl font-black text-dark tracking-tighter">Lumina</span>
            </Link>
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <FiX className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            <NavItem 
              icon={<FiHome />} 
              label="Overview" 
              active={activeTab === 'Overview'} 
              onClick={() => { setActiveTab('Overview'); setIsSidebarOpen(false); }} 
            />
            <NavItem 
              icon={<FiUsers />} 
              label="Manage Students" 
              active={activeTab === 'Manage Students'} 
              onClick={() => { setActiveTab('Manage Students'); setIsSidebarOpen(false); }} 
            />
            <NavItem 
              icon={<FiCheckCircle />} 
              label="Explore Courses" 
              active={activeTab === 'Explore Courses'} 
              onClick={() => { setActiveTab('Explore Courses'); setIsSidebarOpen(false); }} 
            />
            <NavItem 
              icon={<FiTag />} 
              label="My Licenses" 
              active={activeTab === 'My Licenses'} 
              onClick={() => { setActiveTab('My Licenses'); setIsSidebarOpen(false); }} 
            />
            <NavItem 
              icon={<FiBarChart2 />} 
              label="Analytics" 
              active={activeTab === 'Analytics'} 
              onClick={() => { setActiveTab('Analytics'); setIsSidebarOpen(false); }} 
            />

          </nav>

          <div className="p-4 px-6 border-t border-slate-100 flex flex-col gap-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Company" alt="Company" />
                </div>
                <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold text-dark truncate">Company Manager</p>
                   <p className="text-[11px] font-bold text-primary">Enterprise Account</p>
                </div>
             </div>
             <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-all border border-red-100/50"
             >
                <FiLogOut className="text-lg" /> Logout
             </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CompanySidebar;
