import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
// API URL
const API_URL = 'http://localhost:5000/api/courses';

// Import your local banner asset
import sectionBg from '../assets/section-bg-23.png';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    fetchCourseDetails();
    fetchRelatedCourses();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const fetchRelatedCourses = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setAllCourses(data);
      }
    } catch (error) {
      console.error('Error fetching related courses:', error);
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    try {
      const response = await fetch(`${API_URL}/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewName.trim(),
          rating: reviewRating,
          comment: reviewComment.trim(),
        }),
      });

      if (response.ok) {
        setReviewName('');
        setReviewRating(5);
        setReviewComment('');
        fetchCourseDetails(); // Refresh course data to get new reviews
        Swal.fire({
          title: 'Review Submitted!',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}>★</span>
    ));
  };


  const handleAddToCartClick = () => {
    if (course) {
      addToCart(course, quantity);
      Swal.fire({
        title: 'Added to Cart!',
        text: `${course.title} has been added to your shopping cart.`,
        icon: 'success',
        confirmButtonColor: '#59B1C9',
        borderRadius: '20px',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-end'
      });
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="py-24 px-6 text-center">
          <h1 className="text-3xl font-bold text-[#1B2336]">Course not found</h1>
          <Link to="/courses" className="mt-4 inline-block text-[#59B1C9] font-bold underline">Back to courses</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const related = allCourses.filter((c) => (c._id || c.id) !== (course._id || course.id)).slice(0, 4);


  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Banner Section with section-bg-23.png */}
      <section 
        className="relative pt-32 pb-20 md:pt-44 md:pb-28 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sectionBg})` }}
      >
        <div className="relative z-10 px-4">
          <h1 className="text-3xl md:text-[48px] font-black text-[#1B2336] mb-4 tracking-tight leading-tight">{course.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[13px] md:text-[14px] font-bold">
            <Link to="/" className="text-[#59B1C9]">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/courses" className="text-[#59B1C9]">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate max-w-[200px] sm:max-w-none">{course.title}</span>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Main Product Image */}
          <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
            <img src={course.image || course.img} alt={course.title} className="w-full h-auto object-cover" />
          </div>


          {/* Product Info */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-[28px] font-black text-[#1B2336] tracking-tight leading-tight">{course.title}</h2>
            <div className="flex flex-col gap-1">
              <div className="text-2xl md:text-[22px] font-bold text-gray-700">
                {typeof course.price === 'string' && course.price.startsWith('$') ? course.price : `$${course.price}`}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400 text-lg">
                  {renderStars(course.rating || 5)}
                </div>
                <span className="text-sm font-bold text-gray-400">({course.numReviews || 0} reviews)</span>
              </div>
            </div>

            <div className="text-[14px] text-gray-500 font-bold">{course.stock || 0} in stock</div>

            <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
              <input 
                type="number" 
                value={quantity} 
                min="1"
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full sm:w-16 h-12 border border-gray-200 text-center font-bold outline-none rounded-lg"
              />
              <button 
                onClick={handleAddToCartClick}
                className="w-full sm:flex-1 bg-[#59B1C9] hover:bg-[#48a3a6] text-white font-bold px-8 py-3 transition-all rounded-lg shadow-lg shadow-[#59B1C9]/20"
              >
                Add to cart
              </button>
            </div>

            {course.scormFileName && (
              <div className="pt-2">
                <button className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-black text-[18px] rounded-xl flex items-center justify-center gap-2 transform hover:scale-[1.02] transition-all shadow-lg shadow-amber-200">
                  <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                  Launch SCORM Course
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2 font-bold uppercase tracking-widest italic">File: {course.scormFileName}</p>
              </div>
            )}


            {/* Payment Buttons */}
            {/* <div className="space-y-3 pt-2">
              <button className="w-full py-4 bg-[#7a58f4] text-white font-black text-[20px] rounded-[5px] flex items-center justify-center italic">
                WooPay
              </button>
              <button className="w-full py-4 bg-black text-white font-bold text-[18px] rounded-[5px] flex items-center justify-center">
                G Pay
              </button>
            </div> */}

            <div className="pt-6 border-t border-gray-100 text-[14px] space-y-2 text-gray-500">
              <div>Category: <span className="text-[#1B2336] font-bold capitalize">{course.category || 'Adult'}</span></div>
              <div>SHARE THIS ON: <span className="text-gray-400 italic">[Sassy_Social_Share]</span></div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 md:mt-24">
          <div className="flex flex-col sm:flex-row border-b border-gray-100">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`px-6 md:px-10 py-4 md:py-5 font-bold text-[14px] md:text-[15px] ${
                activeTab === 'description'
                  ? 'bg-gray-50 text-[#1B2336] border-t-2 border-[#59B1C9]'
                  : 'text-gray-400'
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`px-6 md:px-10 py-4 md:py-5 font-bold text-[14px] md:text-[15px] ${
                activeTab === 'reviews'
                  ? 'bg-gray-50 text-[#1B2336] border-t-2 border-[#59B1C9]'
                  : 'text-gray-400'
              }`}
            >
              Reviews ({course.reviews?.length || 0})
            </button>
          </div>

          {activeTab === 'description' ? (
            <div className="py-8 md:py-12 text-gray-500 text-[14px] md:text-[15px] leading-relaxed space-y-6 max-w-4xl">
              {course.description ? (
                <div className="whitespace-pre-line text-slate-600 font-medium leading-relaxed">
                  {course.description}
                </div>
              ) : (
                <>
                  <p>You will master the Python programming language by building 100 unique projects over 100 days.</p>
                  <p>You will learn automation, game, app and web development, data science and machine learning all using Python.</p>
                  <ul className="list-none space-y-2">
                    <li>• You will be able to program in Python professionally</li>
                    <li>• Use Python for data science and machine learning</li>
                    <li>• Build GUIs and Desktop applications with Python</li>
                  </ul>
                </>
              )}
            </div>

          ) : (
            <div className="py-8 md:py-12 text-gray-700 text-[14px] md:text-[15px] leading-relaxed space-y-12 max-w-4xl">
              <div className="space-y-6">
                <h3 className="text-[18px] font-bold">Add your review</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#59B1C9]"
                    />
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#59B1C9]"
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} star{rating > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center">
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-[#59B1C9] py-3 text-white font-bold hover:bg-[#1B2336] transition"
                      >
                        Submit review
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Your review..."
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#59B1C9]"
                  />
                </form>
              </div>

              <div className="space-y-6">
                {!course.reviews || course.reviews.length === 0 ? (
                  <div className="text-gray-500">No reviews yet. Be the first to leave a review.</div>
                ) : (
                  course.reviews.map((rev, index) => (
                    <div key={index} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[15px] font-bold text-[#1B2336]">{rev.name}</div>
                          <div className="text-sm text-gray-500">{new Date(rev.date).toLocaleDateString()}</div>
                        </div>
                        <div className="text-sm font-bold text-amber-500">{renderStars(rev.rating)}</div>
                      </div>
                      <p className="mt-4 text-gray-600">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        <div className="mt-20 md:mt-24">
          <h3 className="text-xl md:text-[24px] font-black text-[#1B2336] mb-8 md:mb-10 text-center md:text-left">Related products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {related.map((item) => (
              <Link
                key={item._id || item.id}
                to={`/courses/${item._id || item.id}`}
                className="group block rounded-2xl border-2 border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-[#59B1C9]/30 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                  <img
                    src={item.image || item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>


                <div className="p-6 text-center sm:text-left">
                  <h4 className="text-[16px] font-bold text-[#1B2336] mb-2 truncate group-hover:text-[#59B1C9] transition-colors">{item.title}</h4>
                  <div className="flex justify-center sm:justify-start gap-0.5 text-[14px] mb-3">
                    {renderStars(item.rating || 5)}
                  </div>
                  <div className="text-[16px] font-black text-[#1B2336] mb-5">
                    {typeof item.price === 'string' && item.price.startsWith('$') ? item.price : `$${item.price}`}
                  </div>

                  <div className="inline-flex items-center justify-center rounded-xl bg-[#59B1C9] group-hover:bg-[#48a3a6] px-6 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-[#59B1C9]/20">
                    View details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailPage;