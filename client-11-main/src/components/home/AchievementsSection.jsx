import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FiBook, FiUsers, FiAward, FiStar } from 'react-icons/fi';

const stats = [
  { value: 954, suffix: '+', label: 'Total Courses', icon: <FiBook />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { value: 621, suffix: '+', label: 'Expert Teachers', icon: <FiUsers />, color: 'text-orange-600', bg: 'bg-orange-50' },
  { value: 143, suffix: 'K+', label: 'Happy Students', icon: <FiAward />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { value: 98, suffix: '%', label: 'Success Rate', icon: <FiStar />, color: 'text-rose-600', bg: 'bg-rose-50' },
];

const AchievementsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-4">OUR NUMBERS</span>
          <h2 className="text-3xl md:text-5xl font-black text-dark tracking-tight">
            Our Great <span className="text-primary relative">
              Achievements
              <svg className="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                <path d="M0 6 Q50 -2 100 6 Q150 14 200 6" stroke="#00a491" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 text-center shadow-xl shadow-teal-50/50 border border-teal-50 hover:shadow-2xl transition-all group hover:-translate-y-2">
              <div className={`w-16 h-16 rounded-3xl ${s.bg} flex items-center justify-center ${s.color} text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <div className={`text-3xl md:text-4xl font-black text-dark mb-2`}>
                {inView ? <CountUp end={s.value} duration={2.5} suffix={s.suffix} /> : 0}
              </div>
              <p className="text-gray-400 text-sm font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
