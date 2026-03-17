import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiChevronDown } from 'react-icons/fi';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();

  const parsePrice = (priceStr) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parsePrice(item.price) : Number(item.price);
      return total + price * (item.quantity || 1);
    }, 0);
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-black text-dark mb-10">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <FiTrash2 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-4">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't added any courses to your cart yet. Explore our catalog to find your next goal!</p>
            <Link to="/courses" className="btn-primary inline-flex items-center px-8 py-4">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Product List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
                <div className="hidden md:grid grid-cols-12 gap-4 p-8 border-b border-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-400">
                  <div className="col-span-8">Product</div>
                  <div className="col-span-4 text-right">Total</div>
                </div>

                <div className="divide-y divide-slate-50">
                  {cartItems.map((item) => (
                    <div key={item._id || item.id} className="p-8 group">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <div className="col-span-8 flex gap-6 mt-4 md:mt-0">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                            <img src={item.image || item.img} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-dark text-lg mb-1 leading-snug group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-primary font-black text-sm mb-2">
                               {typeof item.price === 'string' && item.price.startsWith('$') ? item.price : `$${item.price}`}
                            </p>
                            <p className="text-xs text-slate-400 mb-4 line-clamp-2 max-w-md">
                              Expert-led training designed to enhance your professional skills and career growth in safeguarding and professional development.
                            </p>
                            
                            {/* Quantity Selector matching the image */}
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-10">
                                <button 
                                  onClick={() => updateQuantity(item._id || item.id, -1)}
                                  className="px-3 h-full hover:bg-slate-50 text-slate-400 transition-colors border-r border-slate-200"
                                >
                                  <FiMinus size={14} />
                                </button>
                                <div className="px-5 font-bold text-dark text-sm min-w-[3rem] text-center">
                                  {item.quantity || 1}
                                </div>
                                <button 
                                  onClick={() => updateQuantity(item._id || item.id, 1)}
                                  className="px-3 h-full hover:bg-slate-50 text-slate-400 transition-colors border-l border-slate-200"
                                >
                                  <FiPlus size={14} />
                                </button>
                              </div>
                            </div>

                            <button 
                              onClick={() => removeFromCart(item._id || item.id)}
                              className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors inline-flex items-center gap-1 w-fit"
                            >
                              Remove item
                            </button>
                          </div>
                        </div>

                        <div className="col-span-4 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                           <p className="md:hidden text-xs font-black uppercase tracking-widest text-slate-400">Total:</p>
                           <p className="text-xl font-black text-dark">
                              ${( (typeof item.price === 'string' ? parsePrice(item.price) : Number(item.price)) * (item.quantity || 1)).toFixed(2)}
                           </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Totals Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm sticky top-32">
                <h2 className="text-xl font-black text-dark mb-8 uppercase tracking-widest text-sm">Cart Totals</h2>
                
                <div className="space-y-6">
                  {/* Coupon Dropdown */}
                  {/* <div className="relative border-b border-slate-50 pb-6">
                    <button className="w-full flex items-center justify-between text-sm font-bold text-slate-400 hover:text-dark transition-colors">
                      Add coupons
                      <FiChevronDown />
                    </button>
                  </div> */}

                  <div className="pt-6 border-b border-slate-50 pb-8">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-sm font-bold text-slate-500">Estimated total</span>
                       <span className="text-2xl font-black text-dark">${subtotal.toFixed(2)} USD</span>
                    </div>
                  </div>

                  {/* Payment Buttons */}
                  {/* <div className="space-y-3 pt-4">
                    <button className="w-full bg-[#9147ff] hover:bg-[#772ce8] text-white py-4 rounded-xl flex items-center justify-center font-black transition-all shadow-lg shadow-purple-200">
                      WOOPay
                    </button>
                    <button className="w-full bg-black hover:bg-zinc-900 text-white py-4 rounded-xl flex items-center justify-center font-black transition-all gap-2">
                      Buy with <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/1024px-Google_Pay_Logo_%282020%29.svg.png" className="h-5 invert brightness-0" alt="GPay" />
                    </button>
                  </div> */}

                  <div className="relative py-4 text-center">
                    <span className="absolute inset-x-0 top-1/2 h-px bg-slate-100 -z-10"></span>
                    <span className="bg-white px-4 text-[11px] font-black text-slate-400 tracking-widest uppercase">OR</span>
                  </div>

                  <Link to="/checkout" className="block w-full py-4 text-center text-sm font-black text-white bg-primary hover:bg-primary-dark rounded-2xl tracking-widest uppercase transition-all shadow-lg shadow-primary/20">
                     Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
