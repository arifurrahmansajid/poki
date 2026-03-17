import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiEye, FiSearch, FiX } from 'react-icons/fi';
// API URL
const API_URL = 'http://localhost:5000/api/courses';

import { useCart } from '../../context/CartContext';
import Swal from 'sweetalert2';

const formatPrice = (price) => Number(String(price).replace(/[^0-9.]/g, ''));

const renderStars = (rating) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <span key={i} className={i < Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}>★</span>
  ));
};

const CoursesSection = ({ initialSearch = '', initialCategory = 'all', showFilters = false }) => {
  const { addToCart } = useCart();
  const [search, setSearch] = useState(initialSearch);
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setAllCourses(data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleOpenModal = (e, course) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleAddToCart = (e, course) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(course);
    Swal.fire({
      title: 'Added to Cart!',
      text: `${course.title} has been added to your shopping cart.`,
      icon: 'success',
      confirmButtonColor: '#59B1C9',
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      position: 'top-end'
    });
  };

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setCategoryFilter(initialCategory);
  }, [initialCategory]);

  const filteredCourses = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();

    return allCourses.filter((course) => {
      // 1. Search Filter
      const matchesSearch = lowerSearch
        ? course.title.toLowerCase().includes(lowerSearch)
        : true;

      if (!matchesSearch) return false;

      // 2. Category Filter
      const matchesCategory = categoryFilter === 'all' 
        ? true 
        : course.category === categoryFilter;

      if (!matchesCategory) return false;

      // 3. Price Filter
      const price = formatPrice(course.price);
      switch (priceFilter) {
        case 'under100':
          return price < 100;
        case 'between100and200':
          return price >= 100 && price <= 200;
        case 'above200':
          return price > 200;
        default:
          return true;
      }
    });
  }, [allCourses, search, priceFilter, categoryFilter]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Heading matching the screenshot style */}
        <div className="mb-14 flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#59B1C9] font-bold text-[10px] capitalize tracking-[0.2em]">Popular Courses</span>
            <div className="w-16 h-[1px] bg-[#59B1C9]/40"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1B2336]">
            {initialCategory === 'children' ? 'Children' : initialCategory === 'adult' ? 'Adult' : 'Explore All'} <span className="text-[#59B1C9] underline decoration-2 underline-offset-8 decoration-[#59B1C9]/30">Our Courses</span>
          </h2>
        </div>

        {/* Search + Filter */}
        {showFilters && (
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-1/3">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full rounded-full border border-gray-200 bg-white pl-11 pr-4 py-3 text-sm text-[#1B2336] outline-none focus:border-[#59B1C9] focus:ring focus:ring-[#59B1C9]/30"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-600">Category:</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-[#1B2336] outline-none focus:border-[#59B1C9] focus:ring focus:ring-[#59B1C9]/30"
                >
                  <option value="all">All Categories</option>
                  <option value="children">Children</option>
                  <option value="adult">Adult</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-600">Price:</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-[#1B2336] outline-none focus:border-[#59B1C9] focus:ring focus:ring-[#59B1C9]/30"
                >
                  <option value="all">All prices</option>
                  <option value="under100">Under $100</option>
                  <option value="between100and200">$100–$200</option>
                  <option value="above200">Above $200</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Grid Layout */}
        {filteredCourses.length === 0 ? (
          <div className="py-24 text-center text-gray-500">
            No courses found. Try adjusting your search or filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((c) => (
              <Link
                key={c._id || c.id}
                to={`/courses/${c._id || c.id}`}
                className="group block bg-white border border-gray-100 rounded-sm overflow-visible hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-visible">
                  <img
                    src={c.image || c.img}
                    alt={c.title}
                    className="w-full h-full object-cover"
                  />


                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black capitalize tracking-wider backdrop-blur-md shadow-sm border border-white/20
                    ${c.category === 'children' ? 'bg-amber-400/90 text-white' : 'bg-purple-500/90 text-white'}
                  `}>
                    {c.category}
                  </div>

                  {/* Floating Action Buttons: Bottom-Right overlap */}
                  <div className="absolute -bottom-4 right-2 flex gap-1 z-10">
                    <button
                      type="button"
                      className="w-9 h-9 bg-[#59B1C9] text-white flex items-center justify-center hover:bg-[#1B2336] transition-colors"
                      onClick={(e) => handleAddToCart(e, c)}
                    >
                      <FiShoppingCart size={16} />
                    </button>
                    <button
                      type="button"
                      className="w-9 h-9 bg-[#79C6D9] text-white flex items-center justify-center hover:bg-[#1B2336] transition-colors"
                      onClick={(e) => handleOpenModal(e, c)}
                    >
                      <FiEye size={16} />
                    </button>
                  </div>
                </div>

                {/* Card Content centered */}
                <div className="pt-10 pb-8 px-5 text-center">
                  <div className="flex justify-center gap-0.5 text-[14px] mb-3">
                    {renderStars(c.rating || 5)}
                  </div>

                  <div className="inline-block border border-[#59B1C9] px-3 py-1 mb-4">
                    <span className="text-[#59B1C9] font-bold text-sm">{typeof c.price === 'string' && c.price.startsWith('$') ? c.price : `$${c.price}`}</span>
                    {c.seatText && (
                      <span className="text-gray-400 text-[10px] font-medium ml-1">{c.seatText}</span>
                    )}
                  </div>


                  <h3 className="text-[15px] font-bold text-[#1B2336] leading-snug hover:text-[#59B1C9] transition-colors cursor-pointer line-clamp-2">
                    {c.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseModal}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-500 hover:text-primary transition-colors hover:scale-110"
            >
              <FiX size={24} />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Product Image */}
              <div className="md:w-1/2 aspect-video md:aspect-auto">
                <img 
                  src={selectedCourse.image || selectedCourse.img} 
                  alt={selectedCourse.title} 
                  className="w-full h-full object-cover"
                />

              </div>

              {/* Product Info */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest">QUICK VIEW</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                    <span className={`font-bold text-xs capitalize tracking-widest ${selectedCourse.category === 'children' ? 'text-amber-500' : 'text-purple-500'}`}>
                      {selectedCourse.category}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-dark mb-4 leading-tight">
                    {selectedCourse.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <div className="flex">
                      {renderStars(selectedCourse.rating || 5)}
                    </div>
                    <span className="font-bold text-gray-400">({selectedCourse.numReviews || 0} reviews)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-primary">
                        {typeof selectedCourse.price === 'string' && selectedCourse.price.startsWith('$') ? selectedCourse.price : `$${selectedCourse.price}`}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {selectedCourse.stock || 0} in stock
                      </span>
                    </div>

                    {selectedCourse.seatText && (
                      <span className="text-sm font-bold text-slate-400">{selectedCourse.seatText}</span>
                    )}
                  </div>
                </div>

                <p className="text-slate-500 mb-8 leading-relaxed">
                  Enhance your skills with our expert-led course. Learn everything you need to master this topic and achieve your professional goals.
                </p>

                <div className="space-y-4">
                  <button 
                    onClick={(e) => {
                      handleAddToCart(e, selectedCourse);
                      handleCloseModal();
                    }}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4 shadow-lg shadow-primary/20"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleCloseModal}
                    className="w-full py-4 text-sm font-bold text-slate-400 hover:text-dark transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoursesSection;