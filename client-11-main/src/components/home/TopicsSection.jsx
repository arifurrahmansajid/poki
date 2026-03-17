import React from 'react';
// Assuming your asset is in the assets folder
import freeCourseImg from '../../assets/free-course.png';
import { Link } from 'react-router-dom';

const TopicsSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Header Section */}
        <div className="mb-16 flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#59B1C9] font-bold text-[10px] uppercase tracking-[0.2em]">
              START LEARNING
            </span>
            <div className="w-12 h-[1px] bg-[#59B1C9]/30"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1B2336] tracking-tight">
            Popular <span className="text-[#59B1C9] underline decoration-2 underline-offset-8 decoration-[#59B1C9]/30">Topics To Learn</span> From Today.
          </h2>
        </div>

        {/* Content Layout: Split Image & Text */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Side: Image with Decorative Shapes */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            {/* The main person image from your assets */}
            <img 
              src={freeCourseImg} 
              alt="Build Skills" 
              className="relative z-10 w-full max-w-[500px] object-contain"
            />
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-4xl md:text-5xl font-bold text-[#1B2336] leading-[1.2] mb-8">
              Build Skills Today For A <br />
              <span className="text-[#59B1C9] underline decoration-2 underline-offset-8 decoration-[#59B1C9]/30">
                Smarter Tomorrow
              </span>
            </h3>

            <div className="space-y-6 mb-10">
              <p className="text-gray-400 text-lg leading-relaxed">
                Upgrade your knowledge with industry-relevant courses designed for both young 
                learners and working professionals. From foundational learning programs for children 
                to advanced career development training for adults, our platform helps every learner 
                grow with confidence and real-world skills.
              </p>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                We focus on practical education, interactive lessons, and expert mentorship so that 
                learning doesn't just stay theoretical, it transforms into real results.
              </p>
            </div>

            {/* Explore More Button - Matching your home page style */}
            <Link to="/courses">
            <button  className="group relative flex items-center justify-center px-10 py-4 overflow-hidden rounded-full transition-all duration-500 bg-[#61B6CD] hover:bg-[#52a4b9] shadow-lg shadow-teal-100">
              <span className="relative z-10 text-white font-bold text-sm">
                Explore More
              </span>
            </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TopicsSection;