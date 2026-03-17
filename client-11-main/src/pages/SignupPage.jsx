import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    // TODO: wire this up to your auth system
    console.log('Signing up with', { email, password });
    alert('Sign up submitted! (stub)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-gray-100 p-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Create your account</h1>
          <p className="text-sm text-slate-500 mb-6">Join us to unlock all learning resources and track your progress.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#5bc0c2] focus:ring focus:ring-[#5bc0c2]/30"
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
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#5bc0c2] focus:ring focus:ring-[#5bc0c2]/30"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#5bc0c2] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#48a3a6]"
            >
              Create account
            </button>
          </form>

          <div className="mt-7 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#5bc0c2] hover:text-[#3d96a0]">
              Log in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage;
