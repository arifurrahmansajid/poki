import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiChevronRight, FiCalendar, FiPlayCircle } from 'react-icons/fi';

const Overview = ({ stats, enrolledCourses, upcomingTasks, setActiveTab, loadingCourses }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Message */}
      <div>
        <h1 className="text-3xl font-black text-dark tracking-tight mb-2">
          Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
        </h1>
        <p className="text-slate-500 font-medium">
          {enrolledCourses.length > 0
            ? `You have ${enrolledCourses.length} course(s) in your dashboard. Keep learning!`
            : 'Browse courses and start your learning journey today.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-dark mb-1">
                {loadingCourses ? (
                  <span className="inline-block w-8 h-6 bg-slate-100 rounded animate-pulse" />
                ) : (
                  stat.value
                )}
              </h3>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enrolled Courses Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-dark tracking-tight">Current Courses</h2>
            <button onClick={() => setActiveTab('My Courses')} className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              View All <FiChevronRight />
            </button>
          </div>

          {loadingCourses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((n) => (
                <div key={n} className="bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm h-64 animate-pulse">
                  <div className="h-40 bg-slate-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                    <div className="h-2 bg-slate-100 rounded-full w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 border-dashed p-8 text-center">
              <p className="text-slate-400 font-medium mb-4">No courses enrolled yet.</p>
              <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
              >
                Browse Courses <FiChevronRight />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.slice(0, 2).map((course) => {
                const courseId = course._id || course.id;
                const hasScorm = !!course.scormFileName;
                const progress = course.progress || 0;

                return (
                  <div key={courseId} className="bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="h-40 relative">
                      <img
                        src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[12px] font-black text-primary">
                        {progress >= 100 ? '✅ COMPLETED' : 'IN PROGRESS'}
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h4 className="font-bold text-dark text-lg mb-4 line-clamp-1">{course.title}</h4>
                      <div className="mb-6">
                        <div className="flex justify-between text-[13px] font-bold text-slate-500 mb-2">
                          <span>{progress}% Completed</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                      {hasScorm ? (
                        <button
                          onClick={() => navigate(`/scorm-player/${courseId}`)}
                          className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary-dark transition-all duration-300"
                        >
                          <FiPlayCircle /> {progress > 0 ? 'Continue' : 'Start Course'}
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/courses/${courseId}`)}
                          className="w-full flex items-center justify-center gap-2 bg-[#F1F5F9] text-dark font-bold py-3.5 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          View Course <FiChevronRight />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-8">
          {/* Upcoming Tasks */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-dark">Next Steps</h3>
              <FiCalendar className="text-slate-400" />
            </div>
            <div className="space-y-6">
              {upcomingTasks.slice(0, 2).map((task, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl shrink-0 flex flex-col items-center justify-center font-bold text-[11px] bg-slate-50 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <span>MAR</span>
                    <span className="text-lg leading-none">{14 + i}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-dark group-hover:text-primary transition-colors">{task.title}</h4>
                    <span className="text-[12px] font-medium text-slate-400">{task.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab('Schedule')} className="w-full mt-8 py-3.5 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:border-primary hover:text-primary transition-all">
              View Full Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
