import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import sectionBg from '../assets/section-bg-23.png';
import shapesBg from '../assets/shapes-bg.png';

const MembershipPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Banner */}
      <section
        className="relative pt-44 pb-28 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sectionBg})` }}
      >
        <div className="relative z-10">
          <h1 className="text-[52px] font-black text-[#1B2336] mb-4 tracking-tight">
            Register
          </h1>
          <div className="flex items-center justify-center gap-2 text-[15px] font-bold">
            <Link to="/" className="text-[#59B1C9] hover:text-[#1B2336] transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Register</span>
          </div>
        </div>
      </section>

      {/* Registration Forms Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Student Card */}
            <RegistrationCard
              title="I'm a Student"
              role="student"
            />

            {/* Company Card */}
            <RegistrationCard
              title="I have a company"
              role="company"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const RegistrationCard = ({ title, role }) => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.firstName || !form.lastName || !form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const result = await register({
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      username: form.username,
      password: form.password,
      confirmPassword: form.confirmPassword,
      role,
    });
    setLoading(false);

    if (result.success) {
      Swal.fire({
        title: 'Account Created!',
        text: `Welcome! Your ${role} account has been created. Please log in.`,
        icon: 'success',
        confirmButtonColor: '#59B1C9',
        confirmButtonText: 'Go to Login',
      }).then(() => {
        navigate('/login');
      });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="relative bg-white rounded-[10px] shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden px-12 py-12">
      {/* Background shapes overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${shapesBg})` }}
      />

      <div className="relative z-10">
        <div className="mb-10">
          <h2 className="text-[32px] font-black text-[#59B1C9] mb-1">{title}</h2>
          <p className="text-sm text-gray-400 font-medium">
            {role === 'student' ? 'Create your student account to start learning.' : 'Register your company account to manage your team.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Username" name="username" type="text" value={form.username} onChange={handleChange} />
          <Input label="First Name" name="firstName" type="text" value={form.firstName} onChange={handleChange} />
          <Input label="Last Name" name="lastName" type="text" value={form.lastName} onChange={handleChange} />
          <Input label="E-mail Address" name="email" type="email" value={form.email} onChange={handleChange} />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          <Input label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#59B1C9] hover:bg-[#1B2336] text-white font-bold py-4 px-12 rounded-[5px] transition-all duration-300 shadow-sm uppercase text-[13px] tracking-widest disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#59B1C9] font-bold hover:text-[#1B2336] transition-colors">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, name, type, value, onChange }) => (
  <div className="space-y-2">
    <label className="block text-[15px] font-bold text-[#1B2336]">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full bg-[#F3F7FA] border-none rounded-[5px] px-5 py-4 text-[#1B2336] focus:ring-1 focus:ring-[#59B1C9] outline-none"
    />
  </div>
);

export default MembershipPage;