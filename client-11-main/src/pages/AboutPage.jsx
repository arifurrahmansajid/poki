import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkillsSection from '../components/home/SkillsSection';
import AchievementsSection from '../components/home/AchievementsSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-br from-teal-50 to-green-50 pt-28 pb-16 text-center">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">About Us</span>
        <h1 className="text-4xl md:text-5xl font-black text-dark mt-2 mb-4">
          Who We <span className="text-primary">Are</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          We are a passionate team dedicated to making education accessible and effective for everyone, everywhere.
        </p>
      </div>
      <SkillsSection />
      <AchievementsSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
