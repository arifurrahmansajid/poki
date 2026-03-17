import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import lmsImage from '../../assets/6c5f91d0099ad6675edee66d136003d1.webp'; 
import { Link } from 'react-router-dom';

const LMSSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden -mt-[130px]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Image Side */}
        <div className="flex-1">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={lmsImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"}
              alt="LMS Platform"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right Content Side */}
        <div className="flex-1">
          <h2 className="text-[#1B2336] text-4xl md:text-[42px] font-bold leading-tight mb-6">
            Don't Miss Out On <br />
            <span className="text-[#59B1C9] underline decoration-2 underline-offset-8 decoration-[#59B1C9]/30">
              Premium Learning Resources
            </span>
          </h2>
          
          <p className="text-gray-500 text-[15px] leading-relaxed mb-8 max-w-xl">
            Subscribe to unlock full access to our LMS platform, including structured courses, 
            step-by-step tutorials, downloadable resources, and exclusive member benefits. 
            Learn at your own pace and upgrade your skills with expert-designed content.
          </p>
           
          <Link to="/courses">
            <button className="bg-[#59B1C9] hover:bg-[#1B2336] text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2">
              Explore More
            </button>
          </Link>
        </div>
      </div>

      {/* Optimized Newsletter Section - Medium Size */}
      <div className="mt-32 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-[#1B2336] text-4xl md:text-5xl font-bold mb-6 leading-[1.2]">
          Subscripbe to our <br />
          newsletter, We don't make <br />
          any spam.
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium mb-10 opacity-80">
          Lorem ipsum dolor sit amet consectetur adipisicing elitsed eiusmod <br />
          tempor enim minim
        </p>
      </div>
    </section>
  );
};

export default LMSSection;