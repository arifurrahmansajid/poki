import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
// Import your background image
import backgroundImage from '../../assets/home2.png';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <section 
      className="relative pt-32 pb-32 md:pt-40 md:pb-60 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-white/30 md:hidden"></div>
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-7xl font-bold text-[#1B2336] mb-6 tracking-tight leading-[1.1]">
          Smart <span className="relative inline-block text-[#59B1C9]">
            Learning
            {/* The simple underline from the screenshot */}
            <div className="absolute bottom-1 md:bottom-3 left-0 w-full h-[2px] md:h-[3px] bg-[#59B1C9]/30 rounded-full" />
          </span> Starts Here
        </h1>
        
        {/* Description Text */}
        <p className="text-gray-500 text-base md:text-xl font-medium mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
          From playful learning programs for children to career-boosting courses for adults.<br className="hidden md:block" />
          We help every learner grow with confidence, creativity, and real skills.
        </p>

        {/* Search Bar - Responsive */}
        <form 
          onSubmit={handleSearch}
          className="max-w-xl mx-auto bg-white rounded-xl flex flex-row items-center p-1.5 border border-gray-200 shadow-lg focus-within:border-[#59B1C9] transition-all"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Your Course Here"
            className="flex-1 px-4 py-3 sm:px-6 outline-none text-gray-600 font-medium bg-transparent text-sm sm:text-base min-w-0"
          />
          <button 
            type="submit"
            className="bg-[#61B6CD] hover:bg-[#52a4b9] text-white px-4 py-3 sm:px-8 rounded-lg font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Search</span>
            <FiSend size={16} className="rotate-45" />
          </button>
        </form>
        
        {/* Popular Topic Label */}
        <div className="mt-12 flex flex-col items-center">
          <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Popular Topic:
          </div>
          {/* Pink Dot from screenshot */}
          <div className="w-4 h-4 rounded-full bg-pink-200 opacity-60"></div>
        </div>

        {/* Decorative Grid Pattern (bottom right) */}
        <div className="absolute bottom-10 right-10 opacity-20 hidden md:block">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#59B1C9]"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;