import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white text-slate-900">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex relative overflow-hidden bg-slate-50 flex-col justify-between p-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-100/50 to-indigo-100/50 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-100/50 to-teal-100/50 rounded-full blur-[100px] -ml-20 -mb-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
              <img src="/ashoka-emblem.webp" alt="Ashoka Emblem" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Unified Services <span className="text-primary-600">Portal</span></h1>
              <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">Government of India</p>
            </div>
          </div>

          <div className="space-y-6 max-w-lg">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Access all government <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                services in one place
              </span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Experience the next generation of digital governance. Apply for documents, track status with ease and security.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-800">Secure Access</h3>
              <p className="text-xs text-slate-500 mt-1">End-to-end encryption</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800">Fast Processing</h3>
              <p className="text-xs text-slate-500 mt-1">Quick approvals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-col justify-center p-8 sm:p-16 lg:p-24 bg-white relative">
        <div className="lg:hidden mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
            <img src="/ashoka-emblem.webp" alt="Ashoka" className="w-7 h-7 object-contain" />
          </div>
          <span className="font-bold text-slate-800">Unified Portal</span>
        </div>

        <div className="max-w-md w-full mx-auto space-y-8 animate-in slide-in-from-bottom-5 duration-700">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500 font-medium">Please verify your identity to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email or Mobile</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                    placeholder="citizen@gujarat.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying Credentials...' : 'Sign In securely'}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 font-medium">New to the portal?</span>
            </div>
          </div>

          <div className="text-center">
            <Link to="/register" className="inline-flex items-center justify-center px-4 py-2 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-200 hover:text-slate-900 transition-all">
              Create a Citizen Account
            </Link>
          </div>

          <p className="text-center text-xs text-slate-400 mt-8">
            By logging in, you agree to our Terms of Service and Privacy Policy.
            <br />Protected by reCAPTCHA.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;