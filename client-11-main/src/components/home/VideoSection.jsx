import { FiPlay } from 'react-icons/fi';

const VideoSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-[3rem] overflow-hidden shadow-3xl shadow-teal-50/50 group h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop"
            alt="Video Preview"
            className="w-full h-full object-cover brightness-50 contrast-125 transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center gap-6 px-4">
            <button className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 group-hover:scale-110 border-8 border-white group relative">
                <FiPlay size={32} className="ml-2 relative z-10" />
                <div className="absolute inset-0 bg-primary-dark opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-0" />
            </button>
            <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
              Watch Our <span className="text-primary italic underline underline-offset-8">Intro Video</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
