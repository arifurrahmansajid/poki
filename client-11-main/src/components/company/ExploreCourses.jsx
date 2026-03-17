import React, { useState, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiInfo, FiPlus, FiMinus, FiCheck } from 'react-icons/fi';
import { courses as defaultCourses } from '../../data/courses';

const ExploreCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses'));
    setCourseList(savedCourses || defaultCourses);
  }, []);

  const handleBuyLicenses = () => {
    if (!selectedCourse) return;
    
    const existingLicenses = JSON.parse(localStorage.getItem('companyLicenses')) || {};
    const current = existingLicenses[selectedCourse.id] || { count: 0, used: 0 };
    
    existingLicenses[selectedCourse.id] = {
      ...current,
      count: current.count + quantity,
      title: selectedCourse.title,
      image: selectedCourse.image || selectedCourse.img,
      price: selectedCourse.price
    };
    
    localStorage.setItem('companyLicenses', JSON.stringify(existingLicenses));
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedCourse(null);
      setQuantity(1);
    }, 2000);
  };

  const filtered = courseList.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-dark tracking-tight">Explore Courses</h1>
          <p className="text-slate-500 font-medium mt-1">Acquire licenses to assign courses to your students.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <div className="relative max-w-md w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((course) => (
          <div key={course.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden group hover:shadow-xl transition-all flex flex-col">
            <div className="relative aspect-video overflow-hidden bg-slate-100">
               <img src={course.image || course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
               <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl font-black text-primary text-sm shadow-sm">
                  ${course.price}
               </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
               <h3 className="font-bold text-dark mb-4 line-clamp-2 min-h-[3rem]">{course.title}</h3>
               <button 
                 onClick={() => setSelectedCourse(course)}
                 className="mt-auto w-full py-3 bg-slate-50 hover:bg-primary hover:text-white text-slate-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-100"
               >
                 <FiShoppingCart /> Buy Licenses
               </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/20 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-sm overflow-hidden animate-slide-up">
              <div className="p-8">
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-dark">Checkout</h2>
                    <button onClick={() => setSelectedCourse(null)} className="text-slate-400 hover:text-dark">×</button>
                 </div>
                 
                 <div className="flex gap-4 mb-6 p-4 bg-slate-50 rounded-2xl">
                    <img src={selectedCourse.image || selectedCourse.img} className="w-16 h-12 object-cover rounded-lg" />
                    <div>
                       <p className="text-sm font-bold text-dark line-clamp-1">{selectedCourse.title}</p>
                       <p className="text-xs font-bold text-primary">${selectedCourse.price} / seat</p>
                    </div>
                 </div>

                 <div className="space-y-4 mb-8">
                    <label className="text-sm font-bold text-dark italic">Quantity (Number of Students)</label>
                    <div className="flex items-center justify-between bg-slate-50 p-2 rounded-2xl border border-slate-100">
                       <button 
                         onClick={() => setQuantity(q => Math.max(1, q - 1))}
                         className="w-10 h-10 flex items-center justify-center bg-white text-dark rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
                       >
                          <FiMinus />
                       </button>
                       <span className="text-lg font-black text-dark">{quantity}</span>
                       <button 
                         onClick={() => setQuantity(q => q + 1)}
                         className="w-10 h-10 flex items-center justify-center bg-white text-dark rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
                       >
                          <FiPlus />
                       </button>
                    </div>
                    <div className="flex justify-between items-center px-2">
                       <span className="text-slate-400 text-sm font-medium">Total Amount:</span>
                       <span className="text-xl font-black text-dark">${selectedCourse.price * quantity}</span>
                    </div>
                 </div>

                 <button 
                   onClick={handleBuyLicenses}
                   disabled={showSuccess}
                   className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg ${
                     showSuccess ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-dark shadow-primary/30'
                   }`}
                 >
                    {showSuccess ? (
                      <> <FiCheck /> Licenses Purchased! </>
                    ) : (
                      <> <FiShoppingCart /> Pay & Acquire </>
                    )}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ExploreCourses;
