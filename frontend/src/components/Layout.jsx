import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home, User, FileText, Settings, LogOut, Zap, Droplets,
  Menu, Bell, ChevronDown, HelpCircle, Search, Calendar
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Utility functions to mask user information
const maskEmail = (email) => {
  if (!email) return '';
  const atIndex = email.indexOf('@');
  if (atIndex > 0) {
    return '***' + email.substring(atIndex);
  }
  return '***@gmail.com';
};

const SidebarItem = ({ item, isActive }) => (
  <Link
    to={item.path}
    className={`relative flex items-center gap-3 px-4 py-3 my-1 rounded-xl transition-all duration-300 group overflow-hidden ${isActive
      ? 'bg-primary-50 text-primary-700 shadow-sm font-semibold'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
  >
    {isActive && (
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-full my-2 animate-pulse" />
    )}
    <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-500'}`} />
    <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
    {item.highlight && !isActive && (
      <span className="ml-auto text-[10px] font-bold bg-accent-500 text-white px-2 py-0.5 rounded-full shadow-sm shadow-accent-200 uppercase tracking-wide">
        New
      </span>
    )}
  </Link>
);

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/services', icon: Settings, label: 'All Services', highlight: true },
    { path: '/applications', icon: FileText, label: 'My Applications' },
    { path: '/documents', icon: FileText, label: 'Document Locker' },
    { path: '/profile', icon: User, label: 'Profile Settings' },
  ];

  const currentDate = new Date().toLocaleDateString('en-IN', { wd: 'short', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Blobs - CSS Animation */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-200/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/50' : 'bg-white/50 backdrop-blur-sm border-b border-white/20'}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className={`hidden md:flex justify-between items-center py-1 text-[11px] border-b ${scrolled ? 'border-slate-100' : 'border-slate-200/30'} transition-all`}>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-slate-600">
                <span>🇮🇳</span>
                <span className="font-semibold tracking-wide uppercase">Government of India</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">Ministry of Electronics & IT</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="font-medium hover:text-primary-600 cursor-pointer transition-colors">Skip to Main Content</span>
              <span>-A</span>
              <span>A</span>
              <span>+A</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {currentDate}</span>
            </div>
          </div>

          {/* Main Header Content */}
          <div className="py-3 flex justify-between items-center relative">
            <div className="flex items-center gap-4 lg:gap-8">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo & Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center relative overflow-hidden group hover:shadow-md transition-all duration-300">
                  <img src="/ashoka-emblem.webp" alt="Ashoka Emblem" className="w-8 h-8 md:w-9 md:h-9 object-contain relative z-10" />
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-lg md:text-xl font-bold text-slate-800 leading-tight tracking-tight">
                    Unified Services <span className="text-primary-600">Portal</span>
                  </h1>
                  <p className="text-[10px] md:text-xs text-slate-500 tracking-wide font-medium">EMPOWERING CITIZENS</p>
                </div>
              </div>
            </div>

            {/* Center Search Bar (Desktop) */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-100 focus:border-primary-400 sm:text-sm transition-all shadow-inner"
                  placeholder="Search services, documents, or information..."
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Quick Service Status Icons */}
              <div className="hidden xl:flex items-center gap-1 px-3 py-2 bg-slate-50/80 rounded-full border border-slate-200/60 backdrop-blur-sm">
                <div className="flex items-center gap-1 px-2 border-r border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-semibold text-slate-600">SYSTEM ONLINE</span>
                </div>
                <Zap className="w-4 h-4 text-slate-400 hover:text-yellow-500 transition-colors cursor-pointer" title="Electricity" />
                <Droplets className="w-4 h-4 text-slate-400 hover:text-blue-500 transition-colors cursor-pointer" title="Water" />
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 hover:bg-slate-100 rounded-full transition-colors group">
                <Bell className="w-5 h-5 text-slate-600 group-hover:text-primary-600 transition-colors" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 pl-2 pr-1 py-1 bg-white hover:bg-slate-50 rounded-full transition-all border border-slate-200 shadow-sm hover:shadow-md group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-primary-500/20 ring-2 ring-white">
                    {user?.full_name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden md:flex flex-col items-start mr-1">
                    <span className="text-xs font-bold text-slate-700 leading-none group-hover:text-primary-700 transition-colors">{user?.full_name?.split(' ')[0] || 'User'}</span>
                    <span className="text-[10px] text-slate-400 leading-none mt-0.5">Citizen</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${userMenuOpen ? 'rotate-180 text-primary-500' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/50 py-2 z-50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="px-5 py-4 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-800">{user?.full_name || 'User'}</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{maskEmail(user?.email)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">Verified</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-bold uppercase tracking-wider">Level 1</span>
                      </div>
                    </div>

                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-all group"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">My Profile</span>
                      </Link>
                      <Link
                        to="/documents"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-all group"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">My Documents</span>
                      </Link>
                    </div>

                    <div className="p-2 border-t border-slate-50">
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 w-full transition-all group"
                      >
                        <div className="p-1.5 rounded-lg bg-red-50 text-red-500 group-hover:bg-red-100 transition-colors">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-[50px] lg:pt-[110px]">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-[110px] left-0 h-[calc(100vh-110px)] z-30 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'} bg-white border-r border-slate-200/50 flex flex-col`}>
          <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
            {/* User Stat Card (Sidebar) */}
            <div className={`mb-8 p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/20 relative overflow-hidden transition-all ${sidebarOpen ? 'opacity-100 transform translate-x-0' : 'hidden'}`}>
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <img src="/ashoka-emblem.webp" className="w-24 h-24 grayscale invert" alt="" />
              </div>
              <p className="text-xs text-primary-100 font-medium mb-1">Welcome Citizen,</p>
              <p className="font-bold text-lg leading-tight mb-4">{user?.full_name || 'User'}</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-full bg-primary-800/50 rounded-full overflow-hidden">
                  <div className="h-full bg-white/90 w-[75%] rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-white">75%</span>
              </div>
              <p className="text-[10px] text-primary-200 mt-1">Profile Completion</p>
            </div>

            {/* Navigation Group */}
            <div className="mb-2 px-2">
              <p className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                Main Menu
              </p>
              {navItems.map((item) => (
                <SidebarItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>

            {/* Services Group */}
            <div className="mt-6 mb-2 px-2">
              <p className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                Utilities
              </p>
              <Link to="/electricity" className="flex items-center gap-3 px-4 py-2.5 my-1 rounded-xl text-slate-600 hover:bg-yellow-50 hover:text-yellow-700 transition-colors group">
                <div className="w-5 h-5 rounded flex items-center justify-center bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 transition-colors">
                  <Zap className="w-3 h-3" />
                </div>
                {sidebarOpen && <span className="text-sm font-medium">Electricity</span>}
              </Link>
              <Link to="/water" className="flex items-center gap-3 px-4 py-2.5 my-1 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors group">
                <div className="w-5 h-5 rounded flex items-center justify-center bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                  <Droplets className="w-3 h-3" />
                </div>
                {sidebarOpen && <span className="text-sm font-medium">Water Supply</span>}
              </Link>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <Link
              to="/support"
              className={`flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 shadow-sm rounded-xl hover:shadow-md hover:border-primary-200 transition-all group ${sidebarOpen ? '' : 'justify-center px-2'}`}
            >
              <div className="bg-primary-50 p-2 rounded-lg text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
              </div>
              {sidebarOpen && (
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Need Help?</span>
                  <span className="text-xs text-slate-500">24/7 Support</span>
                </div>
              )}
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-transparent min-h-screen px-4 pb-12 overflow-x-hidden">
          <div className="max-w-7xl mx-auto pt-6 pb-20">
            {/* Removed AnimatePresence to prevent crash if framer-motion is broken */}
            <div key={location.pathname} className="animate-in fade-in duration-300">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
