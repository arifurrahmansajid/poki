import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiLock, FiInfo, FiCheckCircle } from 'react-icons/fi';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'United Kingdom (UK)',
    streetAddress: '',
    apartment: '',
    city: '',
    county: '',
    postcode: '',
    phone: '',
    email: user?.email || '',
    orderNotes: '',
    createAccount: false,
    shipToDifferentAddress: false,
    paymentMethod: 'bank_transfer'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [enrolledCourseNames, setEnrolledCourseNames] = useState([]);

  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    return parseFloat(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parsePrice(item.price) * (item.quantity || 1);
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate a brief payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // If user is logged in, enroll them in the purchased courses
      if (user?.id) {
        // Get the MongoDB _id values from cart items (courses from DB have _id)
        const courseIds = cartItems
          .map((item) => item._id || item.id)
          .filter(Boolean);

        if (courseIds.length > 0) {
          const res = await fetch('http://localhost:5000/api/payments/enroll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, courseIds }),
          });

          if (res.ok) {
            const data = await res.json();
            console.log('Enrolled:', data);
          }
        }
      }

      // Collect course names for the success message
      const names = cartItems.map((item) => item.title);
      setEnrolledCourseNames(names);

      // Clear the cart
      if (clearCart) clearCart();

      // Show success state
      setOrderSuccess(true);
    } catch (err) {
      console.error('Order submission error:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Success Screen ───────────────────────────────────────────────────────────
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 pt-40 pb-20 flex flex-col items-center text-center">
          {/* Animated checkmark */}
          <div className="relative mb-8">
            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
              <FiCheckCircle className="w-14 h-14 text-green-500" />
            </div>
            <div className="absolute inset-0 w-28 h-28 rounded-full border-4 border-green-200 animate-ping opacity-30" />
          </div>

          <h1 className="text-4xl font-black text-dark mb-3">Payment Successful! 🎉</h1>
          <p className="text-slate-500 font-medium text-lg mb-8 leading-relaxed">
            Your order has been placed and you are now enrolled in the following course(s):
          </p>

          {/* Enrolled courses list */}
          <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-10 text-left space-y-3">
            {enrolledCourseNames.map((name, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <FiCheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="font-bold text-dark">{name}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-400 font-medium mb-8">
            Your courses are now available in your Student Dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-black transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-sm"
            >
              Go to My Dashboard
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-dark py-4 rounded-2xl font-black transition-all uppercase tracking-widest text-sm"
            >
              Browse More Courses
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Checkout Form ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/cart" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-widest">
            <FiChevronLeft /> Back to cart
          </Link>
        </div>

        <h1 className="text-4xl font-black text-dark mb-10">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Billing Details */}
          <div className="lg:col-span-7 space-y-10">
            <section>
              <h2 className="text-xl font-black text-dark mb-8 uppercase tracking-widest text-sm border-b border-slate-100 pb-4">Billing details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">First name <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Last name <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Company name (optional)</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark"
                />
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Country / Region <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-dark appearance-none"
                  >
                    <option>United Kingdom (UK)</option>
                    <option>United States (US)</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <FiChevronLeft className="rotate-270" style={{ transform: 'rotate(270deg)' }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Street address <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  name="streetAddress"
                  placeholder="House number and street name"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark mb-4"
                />
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark"
                />
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Town / City <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark"
                />
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">County (optional)</label>
                <input
                  type="text"
                  name="county"
                  value={formData.county}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark"
                />
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Postcode <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark"
                />
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Phone <span className="text-red-500">*</span></label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark"
                />
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Email address <span className="text-red-500">*</span></label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark"
                />
              </div>

              <div className="mt-8 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="createAccount"
                    checked={formData.createAccount}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-dark transition-colors">Create an account?</span>
                </label>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-dark mb-8 uppercase tracking-widest text-sm border-b border-slate-100 pb-4">Additional information</h2>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Order notes (optional)</label>
                <textarea
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-dark resize-none"
                ></textarea>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm sticky top-32">
              <h2 className="text-xl font-black text-dark mb-8 uppercase tracking-widest text-sm border-b border-slate-100 pb-4">Your order</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400 pb-2">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                <div className="divide-y divide-slate-50">
                  {cartItems.map((item) => (
                    <div key={item.id || item._id} className="py-4 flex justify-between items-center gap-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-dark text-sm leading-tight">{item.title}</span>
                        <span className="text-xs text-slate-400 font-bold mt-1">Qty: {item.quantity || 1}</span>
                      </div>
                      <span className="font-bold text-dark whitespace-nowrap">
                        ${(parsePrice(item.price) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500">Subtotal</span>
                    <span className="font-bold text-dark">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-base font-black text-dark uppercase tracking-widest text-xs">Total</span>
                    <span className="text-2xl font-black text-primary">${subtotal.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                <div className="space-y-4">
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-primary focus:ring-primary border-slate-300"
                    />
                    <div>
                      <span className="block font-bold text-dark text-sm">Direct bank transfer</span>
                      {formData.paymentMethod === 'bank_transfer' && (
                        <p className="mt-2 text-xs text-slate-500 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 italic">
                          Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                        </p>
                      )}
                    </div>
                  </label>

                  <label className="flex items-center gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cheque"
                      checked={formData.paymentMethod === 'cheque'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary focus:ring-primary border-slate-300"
                    />
                    <span className="font-bold text-dark text-sm">Check payments</span>
                  </label>

                  <label className="flex items-center gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary focus:ring-primary border-slate-300"
                    />
                    <span className="font-bold text-dark text-sm">Cash on delivery</span>
                  </label>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed mb-8 flex gap-2">
                <FiInfo className="shrink-0 mt-0.5" />
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
              </p>

              <button
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl flex items-center justify-center font-black transition-all shadow-xl shadow-primary/20 gap-2 uppercase tracking-widest text-sm disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Processing Payment…
                  </>
                ) : (
                  <>
                    <FiLock className="mb-0.5" /> Place Order
                  </>
                )}
              </button>

              {!user && (
                <p className="mt-4 text-center text-xs text-amber-600 font-bold bg-amber-50 rounded-xl p-3">
                  ⚠️ You are not logged in. <Link to="/login" className="underline">Log in</Link> so courses are added to your dashboard automatically after payment.
                </p>
              )}
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
