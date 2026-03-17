import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
// Import your local asset
import sectionBg from '../assets/section-bg-23.png';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb Header with your local background image */}
      <div 
        className="pt-44 pb-28 text-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${sectionBg})` }}
      >
        <div className="relative z-10">
          <h1 className="text-[52px] font-black text-[#1B2336] mb-4 tracking-tight">Contact</h1>
          <div className="flex items-center justify-center gap-2 text-[15px] font-bold">
            <span className="text-[#59B1C9] hover:text-[#1B2336] transition-colors cursor-pointer">Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Contact</span>
          </div>
        </div>
      </div>

      {/* Contact Info Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          
          {/* Location */}
          <div className="text-center group">
            <div className="w-20 h-20 mx-auto mb-6 text-[#59B1C9] flex items-center justify-center text-[45px]">
              <FiMapPin strokeWidth={1.5} />
            </div>
            <h3 className="text-[22px] font-black text-[#1B2336] mb-4">Our Location</h3>
            <p className="text-[#687083] text-[16px] leading-[1.8] max-w-[240px] mx-auto font-medium">
              3481 Melrose Place, Beverly Hills <br /> CA 90210
            </p>
          </div>

          {/* Telephone */}
          <div className="text-center group">
            <div className="w-20 h-20 mx-auto mb-6 text-[#59B1C9] flex items-center justify-center text-[45px]">
              <FiPhone strokeWidth={1.5} />
            </div>
            <h3 className="text-[22px] font-black text-[#1B2336] mb-4">Telephone</h3>
            <p className="text-[#687083] text-[16px] leading-[1.8] font-medium">
              (+1) 517 397 7100 <br /> (+1) 411 315 8138
            </p>
          </div>

          {/* Email */}
          <div className="text-center group">
            <div className="w-20 h-20 mx-auto mb-6 text-[#59B1C9] flex items-center justify-center text-[45px]">
              <FiMail strokeWidth={1.5} />
            </div>
            <h3 className="text-[22px] font-black text-[#1B2336] mb-4">Send Email</h3>
            <p className="text-[#687083] text-[16px] leading-[1.8] font-medium">
              info@example.com <br /> admin@example.com
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[42px] font-black text-[#1B2336] text-center mb-16 tracking-tight">
            Send your message.
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[15px] font-extrabold text-[#1B2336]">Name</label>
                <input 
                  type="text"
                  name="name" 
                  onChange={handleChange}
                  className="w-full bg-[#F3F7FA] border-none rounded-[5px] px-6 py-5 focus:ring-1 focus:ring-[#59B1C9] outline-none text-[#1B2336] font-medium" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[15px] font-extrabold text-[#1B2336]">Your Email</label>
                <input 
                  type="email"
                  name="email" 
                  onChange={handleChange}
                  className="w-full bg-[#F3F7FA] border-none rounded-[5px] px-6 py-5 focus:ring-1 focus:ring-[#59B1C9] outline-none text-[#1B2336] font-medium" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[15px] font-extrabold text-[#1B2336]">Your Subject</label>
              <input 
                type="text"
                name="subject" 
                onChange={handleChange}
                className="w-full bg-[#F3F7FA] border-none rounded-[5px] px-6 py-5 focus:ring-1 focus:ring-[#59B1C9] outline-none text-[#1B2336] font-medium" 
              />
            </div>

            <div className="space-y-3">
              <label className="text-[15px] font-extrabold text-[#1B2336]">Your Message</label>
              <textarea 
                rows={8}
                name="message" 
                onChange={handleChange}
                className="w-full bg-[#F3F7FA] border-none rounded-[5px] px-6 py-6 focus:ring-1 focus:ring-[#59B1C9] outline-none resize-none text-[#1B2336] font-medium" 
              />
            </div>

            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                className="bg-[#66C3D0] text-white px-14 py-5 rounded-[5px] font-bold hover:bg-[#1B2336] transition-all duration-300 uppercase tracking-[0.15em] text-[13px] shadow-sm"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;