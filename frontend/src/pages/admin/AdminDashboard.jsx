import React from 'react';
import { Users, FileText, Settings, LogOut, BarChart3, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white p-6 z-20 hidden md:block">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">A</div>
                    <span className="text-lg font-bold">Admin Portal</span>
                </div>

                <nav className="space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-xl text-white font-medium">
                        <BarChart3 className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link to="/admin/applications" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-colors">
                        <FileText className="w-5 h-5" /> Applications
                    </Link>
                    <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-colors">
                        <Users className="w-5 h-5" /> Users
                    </Link>
                    <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-colors">
                        <Settings className="w-5 h-5" /> Settings
                    </Link>
                </nav>

                <button onClick={handleLogout} className="absolute bottom-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 bg-white rounded-full shadow-sm text-slate-600 hover:bg-slate-50">
                            <Bell className="w-5 h-5" />
                        </button>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                            AD
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-bottom-5 duration-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><FileText className="w-6 h-6" /></div>
                            <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg">+12%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">1,245</h3>
                        <p className="text-slate-500">Total Applications</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-bottom-5 duration-500 delay-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-50 rounded-xl text-purple-600"><Users className="w-6 h-6" /></div>
                            <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg">+5%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">8,504</h3>
                        <p className="text-slate-500">Active Users</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-bottom-5 duration-500 delay-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-orange-50 rounded-xl text-orange-600"><BarChart3 className="w-6 h-6" /></div>
                            <span className="text-slate-400 text-sm font-medium">This Month</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">94%</h3>
                        <p className="text-slate-500">Processing Rate</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center py-20">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Settings className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Admin Modules Loading...</h3>
                    <p className="text-slate-500">Full admin functionality is currently being implemented.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
