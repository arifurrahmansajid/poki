// HomePage.jsx — Precise section order matching the provided image 100%
import Navbar from '../components/Navbar';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TopicsSection from '../components/home/TopicsSection';
import SkillsSection from '../components/home/SkillsSection';
//import AchievementsSection from '../components/home/AchievementsSection';
//import VideoSection from '../components/home/VideoSection';
//import PartnersSection from '../components/home/PartnersSection';
import WhyLearnSection from '../components/home/WhyLearnSection';
import CoursesSection from '../components/home/CoursesSection';
import LMSSection from '../components/home/LMSSection';
//import NewsletterSection from '../components/home/NewsletterSection';
//import BlogSection from '../components/home/BlogSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* 1. Hero Centered Headline */}
      <HeroSection />

      {/* 2. Three White Cards Below Hero */}
      <FeaturesSection />

      {/* 3. Popular Topics Grid */}
      <TopicsSection />

      {/* 4. Build Skills (Woman Image on LEFT) */}
      <SkillsSection />

      {/* 5. Our Great Achievement (Stats Counters) */}
      {/* <AchievementsSection /> */}

      {/* 6. Video Section (Full width image with Play button) */}
      {/* <VideoSection /> */}

      {/* 7. Partners Section (Trusted By logos) */}
      {/* <PartnersSection /> */}

      {/* 8. Everything You Need (Text LEFT, Image Grid RIGHT) */}
      <WhyLearnSection />

      {/* 9. Explore All Our Courses (Course Cards) */}
      <CoursesSection />

      {/* 10. Premium Learning Resources (LMS Image LEFT, Text RIGHT) */}
      <LMSSection />

      {/* 11. Newsletter Subscription */}
      {/* <NewsletterSection /> */}

      {/* 12. Our Latest Blogs */}
      {/* <BlogSection /> */}

      <Footer />
    </div>
  );
};

export default HomePage;
