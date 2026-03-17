import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiBookOpen,
  FiClock,
  FiAward,
  FiCheckCircle,
} from 'react-icons/fi';

// Auth context to get the current logged-in user
import { useAuth } from '../context/AuthContext';

// Import refactored components
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import Overview from '../components/dashboard/Overview';
import MyCourses from '../components/dashboard/MyCourses';
import Schedule from '../components/dashboard/Schedule';
import MyCertificates from '../components/dashboard/MyCertificates';
import EditAccount from '../components/dashboard/EditAccount';

const PAYMENTS_API = 'http://localhost:5000/api/payments';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  // Real enrolled courses from the backend
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // Fetch real enrolled courses whenever the dashboard loads
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user?.id) {
        setLoadingCourses(false);
        return;
      }
      try {
        setLoadingCourses(true);
        const res = await fetch(`${PAYMENTS_API}/enrolled/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setEnrolledCourses(data);
        }
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Derive stats from real enrolled data
  const stats = [
    {
      title: 'Courses Enrolled',
      value: String(enrolledCourses.length),
      icon: <FiBookOpen className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Completed Courses',
      value: String(enrolledCourses.filter((c) => (c.progress || 0) >= 100).length),
      icon: <FiCheckCircle className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'Learning Hours',
      value: String(enrolledCourses.length * 4), // estimated
      icon: <FiClock className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
    {
      title: 'Certificates',
      value: String(enrolledCourses.filter((c) => (c.progress || 0) >= 100).length),
      icon: <FiAward className="w-6 h-6" />,
      color: 'bg-amber-500',
    },
  ];

  const upcomingTasks = [
    { title: 'Python Basics Quiz', date: 'Tomorrow, 10:00 AM', type: 'Quiz', priority: 'High' },
    { title: 'Project Submission', date: 'Mar 15, 2025', type: 'Project', priority: 'Medium' },
    { title: 'Live Q&A Session', date: 'Mar 18, 2025', type: 'Event', priority: 'Normal' },
  ];

  const certificates = enrolledCourses
    .filter((c) => (c.progress || 0) >= 100)
    .map((course) => ({
      id: course._id || course.id,
      title: course.title,
      date: course.enrolledAt
        ? new Date(course.enrolledAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'N/A',
      issuer: 'Lumina Academy',
      img: course.image || 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=500&auto=format&fit=crop',
    }));

  const renderContent = () => {
    switch (activeTab) {
      case 'Edit Account':
        return <EditAccount />;
      case 'My Certificates':
        return <MyCertificates certificates={certificates} />;
      case 'My Courses':
        return loadingCourses ? (
          <div className="flex items-center justify-center p-16">
            <span className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <MyCourses enrolledCourses={enrolledCourses} />
        );
      case 'Schedule':
        return <Schedule upcomingTasks={upcomingTasks} />;
      default:
        return (
          <Overview
            stats={stats}
            enrolledCourses={enrolledCourses}
            upcomingTasks={upcomingTasks}
            setActiveTab={setActiveTab}
            loadingCourses={loadingCourses}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          setActiveTab={setActiveTab}
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

export default StudentDashboard;