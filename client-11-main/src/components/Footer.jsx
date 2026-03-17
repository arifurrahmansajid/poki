import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
// Import your logo asset
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0A1B3D] pt-20 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Brand + Social */}
        <div className="space-y-8"> {/* Increased spacing slightly for the larger logo */}
          <Link to="/" className="inline-block">
            {/* Changed h-14 to h-20 for a larger, clearer presence */}
            <img 
              src={logo} 
              alt="Company Logo" 
              className="h-20 md:h-24 w-auto object-contain" 
            />
          </Link>
          <p className="text-gray-300 text-[15px] leading-relaxed max-w-xs">
            Discover high-quality courses, expert instructors, and tools to grow your skills—no spam.
          </p>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Connect with:
            </div>
            <div className="flex items-center gap-3">
              {[FiInstagram, FiFacebook, FiTwitter, FiLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-gray-200 hover:bg-[#59B1C9] hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Courses */}
        <div>
          <h4 className="text-lg font-bold mb-8 text-white relative">
            Courses
            <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#59B1C9]"></span>
          </h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {['Creative Writing', 'Digital Marketing', 'SEO Business', 'Social Marketing', 'Graphic Design', 'Website Development'].map((item) => (
              <li key={item}>
                <Link to="#" className="hover:text-[#59B1C9] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-bold mb-8 text-white relative">
            Company
            <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#59B1C9]"></span>
          </h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {['About Us', 'Knowledge Base', 'Affiliate Program', 'Community', 'Market API', 'Support Team'].map((item) => (
              <li key={item}>
                <Link to="#" className="hover:text-[#59B1C9] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-8 text-white relative">
            Contact Info
            <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#59B1C9]"></span>
          </h4>
          <ul className="space-y-6 text-gray-300 text-sm">
            <li className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#0C2B5B] text-[#59B1C9]">
                <FiPhone size={18} />
              </div>
              <div>
                <div className="text-[13px] font-bold text-white uppercase tracking-wider">Phone Number</div>
                <div className="text-gray-400 mt-1">+123 456 789</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#0C2B5B] text-[#59B1C9]">
                <FiMail size={18} />
              </div>
              <div>
                <div className="text-[13px] font-bold text-white uppercase tracking-wider">Email Address</div>
                <div className="text-gray-400 mt-1">example@yourmail.com</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#0C2B5B] text-[#59B1C9]">
                <FiMapPin size={18} />
              </div>
              <div>
                <div className="text-[13px] font-bold text-white uppercase tracking-wider">Location</div>
                <div className="text-gray-400 mt-1">California, USA</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-400">
          © 2026 <span className="text-[#59B1C9] font-semibold">Edusion</span>. All Rights Reserved.
        </div>
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-500">
          <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;