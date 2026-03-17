import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const features = [
  {
    icon: '🎓',
    title: 'Transformative Learning',
    desc: 'Empowering young minds and ambitious adults with future-ready education.',
  },
  {
    icon: '👨‍🏫',
    title: 'Expert Mentorship',
    desc: 'Guided by experienced educators and industry professionals.',
  },
  {
    icon: '🌟',
    title: 'Real-World Impact',
    desc: 'Skills that build confidence, creativity, and career success.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative px-6 -mt-[80px] md:-mt-[100px] z-20 pb-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 bg-white rounded-[1.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-50">
        {features.map((f, i) => (
          <div
            key={i}
            className={`p-10 md:p-12 flex flex-col items-start transition-all duration-500 hover:bg-slate-50/50 ${
              i !== features.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''
            }`}
          >
            {/* Title & Icon - Refined to match image_711671.png */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">{f.icon}</span>
              <h3 className="text-xl md:text-[1.35rem] font-bold text-[#1B2336] leading-tight">
                {f.title}
              </h3>
            </div>

            {/* Description - Lighter and better line height */}
            <p className="text-[#6B7280] text-[15px] md:text-[16px] leading-[1.6] mb-10 font-medium">
              {f.desc}
            </p>

            {/* Button - Smooth Left-to-Right Fill */}
            <Link
              to="/courses"
              className="group relative flex items-center justify-center px-7 py-3 overflow-hidden rounded-full transition-all duration-500 border border-transparent mt-auto"
            >
              {/* Default State Circle (Image 1) */}
              <div className="absolute left-[-5px] w-10 h-10 bg-[#E0F5F2] rounded-full transition-all duration-500 group-hover:scale-0 group-hover:opacity-0" />

              {/* Hover Fill (Image 2) - From LEFT to RIGHT */}
              <div className="absolute inset-0 w-full h-full bg-[#61B6CD] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-full" />

              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#1B2336] group-hover:text-white transition-colors duration-500">
                Explore Courses
                <FiArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1.5" />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;