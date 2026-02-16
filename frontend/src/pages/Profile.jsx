import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Save, User, Shield, Phone, Mail, MapPin, Calendar, CreditCard, FileText, Building, Users, ArrowLeft, Home, ChevronRight } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile: '',
    aadhaar_number: '',
    pan_number: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    date_of_birth: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        aadhaar_number: user.aadhaar_number || '',
        pan_number: user.pan_number || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
        date_of_birth: user.date_of_birth || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.put('/users/profile', formData);
      await fetchUser();
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
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
          <span className="text-slate-800 font-medium">My Profile</span>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden animate-in slide-in-from-bottom-5 duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-60 pointer-events-none"></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">My Profile</h1>
              <p className="text-slate-500">
                Manage your personal information and documents for government services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 shadow-sm animate-in slide-in-from-top-2 duration-300 ${message.includes('success')
          ? 'bg-green-50 text-green-700 border-green-200'
          : 'bg-red-50 text-red-700 border-red-200'}`}
        >
          <div className={`p-1.5 rounded-full ${message.includes('success') ? 'bg-green-100' : 'bg-red-100'}`}>
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-medium text-sm">{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-500 delay-100">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Personal Information</h2>
                <p className="text-xs text-slate-500">Basic details required for all services</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800" placeholder="Enter your full name" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} placeholder="DD/MM/YYYY" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-500 delay-200">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Contact Information</h2>
                <p className="text-xs text-slate-500">Communication details for service updates</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium" placeholder="your.email@example.com" disabled />
                </div>
                <p className="text-xs text-slate-400 ml-1">Email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required maxLength={10} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800" placeholder="10-digit mobile number" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Government Documents */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-500 delay-300">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Government Documents</h2>
                <p className="text-xs text-slate-500">Required for government service applications</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Aadhaar Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" name="aadhaar_number" value={formData.aadhaar_number} onChange={handleChange} maxLength={12} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800" placeholder="12-digit Aadhaar number" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">PAN Number</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" name="pan_number" value={formData.pan_number} onChange={handleChange} maxLength={10} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800" placeholder="10-character PAN number" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-500 delay-400">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Address Information</h2>
                <p className="text-xs text-slate-500">Residential address for service connections</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Complete Address</label>
                <div className="relative">
                  <Building className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800 resize-none" placeholder="House/Flat No., Street, Area, Landmark" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800" placeholder="Enter city" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800" placeholder="Enter state" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Pincode</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} maxLength={6} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800" placeholder="6-digit pincode" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex items-center justify-between sticky bottom-4 z-10 transition-all hover:shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Save Changes</h3>
            <p className="text-sm text-slate-500">Update your profile information</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 active:scale-[0.98] transition-all"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
