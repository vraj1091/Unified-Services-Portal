import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Mail, Lock, User, Phone, MapPin, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    mobile: '',
    city: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const indianCities = [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar',
    'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Nadiad',
    'Mehsana', 'Morbi', 'Surendranagar', 'Bharuch', 'Navsari'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/register', formData);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Registration failed';
      console.error('Registration error:', err.response?.data);
      setError(errorMsg);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-emerald-100/40 rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-[100px] opacity-70"></div>
      </div>

      <div
        className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden flex flex-col md:flex-row-reverse relative z-10 border border-white/60 animate-in fade-in zoom-in-95 duration-500"
      >
        {/* Right Side: Branding (Light Theme) */}
        <div className="md:w-5/12 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
                <img src="/ashoka-emblem.webp" alt="Emblem" className="w-6 h-6 object-contain opacity-80" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 leading-none">Unified Services</h3>
                <p className="text-xs text-slate-500 tracking-wider uppercase mt-1 font-semibold">Government of India</p>
              </div>
            </div>

            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Start Your Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Journey Today</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-sm">
              Join millions of citizens accessing government services with speed, transparency, and ease.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'Single Sign-On Access',
                'Business Grant Benefits',
                'Utility Bill Payments',
                'Secure Document Vault'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-white/60 px-4 py-3 rounded-xl shadow-sm border border-white/50 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-12 md:mt-0 pt-8 border-t border-slate-200/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-emerald-100/50 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bank-Grade Security</span>
            </div>
          </div>
        </div>

        {/* Left Side: Registration Form */}
        <div className="md:w-7/12 p-12 bg-white flex flex-col justify-center">
          <div className="max-w-xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
            <div className="h-1 w-12 bg-emerald-500 rounded-full mb-8"></div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                    placeholder="As per Government ID"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">Mobile Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                    placeholder="10-digit number"
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">City</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium appearance-none"
                    required
                  >
                    <option value="">Select city</option>
                    {indianCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Create Account <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center bg-slate-50 rounded-xl py-4 border border-slate-100">
              <p className="text-slate-500 text-sm font-medium">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-0">
        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">© 2026 Government of India</p>
      </div>
    </div>
  );
};

export default Register;
