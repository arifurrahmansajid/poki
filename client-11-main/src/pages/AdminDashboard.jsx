import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import admin components
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminOverview from '../components/admin/AdminOverview';
import ManageUsers from '../components/admin/ManageUsers';
import ManageCourses from '../components/admin/ManageCourses';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleLogout = () => {
    // Implement admin logout logic here
    console.log('Admin logging out...');
    navigate('/login');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'Manage Users':
        return <ManageUsers />;
      case 'Manage Courses':
        return <ManageCourses />;
      case 'Payments':
        return (
           <div className="flex flex-col items-center justify-center p-12 text-slate-400 bg-white rounded-3xl border border-slate-100 border-dashed animate-fade-in">
              <span className="text-4xl mb-4">💰</span>
              <h2 className="text-xl font-bold text-dark mb-2">Payments Section</h2>
              <p className="font-medium max-w-sm text-center">Manage revenue, process payouts, and view financial analytics here. Coming soon!</p>
           </div>
        );
      case 'Settings':
        return (
           <div className="flex flex-col items-center justify-center p-12 text-slate-400 bg-white rounded-3xl border border-slate-100 border-dashed animate-fade-in">
              <span className="text-4xl mb-4">⚙️</span>
              <h2 className="text-xl font-bold text-dark mb-2">Admin Settings</h2>
              <p className="font-medium max-w-sm text-center">Configure platform preferences, manage roles, and review security access here.</p>
           </div>
        );
      case 'Dashboard':
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        handleLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader 
          setIsSidebarOpen={setIsSidebarOpen} 
          handleLogout={handleLogout} 
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
