import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CoursesSection from '../components/home/CoursesSection';
// import TopicsSection from '../components/home/TopicsSection';

const CoursesPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialSearch = query.get('q') ?? '';

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Page Header */}
      <div className="bg-gradient-to-br from-teal-50 to-green-50 pt-28 pb-16 text-center">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Our Catalog</span>
        <h1 className="text-4xl md:text-5xl font-black text-dark mt-2 mb-4">
          Explore <span className="text-primary">All Courses</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Browse our extensive library of courses across technology, design, business, and more.
        </p>
      </div>
      {/* <TopicsSection /> */}
      <CoursesSection initialSearch={initialSearch} showFilters={true} />
      <Footer />
    </div>
  );
};

export default CoursesPage;
