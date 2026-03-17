import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
// Using the home2.png you provided as the section background
import blogBg from '../../assets/home2.png';
import { blogs } from '../../data/blogs';

const BlogSection = () => {
  return (
    <section 
      className="py-32 bg-no-repeat bg-cover bg-center relative min-h-[900px]"
      style={{ backgroundImage: `url(${blogBg})` }}
    >
      {/* Three teal diagonal strokes on the left */}
      <div className="absolute left-8 bottom-40 opacity-40 hidden lg:block">
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1.5 h-16 bg-[#59B1C9] rounded-full rotate-[25deg]"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header matching image_6fae38.png */}
        <div className="mb-24 flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#59B1C9] font-bold text-[11px] uppercase tracking-[0.3em]">NEWS</span>
            <div className="h-[1px] w-14 bg-gray-300"></div>
          </div>
          <h2 className="text-[#1B2336] text-3xl md:text-[48px] font-extrabold leading-tight">
            Our Latest <span className="text-[#59B1C9] underline decoration-2 underline-offset-[12px] decoration-[#59B1C9]/30">Blogs</span>
          </h2>
        </div>

        {/* The Exact Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Lowered card */}
          <div className="md:col-span-3 md:translate-y-20">
            <BlogCard blog={blogs[0]} />
          </div>

          {/* Column 2: Main featured card (Top aligned) */}
          <div className="md:col-span-5">
            <BlogCard blog={blogs[1]} />
          </div>

          {/* Column 3: Higher aligned stack */}
          <div className="md:col-span-4 flex flex-col gap-8 -translate-y-10">
            <BlogCard blog={blogs[2]} />
            <BlogCard blog={blogs[3]} />
          </div>

          {/* Decorative pink dots on the right */}
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-30 hidden xl:block">
             <div className="grid grid-cols-4 gap-4">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#FFB2B2]"></div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ blog }) => (
  <Link
    to={`/blog/${blog.id}`}
    className="group block bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-500"
  >
    {/* Card Image */}
    {blog.img && (
      <div className="h-60 overflow-hidden">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
    )}

    <div className="p-10 flex flex-col h-full">
      <p className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-wider">
        {blog.date} | <span className="text-[#59B1C9]">{blog.category}</span>
      </p>
      <h3 className="text-[#1B2336] text-[20px] font-bold leading-[1.4] mb-6 group-hover:text-[#59B1C9] transition-colors">
        {blog.title}
      </h3>
      <p className="text-gray-500 text-sm mb-10 line-clamp-3">{blog.excerpt}</p>

      <div className="mt-auto">
        <div className="group relative flex items-center justify-center px-8 py-3 overflow-hidden rounded-full transition-all duration-500 border border-transparent shadow-sm">
          <div className="absolute left-0 w-10 h-10 bg-[#E0F5F2] rounded-full transition-all duration-500 group-hover:scale-[3] group-hover:opacity-0" />
          <div className="absolute inset-0 w-full h-full bg-[#59B1C9] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out rounded-full" />

          <span className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#1B2336] group-hover:text-white transition-colors duration-500">
            READ MORE <FiArrowRight className="text-sm transition-transform duration-500 group-hover:translate-x-2" />
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default BlogSection;