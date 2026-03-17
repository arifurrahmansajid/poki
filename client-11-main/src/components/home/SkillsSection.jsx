import React from 'react';
import { FiSmile, FiBookOpen, FiHeadphones, FiUser } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';
import videoThumb from '../../assets/video.jpg';

// Logo Assets (Replace these paths with your actual logo images)
const logos = [
  { id: 1, src: '/assets/logo1.png' },
  { id: 2, src: '/assets/logo2.png' },
  { id: 3, src: '/assets/logo3.png' },
  { id: 4, src: '/assets/logo4.png' },
  { id: 5, src: '/assets/logo5.png' },
  { id: 6, src: '/assets/logo1.png' }, // Duplicated for seamless loop
];

const stats = [
  { icon: <FiSmile className="text-blue-600" />, count: '854', label: 'Enrolled', color: 'border-blue-100' },
  { icon: <FiBookOpen className="text-orange-500" />, count: '521', label: 'Academic Programs', color: 'border-orange-100' },
  { icon: <FiHeadphones className="text-emerald-500" />, count: '163', label: 'Winning Award', color: 'border-emerald-100' },
  { icon: <FiUser className="text-pink-500" />, count: '93', label: 'Certified Students', color: 'border-pink-100' },
];

const AchievementSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
       

        {/* Achievement Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#59B1C9] font-bold text-[10px] uppercase tracking-[0.2em]">
              SOME FUN FACT
            </span>
            <div className="w-12 h-[1px] bg-[#59B1C9]/30"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B2336]">
            Our Great <span className="text-[#59B1C9] underline decoration-2 underline-offset-8 decoration-[#59B1C9]/30">Achievement</span>
          </h2>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4 md:px-0">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-5 p-8 bg-white border ${stat.color} rounded-lg shadow-sm hover:shadow-md transition-shadow text-center md:text-left`}
            >
              <div className="text-4xl">{stat.icon}</div>
              <div>
                <div className="text-3xl font-bold text-[#1B2336]">{stat.count}</div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
          <img 
            src={videoThumb} 
            alt="Achievement Video" 
            className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
              <div className="relative w-20 h-20 bg-[#59B1C9] rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                <FaPlay className="text-white ml-1 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Company Slider Section */}
        <div className=" mt-20">
          <div className="inline-block bg-[#E8F9F3] text-[#2BB673] px-10 py-2.5 rounded-full font-bold text-lg mb-12">
            Trusted Company Around The World!
          </div>

          {/* Infinite Logo Slider */}
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-14 animate-marquee min-w-max">
              {logos.concat(logos).map((logo, index) => (
                <div key={index} className="inline-flex items-center justify-center px-6 py-4 bg-white rounded-2xl shadow-sm">
                  <img
                    src={logo.src}
                    alt="Company Logo"
                    className="h-12 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default AchievementSection;