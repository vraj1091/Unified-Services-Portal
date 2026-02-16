import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight, Filter, Plus, Zap, Flame, Droplets, Building, ArrowLeft, Home, ChevronRight, Search } from 'lucide-react';

const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/applications/');
      setApplications(response.data || []);
    } catch (error) {
      console.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'submitted': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'pending':
      case 'processing': return <Clock className="w-5 h-5 text-amber-500" />;
      default: return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'submitted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
      case 'processing': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'electricity': return <Zap className="w-5 h-5 text-white" />;
      case 'gas': return <Flame className="w-5 h-5 text-white" />;
      case 'water': return <Droplets className="w-5 h-5 text-white" />;
      case 'property': return <Building className="w-5 h-5 text-white" />;
      default: return <FileText className="w-5 h-5 text-white" />;
    }
  };

  const getServiceColor = (serviceType) => {
    switch (serviceType) {
      case 'electricity': return 'from-amber-400 to-orange-500 shadow-amber-500/30';
      case 'gas': return 'from-red-400 to-pink-600 shadow-red-500/30';
      case 'water': return 'from-blue-400 to-cyan-500 shadow-blue-500/30';
      case 'property': return 'from-emerald-400 to-green-600 shadow-green-500/30';
      default: return 'from-slate-400 to-slate-600 shadow-slate-500/30';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary-600 flex items-center gap-1 transition-colors">
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 font-medium">My Applications</span>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden flex flex-wrap items-center justify-between gap-6 animate-in slide-in-from-bottom-5 duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-60 pointer-events-none"></div>

          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">My Applications</h1>
              <p className="text-slate-500">
                Track status and history of all your service requests.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex gap-3">
            <Link
              to="/services"
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <Plus className="w-5 h-5" />
              New Application
            </Link>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 duration-[800ms] delay-100">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Applications</h2>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search ID..."
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 outline-none w-40 md:w-64"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading applications...</p>
              </div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Applications Found</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">You haven't submitted any applications yet. Start by exploring our services and applying for what you need.</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-600/30"
              >
                <Plus className="w-5 h-5" />
                Apply for Service
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app, index) => (
                <div
                  key={app.id}
                  className="group border border-slate-100 rounded-2xl p-5 hover:shadow-lg hover:border-primary-100 transition-all cursor-pointer bg-white animate-in slide-in-from-bottom-3 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 w-12 h-12 bg-gradient-to-br ${getServiceColor(app.service_type)} rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                        {getServiceIcon(app.service_type)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-bold text-slate-800 capitalize group-hover:text-primary-700 transition-colors">
                            {app.service_type} <span className="text-slate-400 font-normal">/</span> {app.application_type}
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-slate-500">
                          <span className="font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-100">ID: {app.id}</span>
                          <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5" />Provider: <span className="font-medium text-slate-700">{app.provider || 'N/A'}</span></span>
                        </div>
                        <div className="pt-2 text-xs text-slate-400 flex items-center gap-4">
                          <span>Submitted: {formatDate(app.submitted_at)}</span>
                          {app.updated_at && (
                            <span>Updated: {formatDate(app.updated_at)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                      <div className="flex items-center gap-2 md:hidden">
                        {getStatusIcon(app.status)}
                        <span className="text-sm font-medium capitalize text-slate-600">{app.status}</span>
                      </div>
                      <button className="flex items-center gap-2 text-primary-600 font-bold text-sm bg-primary-50 px-4 py-2 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-all">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;