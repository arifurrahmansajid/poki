import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiMonitor, FiUser, FiBookOpen, FiAward } from 'react-icons/fi';
import CoursesSection from '../components/home/CoursesSection';
// Import your local background asset
import sectionBg from '../assets/section-bg-23.png';

const AdultPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Banner Section matching the brand style */}
      <section 
        className="relative pt-44 pb-28 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sectionBg})` }}
      >
        <div className="relative z-10">
          <h1 className="text-[52px] font-black text-[#1B2336] mb-4 tracking-tight">Adults</h1>
          <div className="flex items-center justify-center gap-2 text-[15px] font-bold">
            <span className="text-[#59B1C9]">Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Adults</span>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <CoursesSection initialCategory="adult" showFilters={true} />

      {/* Achievement Section matching screencapture */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-100">
        <div className="mb-12 flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[12px] font-bold text-[#59B1C9] capitalize tracking-[0.2em]">Some Fun Fact</span>
            <div className="w-12 h-[1px] bg-[#59B1C9]"></div>
          </div>
          <h2 className="text-3xl md:text-[42px] font-black text-[#1B2336] mb-12">
            Our Great <span className="text-[#59B1C9] underline decoration-2 underline-offset-8">Achievement</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <StatCard icon={<FiUser className="text-blue-500" />} count="734" label="Enrolled Students" />
            <StatCard icon={<FiBookOpen className="text-orange-500" />} count="448" label="Academic Programs" />
            <StatCard icon={<FiMonitor className="text-green-500" />} count="140" label="Winning Award" />
            <StatCard icon={<FiAward className="text-red-500" />} count="80" label="Certified Students" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const StatCard = ({ icon, count, label }) => (
  <div className="bg-white p-8 border border-gray-50 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
    <div className="text-4xl p-4 bg-gray-50 rounded-full">{icon}</div>
    <div>
      <div className="text-[32px] font-black text-[#1B2336]">{count}</div>
      <div className="text-gray-500 text-sm font-semibold">{label}</div>
    </div>
  </div>
);

export default AdultPage;