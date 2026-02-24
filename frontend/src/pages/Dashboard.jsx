import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
  Zap, Briefcase, Gift, ArrowRight, FileText,
  CheckCircle, Clock, User,
  MapPin, Phone, Mail, Sparkles, TrendingUp, Shield, Bell
} from 'lucide-react';

// Utility functions to mask user information
const maskMobile = (mobile) => {
  if (!mobile) return '';
  const mobileStr = mobile.toString();
  if (mobileStr.length >= 4) {
    return '***' + mobileStr.slice(-4);
  }
  return '***' + mobileStr;
};

const maskEmail = (email) => {
  if (!email) return '';
  const atIndex = email.indexOf('@');
  if (atIndex > 0) {
    return '***' + email.substring(atIndex);
  }
  return '***@gmail.com';
};

const Dashboard = () => {
  const { user } = useAuth();
  const STATS_CACHE_KEY = 'dashboard_stats_cache_v1';
  const [stats, setStats] = useState({
    applications: 0,
    pending: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const appsRes = await api.get('/applications/');
      const applications = Array.isArray(appsRes.data) ? appsRes.data : [];
      const pending = applications.filter(a => ['pending', 'draft', 'processing'].includes(a.status)).length;
      const completed = applications.filter(a => a.status === 'completed').length;

      setStats({
        applications: applications.length,
        pending: pending,
        completed: completed
      });
      localStorage.setItem(
        STATS_CACHE_KEY,
        JSON.stringify({
          applications: applications.length,
          pending,
          completed
        })
      );
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch stats', error?.message || error);
      }
      const cached = localStorage.getItem(STATS_CACHE_KEY);
      if (cached) {
        try {
          setStats(JSON.parse(cached));
        } catch {
          setStats({
            applications: 0,
            pending: 0,
            completed: 0
          });
        }
      } else {
        setStats({
          applications: 0,
          pending: 0,
          completed: 0
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Main service categories
  const mainServices = [
    {
      id: 'utility-name-change',
      title: 'Utility Services',
      titleHindi: 'उपयोगिता नाम परिवर्तन',
      description: 'Electricity, Gas, Water & Property',
      icon: Zap,
      gradient: 'from-amber-400 to-orange-500',
      iconColor: 'text-amber-600',
      bgLight: 'bg-amber-50',
      route: '/utility-services'
    },
    {
      id: 'company-formation',
      title: 'Business Registration',
      titleHindi: 'नई कंपनी गठन',
      description: 'GST, TAN, PAN & Company Formation',
      icon: Briefcase,
      gradient: 'from-blue-500 to-indigo-600',
      iconColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
      route: '/company-formation'
    },
    {
      id: 'govt-grants',
      title: 'Government Grants',
      titleHindi: 'सरकारी अनुदान',
      description: 'Startup, MSME & Export Incentives',
      icon: Gift,
      gradient: 'from-emerald-400 to-teal-600',
      iconColor: 'text-emerald-600',
      bgLight: 'bg-emerald-50',
      route: '/government-grants'
    }
  ];

  return (
    <div
      className="space-y-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500"
    >
      {/* Welcome Banner (Light Theme) */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 transform transition-all hover:scale-[1.01] duration-300">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-50/50 to-teal-50/50 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg shadow-slate-200 flex items-center justify-center text-primary-600 border border-slate-50">
                  <User className="w-10 h-10" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white rounded-full p-1.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-slate-500 text-sm font-bold tracking-wide uppercase">Welcome Back</p>
                  <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-extrabold border border-green-100 uppercase tracking-wider">Verified Citizen</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {user?.full_name || 'Valued User'}
                </h1>
                <p className="text-slate-500 text-base max-w-lg leading-relaxed">
                  Your unified dashboard for all government services. Track applications, manage documents, and explore new schemes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-slate-700 font-bold rounded-xl text-sm shadow-md hover:shadow-lg hover:bg-slate-50 transition-all border border-slate-100">
                View Profile
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all">
                New Application
              </button>
            </div>
          </div>

          {/* User Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-slate-100">
            {user?.city && (
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50/50 px-5 py-3 rounded-2xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-primary-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold">{user.city}</span>
              </div>
            )}
            {user?.mobile && (
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50/50 px-5 py-3 rounded-2xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-primary-500">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold">{maskMobile(user.mobile)}</span>
              </div>
            )}
            {user?.email && (
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50/50 px-5 py-3 rounded-2xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-primary-500">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold truncate">{maskEmail(user.email)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Applications', value: stats.applications, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
          { label: 'In Progress', value: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
          { label: 'Notifications', value: 2, icon: Bell, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
        ].map((stat, idx) => (
          <div key={idx} className={`bg-white p-6 rounded-[2rem] border ${stat.border} shadow-sm hover:shadow-xl transition-all hover:-translate-y-1`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-3xl font-extrabold ${stat.color}`}>{loading ? '...' : stat.value}</span>
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Services Section */}
      <div className="space-y-6">
        <div className="flex items-end justify-between px-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Explore Services</h2>
            <p className="text-slate-500 mt-1 font-medium">Select a category to begin your application process</p>
          </div>
          <Link to="/services" className="hidden sm:flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors bg-primary-50 px-4 py-2 rounded-xl">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainServices.map((service) => (
            <Link
              key={service.id}
              to={service.route}
              className="group relative overflow-hidden bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block h-full"
            >
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 rounded-full blur-[60px] -mr-10 -mt-10 transition-opacity`}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 ${service.bgLight} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                </div>

                <div className="mb-auto">
                  <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">{service.titleHindi}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">{service.description}</p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-primary-600 group-hover:gap-3 transition-all mt-auto pt-4 border-t border-slate-50">
                  Start Application <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How it Works / Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2.5rem] p-10 border border-indigo-100 relative overflow-hidden shadow-sm">
          {/* Decorative elements for light theme */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-16 -mt-16"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-indigo-100 text-indigo-600 text-xs font-extrabold uppercase tracking-wide">
                <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" /> New Feature
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">AI-Powered Document Processing</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Our new AI system automatically extracts data from your uploaded documents, reducing form filling time by up to 80%.
                </p>
              </div>
              <button className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5">
                Try it Now
              </button>
            </div>

            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-40 h-40 bg-white rounded-3xl shadow-xl shadow-indigo-200/50 flex items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-500">
                <Shield className="w-20 h-20 text-indigo-500" />
                <div className="absolute -bottom-4 -right-4 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  FAST
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6">Application Trends</h3>
            <div className="space-y-5">
              {[
                { label: 'Electricity', val: '75%', color: 'bg-amber-400', text: 'text-amber-600' },
                { label: 'Water', val: '45%', color: 'bg-blue-400', text: 'text-blue-600' },
                { label: 'Tax', val: '20%', color: 'bg-emerald-400', text: 'text-emerald-600' },
              ].map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                    <span>{t.label}</span>
                    <span className={t.text}>{t.val}</span>
                  </div>
                  <div className="w-full bg-slate-50 rounded-full h-2.5 overflow-hidden">
                    <div className={`h-full rounded-full ${t.color}`} style={{ width: t.val }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-8 py-3.5 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-800 transition-colors flex items-center justify-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4" /> View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
