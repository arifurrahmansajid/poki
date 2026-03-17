import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogSection from '../components/home/BlogSection';

const BlogPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-br from-teal-50 to-green-50 pt-28 pb-16 text-center">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Our Blog</span>
        <h1 className="text-4xl md:text-5xl font-black text-dark mt-2 mb-4">
          Latest <span className="text-primary">Articles</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Stay updated with the latest trends, tips, and news in the world of online learning and technology.
        </p>
      </div>
      <BlogSection />
      <Footer />
    </div>
  );
};

export default BlogPage;
