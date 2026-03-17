import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiChevronDown, FiX, FiUser, FiMenu } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// Make sure the path below matches your project structure
import logo from '../assets/logo.png';
// API URL
const API_URL = 'http://localhost:5000/api/courses';

const Navbar = () => {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const dropdownTimerRef = useRef(null);
  const accountDropdownRef = useRef(null);

  // Fetch courses for search suggestions
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error('Error fetching courses for navbar:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setCoursesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setCoursesOpen(false);
    }, 150); // 150ms delay to cross the gap
  };

  const handleSearchSubmit = (event) => {
    event?.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/courses?q=${encodeURIComponent(query)}`);
      setSearchOpen(false);
    }
  };

  const applySuggestion = (title) => {
    setSearchQuery(title);
    navigate(`/courses?q=${encodeURIComponent(title)}`);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => {
      const next = !prev;
      if (!next) {
        setSearchQuery('');
        setSuggestions([]);
      }
      return next;
    });
  };

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    const timer = setTimeout(() => {
      const lower = trimmed.toLowerCase();
      const matches = courses
        .filter((course) => course.title.toLowerCase().includes(lower))
        .slice(0, 5);

      setSuggestions(matches);
      setLoadingSuggestions(false);
    }, 180);

    return () => clearTimeout(timer);
  }, [searchQuery, searchOpen]);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setAccountDropdownOpen(false);
    navigate('/');
  };

  const getDashboardPath = () => {
    if (user?.role === 'admin') return '/admin-dashboard';
    if (user?.role === 'company') return '/company-dashboard';
    return '/dashboard';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm md:py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 md:h-24 flex items-center justify-between relative">
        {/* Logo Section */}
        <Link to="/" className="flex-shrink-0 z-20 mr-2">
          <img 
            src={logo} 
            alt="London Safeguarding Network" 
            className="h-16 md:h-24 w-auto object-contain" 
          />
        </Link>

        {/* Navigation Links (centered) */}
        <div className="hidden lg:flex absolute inset-x-0 justify-center items-center z-10">
          <div className="relative flex items-center gap-10 bg-white/0 px-4">
            <NavLink to="/" className="text-[#1e266d] font-bold text-[15px] hover:text-[#56b9bc] transition-colors">
              Home
            </NavLink>

            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/courses">
              <button className="flex items-center gap-1 text-[#1e266d] font-bold text-[15px] hover:text-[#56b9bc] transition-colors">
                Courses <FiChevronDown className="text-gray-400 text-xs mt-1" />
              </button>
              </Link>

              <div
                className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 transition-opacity duration-200 ${
                  coursesOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <NavLink
                  to="/courses/children"
                  className="block px-5 py-3 text-sm text-[#1e266d] hover:bg-[#f6fbfc]"
                >
                  Children
                </NavLink>
                <NavLink
                  to="/courses/adult"
                  className="block px-5 py-3 text-sm text-[#1e266d] hover:bg-[#f6fbfc]"
                >
                  Adult
                </NavLink>
              </div>
            </div>

            <NavLink to="/membership" className="text-[#1e266d] font-bold text-[15px] hover:text-[#56b9bc] transition-colors">
              Membership
            </NavLink>

            <NavLink to="/contact" className="text-[#1e266d] font-bold text-[15px] hover:text-[#56b9bc] transition-colors">
              Contact
            </NavLink>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-5 z-20">
          <form ref={wrapperRef} className="relative" onSubmit={handleSearchSubmit}>
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className={`h-10 rounded-full border border-gray-200 bg-white px-4 text-sm text-[#1e266d] outline-none transition-all duration-300 ${
                searchOpen ? 'w-40 sm:w-64 opacity-100 pr-10' : 'w-0 opacity-0'
              }`}
              onFocus={() => setSearchOpen(true)}
            />
            <button
              type="button"
              onClick={() => {
                if (searchOpen && searchQuery.trim()) {
                  handleSearchSubmit();
                } else {
                  toggleSearch();
                }
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-[#1e266d] hover:text-[#56b9bc] transition-colors p-2 rounded-full"
              aria-label="Search"
            >
              {searchOpen ? <FiX size={20} /> : <FiSearch size={22} />}
            </button>

            {searchOpen && (
              <div className="absolute left-0 right-0 mt-2 w-full rounded-xl bg-white border border-gray-100 shadow-lg overflow-hidden z-30">
                {loadingSuggestions ? (
                  <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                ) : suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">No results</div>
                ) : (
                  <ul className="max-h-60 overflow-auto">
                    {suggestions.map((s) => (
                      <li
                        key={s.id}
                        className="cursor-pointer px-4 py-3 text-sm text-[#1e266d] hover:bg-[#f6fbfc]"
                        onClick={() => applySuggestion(s.title)}
                      >
                        {s.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </form>

          <Link to="/cart" className="relative text-[#1e266d] hover:text-[#56b9bc] transition-colors p-2 mr-2">
            <FiShoppingCart size={22} />
            <span className="absolute top-0 right-0 w-5 h-5 bg-[#56b9bc] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              /* Account button with dropdown when logged in */
              <div className="relative" ref={accountDropdownRef}>
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="bg-[#5bc0c2] hover:bg-[#48a3a6] text-white px-7 py-3 rounded-full font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 min-w-[110px]"
                >
                  <FiUser size={16} />
                  Account
                  <FiChevronDown size={14} className={`transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <div
                  className={`absolute right-0 top-full mt-2 w-52 rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 ${
                    accountDropdownOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'
                  }`}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-[#1e266d]">{user?.name || 'Student'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-3 text-sm text-[#1e266d] hover:bg-[#f6fbfc] transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              /* Login & Sign Up buttons when not logged in */
              <>
                <Link 
                  to="/login" 
                  className="bg-[#5bc0c2] hover:bg-[#48a3a6] text-white px-9 py-3 rounded-full font-bold text-sm transition-all shadow-sm flex items-center justify-center min-w-[110px]"
                >
                  Login
                </Link>
                
                <Link 
                  to="/membership" 
                  className="border border-gray-100 text-[#1e266d] px-9 py-3 rounded-full font-bold text-sm hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center min-w-[110px]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-[#1e266d] hover:text-[#56b9bc] transition-colors p-2"
            aria-label="Menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Drawer Content */}
        <div 
          className={`absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-[#1e266d]"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
            <NavLink 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-bold text-[#1e266d] hover:text-[#56b9bc]"
            >
              Home
            </NavLink>
            
            <div className="space-y-4">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Courses</p>
              <div className="pl-4 space-y-4">
                <NavLink 
                  to="/courses" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#1e266d] font-semibold"
                >
                  All Courses
                </NavLink>
                <NavLink 
                  to="/courses/children" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#1e266d] font-semibold hover:text-[#56b9bc]"
                >
                  Children
                </NavLink>
                <NavLink 
                  to="/courses/adult" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#1e266d] font-semibold hover:text-[#56b9bc]"
                >
                  Adult
                </NavLink>
              </div>
            </div>

            <NavLink 
              to="/membership" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-bold text-[#1e266d] hover:text-[#56b9bc]"
            >
              Membership
            </NavLink>

            <NavLink 
              to="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-bold text-[#1e266d] hover:text-[#56b9bc]"
            >
              Contact
            </NavLink>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#5bc0c2]/10 flex items-center justify-center text-[#5bc0c2]">
                    <FiUser size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1e266d]">{user?.name || 'Student'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-3 text-center bg-[#5bc0c2] text-white rounded-xl font-bold shadow-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-center text-red-500 font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-center bg-[#5bc0c2] text-white rounded-xl font-bold shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-center border border-gray-200 text-[#1e266d] rounded-xl font-bold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;