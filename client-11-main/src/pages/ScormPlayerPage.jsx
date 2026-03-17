import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMaximize2, FiMinimize2, FiLoader } from 'react-icons/fi';

const SCORM_API = 'http://localhost:5000/api/scorm';
const COURSES_API = 'http://localhost:5000/api/courses';

const ScormPlayerPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [entryPoint, setEntryPoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);

        // Fetch course info
        const courseRes = await fetch(`${COURSES_API}/${courseId}`);
        if (!courseRes.ok) throw new Error('Course not found.');
        const courseData = await courseRes.json();
        setCourse(courseData);

        // Fetch SCORM entry point
        const scormRes = await fetch(`${SCORM_API}/entry/${courseId}`);
        if (!scormRes.ok) {
          throw new Error('SCORM package not found. Please contact the administrator.');
        }
        const scormData = await scormRes.json();
        // Build full URL to the SCORM entry point served by the backend
        setEntryPoint(`http://localhost:5000${scormData.entryPoint}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-4 text-white">
        <FiLoader className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg font-bold text-slate-300">Loading SCORM package…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-6 text-white p-8">
        <div className="text-6xl">📦</div>
        <h2 className="text-2xl font-black">SCORM Package Not Found</h2>
        <p className="text-slate-400 font-medium text-center max-w-md">{error}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-[#0F172A] ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'}`}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#1E293B] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <h1 className="text-white font-black text-sm sm:text-base leading-tight line-clamp-1">
              {course?.title}
            </h1>
            {course?.instructor && (
              <p className="text-slate-400 text-xs font-medium">{course.instructor}</p>
            )}
          </div>
        </div>

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        >
          {isFullscreen ? <FiMinimize2 className="w-5 h-5" /> : <FiMaximize2 className="w-5 h-5" />}
        </button>
      </div>

      {/* SCORM iframe */}
      <div className="flex-1 relative">
        <iframe
          id="scorm-frame"
          src={entryPoint}
          title={course?.title || 'SCORM Course'}
          className="w-full h-full border-0"
          style={{ minHeight: isFullscreen ? 'calc(100vh - 72px)' : 'calc(100vh - 72px)' }}
          allowFullScreen
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default ScormPlayerPage;
