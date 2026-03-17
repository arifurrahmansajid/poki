const partners = [
  { name: 'Google', icon: 'Google' },
  { name: 'Microsoft', icon: 'Microsoft' },
  { name: 'Amazon', icon: 'Amazon' },
  { name: 'Meta', icon: 'Meta' },
  { name: 'Apple', icon: 'Apple' },
  { name: 'Netflix', icon: 'Netflix' },
  { name: 'Spotify', icon: 'Spotify' },
  { name: 'Slack', icon: 'Slack' },
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-primary font-bold text-xs uppercase tracking-widest mb-10 opacity-70">
          Trusted by Leading Companies Around The World
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((p, i) => (
            <div key={i} className="text-2xl font-black text-dark/60 tracking-tighter hover:text-primary transition-colors cursor-pointer">
              {p.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
