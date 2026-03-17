import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlayCircle, FiChevronRight, FiBookOpen } from 'react-icons/fi';

const MyCourses = ({ enrolledCourses }) => {
  const navigate = useNavigate();

  if (!enrolledCourses || enrolledCourses.length === 0) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-3xl font-black text-dark tracking-tight">My Enrolled Courses</h2>
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-slate-100 border-dashed text-center">
          <FiBookOpen className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-dark mb-2">No courses yet</h3>
          <p className="text-slate-500 font-medium mb-6">Browse our catalog and purchase a course to get started.</p>
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/30"
          >
            Browse Courses <FiChevronRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-black text-dark tracking-tight">My Enrolled Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {enrolledCourses.map((course) => {
          const courseId = course._id || course.id;
          const hasScorm = !!course.scormFileName;
          const progress = course.progress || 0;

          return (
            <div
              key={courseId}
              className="bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Thumbnail */}
              <div className="h-44 relative">
                <img
                  src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[12px] font-black text-primary">
                  {progress >= 100 ? '✅ COMPLETED' : 'IN PROGRESS'}
                </div>
                {hasScorm && (
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-black text-white flex items-center gap-1">
                    <FiPlayCircle className="w-3 h-3" /> SCORM
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h4 className="font-bold text-dark text-lg mb-4 line-clamp-2">{course.title}</h4>

                {/* Progress bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-[13px] font-bold text-slate-500 mb-2">
                    <span>{progress}% Completed</span>
                    <span className="text-xs text-slate-400">
                      {course.enrolledAt
                        ? `Enrolled ${new Date(course.enrolledAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                        : ''}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                {hasScorm ? (
                  <button
                    onClick={() => navigate(`/scorm-player/${courseId}`)}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20"
                  >
                    <FiPlayCircle className="w-5 h-5" />
                    {progress > 0 ? 'Continue Course' : 'Start Course'}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/courses/${courseId}`)}
                    className="w-full flex items-center justify-center gap-2 bg-[#F1F5F9] text-dark font-bold py-4 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    View Course <FiChevronRight />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;
