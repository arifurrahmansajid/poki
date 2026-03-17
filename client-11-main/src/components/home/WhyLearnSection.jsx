import React from 'react';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
// Import your background and the combined image asset
import sectionBg from '../../assets/section-bg-2.png'; 
import aboutIllustration from '../../assets/about5.png'; 
import { Link } from 'react-router-dom';

const WhyLearnSection = () => {
  const points = [
    '9/10 Average Satisfaction Rate',
    '96% Completitation Rate',
    'Friendly Environment & Expert Teacher',
    'Certified & Experienced Instructors',
    'Flexible Online & Self-Paced Learning',
    'Recognized Certifications',
  ];

  return (
    <section 
      className="relative py-24 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Content Side */}
        <div className="flex-1 z-10 flex flex-col items-center text-center md:items-start md:text-left">
          <span className="text-[#59B1C9] font-bold text-sm mb-4 block">
            Best Online Learning Platform
          </span>
          <h2 className="text-[#1B2336] text-3xl md:text-5xl font-bold leading-tight mb-6">
            Everything You Need to <br />
            <span className="text-[#59B1C9] underline decoration-2 underline-offset-8 decoration-[#59B1C9]/30">
              Learn, Grow
            </span> & Succeed
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed mb-8 max-w-lg">
            Our all-in-one learning platform is designed to support both young learners and ambitious professionals. With structured programs, expert mentorship, and real-world skill development, we help you turn learning into measurable success.
          </p>

          <ul className="grid grid-cols-1 gap-y-4 mb-10">
            {points.map((p, i) => (
              <li key={i} className="flex items-center gap-3 text-[#1B2336] font-semibold text-[15px]">
                <div className="w-5 h-5 rounded bg-[#59B1C9]/20 flex items-center justify-center">
                  <FiCheck className="text-[#59B1C9]" size={14} strokeWidth={4} />
                </div>
                {p}
              </li>
            ))}
          </ul>
            <Link to="/courses">
          <button className="group relative flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-500 border border-transparent shadow-sm hover:border-[#59B1C9]">
            {/* Soft circle background (default) */}
            <div className="absolute left-0 w-10 h-10 bg-[#E0F5F2] rounded-full transition-all duration-500 group-hover:scale-[3] group-hover:opacity-0" />
            {/* Fill overlay on hover */}
            <div className="absolute inset-0 w-full h-full bg-[#59B1C9] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out rounded-full" />

            <span className="relative z-10 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1B2336] group-hover:text-white transition-colors duration-500">
              START LEARNING NOW
              <FiArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
            </span>
          </button>
          </Link>
        </div>

        {/* Right Side: Using the provided about5.png asset */}
        <div className="flex-1 relative z-10 w-full flex justify-center lg:justify-end">
          <img 
            src={aboutIllustration} 
            alt="Learning Platform Features" 
            className="w-full max-w-[650px] h-auto object-contain animate-float"
          />
        </div>

      </div>
    </section>
  );
};

export default WhyLearnSection;