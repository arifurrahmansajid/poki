const NewsletterSection = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-50 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-teal-50 rounded-full blur-[100px] translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#1B2336] mb-12 leading-[1.1] tracking-tighter">
          Subscribe to our <span className="text-[#59B1C9] wavy-underline">newsletter</span>, <br />
          <span className="italic font-medium opacity-80">We don't make any spam.</span>
        </h2>
        
        {/* Newsletter form with wide input and blue button */}
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-stretch shadow-3xl shadow-teal-900/5 rounded-[2rem] p-2 bg-white border border-teal-50">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-10 py-5 outline-none text-base font-semibold text-gray-600 bg-transparent"
          />
          <button className="bg-[#59B1C9] hover:bg-[#4AA1B7] text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-95">
            Subscribe Now
          </button>
        </div>
        
        <div className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
           Unsubscribe at any time.
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
