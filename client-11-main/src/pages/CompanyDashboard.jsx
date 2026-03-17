import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySidebar from '../components/company/CompanySidebar';
import CompanyHeader from '../components/company/CompanyHeader';
import ManageStudents from '../components/company/ManageStudents';
import StudentAnalytics from '../components/company/StudentAnalytics';
import ExploreCourses from '../components/company/ExploreCourses';
import MyLicenses from '../components/company/MyLicenses';


const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'Manage Students':
        return <ManageStudents />;
      case 'Analytics':
        return <StudentAnalytics />;
      case 'Explore Courses':
        return <ExploreCourses />;
      case 'My Licenses':
        return <MyLicenses />;
      case 'Overview':

      default:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-dark tracking-tight">Company Dashboard</h1>
                <p className="text-slate-500 font-medium">Welcome back! Here's what's happening with your students.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Students" value="24" icon="👨‍🎓" trend="+4 this month" />
              <StatCard label="Active Courses" value="12" icon="📚" trend="Steady" />
              <StatCard label="Average Progress" value="68%" icon="📈" trend="+5.2%" />
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
               <h3 className="text-xl font-bold text-dark mb-6">Recent Student Activity</h3>
               <div className="space-y-4">
                  <ActivityItem name="John Doe" action="Started" course="Advanced React Patterns" time="2 hours ago" />
                  <ActivityItem name="Jane Smith" action="Completed" course="Business Strategy" time="5 hours ago" />
                  <ActivityItem name="Mike Johnson" action="Achieved" course="UI/UX Masterclass" time="Yesterday" />
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <CompanySidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        handleLogout={handleLogout} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <CompanyHeader 
          setIsSidebarOpen={setIsSidebarOpen} 
          handleLogout={handleLogout} 
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-black text-dark tracking-tight">{value}</p>
      </div>
    </div>
    <div className="text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full inline-block">
       {trend}
    </div>
  </div>
);

const ActivityItem = ({ name, action, course, time }) => (
  <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
          {name.charAt(0)}
       </div>
       <div>
          <p className="text-sm font-bold text-dark">
             {name} <span className="text-slate-400 font-medium">{action}</span> <span className="text-primary">{course}</span>
          </p>
          <p className="text-xs font-medium text-slate-400">{time}</p>
       </div>
    </div>
    <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
);

export default CompanyDashboard;
