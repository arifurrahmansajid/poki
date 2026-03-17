import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load from local storage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const productId = product._id || product.id;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => (item._id || item.id) === productId);
      if (existingItem) {
        return prevItems.map((item) =>
          (item._id || item.id) === productId ? { ...item, quantity: (item.quantity || 1) + Number(quantity) } : item
        );
      }
      return [...prevItems, { ...product, quantity: Number(quantity) }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if ((item._id || item.id) === productId) {
            const newQuantity = (item.quantity || 1) + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => (item._id || item.id) !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
