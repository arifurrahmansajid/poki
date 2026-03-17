import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/auth';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Returns { success, role } or { success: false, error }
  const login = async (identifier, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed.' };
      }

      const userData = data.user;
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      return { success: true, role: userData.role };
    } catch (err) {
      return { success: false, error: 'Cannot connect to server. Please try again.' };
    }
  };

  // Returns { success } or { success: false, error }
  const register = async ({ name, email, username, password, confirmPassword, role }) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, username, password, confirmPassword, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed.' };
      }

      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: 'Cannot connect to server. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
