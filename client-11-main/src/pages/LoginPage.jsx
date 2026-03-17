import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import sectionBg from '../assets/section-bg-23.png';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!identifier || !password) {
      setError('Please enter your email/username and password.');
      return;
    }

    setLoading(true);
    setError('');

    const result = await login(identifier, password);

    setLoading(false);

    if (result.success) {
      if (result.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (result.role === 'company') {
        navigate('/company-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Navbar />

      {/* Banner */}
      <section
        className="relative pt-44 pb-28 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sectionBg})` }}
      >
        <div className="relative z-10">
          <h1 className="text-[52px] font-black text-[#1B2336] mb-4 tracking-tight">Login</h1>
          <div className="flex items-center justify-center gap-2 text-[15px] font-bold">
            <Link to="/" className="text-[#59B1C9] hover:text-[#1B2336] transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Login</span>
          </div>
        </div>
      </section>

      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-gray-100 p-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-6">Log in to access your courses and dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="identifier">
                Email or Username
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com or username"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#5bc0c2] focus:ring focus:ring-[#5bc0c2]/30"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#5bc0c2] focus:ring focus:ring-[#5bc0c2]/30"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between text-sm text-slate-600">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#5bc0c2] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#48a3a6] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          <div className="mt-7 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/membership" className="font-semibold text-[#5bc0c2] hover:text-[#3d96a0]">
              Register here
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
