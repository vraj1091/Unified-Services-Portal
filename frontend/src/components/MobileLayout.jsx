import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home, FileText, User, Menu, X, Bell, Shield,
  Zap, Flame, Droplets, Building, ChevronRight, LogOut, Search
} from 'lucide-react';
import { useState } from 'react';

// Utility function to mask user email
const maskEmail = (email) => {
  if (!email) return '';
  const atIndex = email.indexOf('@');
  if (atIndex > 0) {
    return '***' + email.substring(atIndex);
  }
  return '***@gmail.com';
};

const MobileLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const bottomNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/services', icon: Menu, label: 'Services' },
    { path: '/applications', icon: FileText, label: 'Apps' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const quickServices = [
    { name: 'Electricity', nameHi: 'बिजली', icon: Zap, color: 'bg-amber-500', path: '/electricity' },
    { name: 'Gas', nameHi: 'गैस', icon: Flame, color: 'bg-orange-500', path: '/gas' },
    { name: 'Water', nameHi: 'पानी', icon: Droplets, color: 'bg-blue-500', path: '/water' },
    { name: 'Property', nameHi: 'संपत्ति', icon: Building, color: 'bg-emerald-500', path: '/property' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative pb-24">
      {/* Mobile Header - Glassmorphism */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo & Greeting */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Welcome</p>
                <h1 className="text-sm font-bold text-slate-800">{user?.full_name?.split(' ')[0] || 'User'}</h1>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Search Bar - Fake */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search for services..."
              className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-500/20 text-slate-700 placeholder:text-slate-400"
              readOnly
            />
          </div>
        </div>
      </header>

      {/* Quick Services Row */}
      <div className="px-4 mt-4">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {quickServices.map((service) => (
            <button
              key={service.path}
              onClick={() => navigate(service.path)}
              className="flex-shrink-0 bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center gap-2 min-w-[80px] shadow-sm active:scale-95 transition-transform"
            >
              <div className={`w-10 h-10 ${service.color} rounded-full flex items-center justify-center shadow-md`}>
                <service.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-medium text-slate-700">{service.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 animate-in fade-in duration-300">
        <Outlet />
      </main>

      {/* Bottom Navigation - Updated */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-40 lg:hidden">
        <div className="flex items-center justify-around px-2 py-3">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-300 w-16`}
              >
                {isActive && (
                  <div className="absolute -top-3 w-8 h-1 bg-primary-600 rounded-b-lg" />
                )}
                <Icon className={`w-6 h-6 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                <span className={`text-[10px] font-medium ${isActive ? 'text-primary-600' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Side Drawer - Removed framer-motion */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer */}
          <div
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-slate-50 z-50 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-300"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mt-6 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-xl font-bold border-4 border-white/10 shadow-xl">
                  {user?.full_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{user?.full_name || 'User'}</h2>
                  <p className="text-xs text-slate-400">{maskEmail(user?.email)}</p>
                  <div className="mt-2 text-[10px] uppercase font-bold tracking-widest text-primary-400 bg-primary-900/50 px-2 py-0.5 rounded w-fit">Verified Citizen</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Quick Actions */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Account</h4>
                <Link to="/profile" onClick={() => setDrawerOpen(false)} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm mb-2 active:scale-98 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">My Profile</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link to="/documents" onClick={() => setDrawerOpen(false)} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm mb-2 active:scale-98 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">My Documents</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Logout */}
              <div>
                <button
                  onClick={() => {
                    logout();
                    setDrawerOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-semibold text-sm hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
};

export default MobileLayout;
