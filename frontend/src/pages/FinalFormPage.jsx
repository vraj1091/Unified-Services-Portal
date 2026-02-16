import { useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Loader, AlertCircle, Home, ChevronRight, Play, Shield, Info } from 'lucide-react';

const FinalFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceType, providerId, serviceId } = useParams();

  const { extractedData } = location.state || {};

  const getBackUrl = () => {
    if (serviceId) {
      return `/company-formation/${serviceId}/document-upload`;
    } else if (serviceType && providerId) {
      return `/utility-services/${serviceType}/${providerId}/document-upload`;
    } else {
      return '/';
    }
  };

  const backUrl = getBackUrl();

  const [formData, setFormData] = useState({
    name: extractedData?.identityProof?.name || '',
    address: extractedData?.identityProof?.address || extractedData?.addressProof?.address || '',
    serviceNumber: extractedData?.addressProof?.serviceNumber || '',
    oldName: extractedData?.nameChangeProof?.oldName || '',
    newName: extractedData?.nameChangeProof?.newName || '',
    mobile: '',
    email: '',
    confirmEmail: '',
    city: 'Ahmedabad',
    tNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mobile || formData.mobile.length < 10) newErrors.mobile = 'Valid 10-digit mobile number required';
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Valid email address required';
    if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Email addresses do not match';
    if (providerId === 'torrent-power' && !formData.tNumber) newErrors.tNumber = 'T Number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    navigate('/applications', {
      state: {
        success: true,
        message: 'Application submitted successfully!',
        formData: formData
      }
    });
  };

  const providerNames = {
    'torrent-power': 'Torrent Power',
    'pgvcl': 'PGVCL',
    'ugvcl': 'UGVCL',
    'mgvcl': 'MGVCL',
    'dgvcl': 'DGVCL',
    'gujarat-gas': 'Gujarat Gas',
    'adani-gas': 'Adani Gas',
    'amc-water': 'AMC Water',
    'anyror': 'AnyRoR'
  };

  const providerName = providerNames[providerId] || 'Provider';

  const renderField = (name, label, type = 'text', disabled = false, placeholder = '') => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label} {!disabled && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl outline-none transition-all font-medium ${disabled
            ? 'bg-slate-50 border border-slate-200 text-slate-500 cursor-not-allowed'
            : `bg-white border ${errors[name] ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-primary-500'} focus:ring-4 focus:ring-primary-500/10 text-slate-800`
            }`}
        />
        {disabled && <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
      </div>

      {disabled ? (
        <p className="text-xs text-green-600 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Pre-filled from documents
        </p>
      ) : errors[name] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Navigation */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary-600 flex items-center gap-1 transition-colors">
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/service-facilities/${serviceType}`} className="hover:text-primary-600 capitalize">{serviceType}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 font-medium">Final Review</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Form Area */}
        <div className="w-full lg:w-2/3 space-y-6 animate-in slide-in-from-bottom-5 duration-700">

          {/* Success Banner */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex gap-4">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 mb-1">Documents Processed Successfully</h3>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Our AI has successfully verified your documents and pre-filled the application form below. Please review the details and complete the remaining fields.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Application Details</h2>
                <p className="text-slate-500 text-sm">Review & Submit</p>
              </div>
              <div className="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-xs font-bold border border-primary-100 uppercase">
                {providerName}
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Pre-filled Section */}
              <div className="space-y-6">
                <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Shield className="w-4 h-4 text-emerald-500" /> Verified Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField('name', 'Current Name', 'text', true)}
                  {renderField('newName', 'New Name', 'text', true)}
                  {renderField('serviceNumber', 'Service Number', 'text', true)}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Address</label>
                    <div className="relative">
                      <textarea
                        value={formData.address}
                        disabled
                        rows="2"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed resize-none font-medium"
                      />
                      <CheckCircle className="absolute right-4 top-4 w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Pre-filled from documents
                    </p>
                  </div>
                </div>
              </div>

              {/* Manual Entry Section */}
              <div className="space-y-6">
                <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Info className="w-4 h-4 text-primary-500" /> Missing Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {providerId === 'torrent-power' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">City <span className="text-red-500">*</span></label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800"
                        >
                          <option value="Ahmedabad">Ahmedabad</option>
                          <option value="Surat">Surat</option>
                          <option value="Gandhinagar">Gandhinagar</option>
                          <option value="Bhavnagar">Bhavnagar</option>
                        </select>
                      </div>
                      {renderField('tNumber', 'T Number', 'text', false, 'Enter T Number')}
                    </>
                  )}
                  {renderField('mobile', 'Mobile Number', 'tel', false, '10-digit number')}
                  {renderField('email', 'Email Address', 'email', false, 'john@example.com')}
                  {renderField('confirmEmail', 'Confirm Email', 'email', false, 'Re-enter email')}
                </div>
              </div>

              {/* Submit Actions */}
              <div className="pt-6 flex items-center justify-between gap-4 border-t border-slate-100">
                <Link
                  to={backUrl}
                  className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Back
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-1/3 space-y-6 animate-in slide-in-from-bottom-10 duration-700 delay-200">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
            <h3 className="font-bold text-slate-800 mb-4">Application Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Service</span>
                <span className="font-medium text-slate-800 capitalize">{serviceType?.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Provider</span>
                <span className="font-medium text-slate-800">{providerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Processing Time</span>
                <span className="font-medium text-slate-800">5-10 Days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Application Fee</span>
                <span className="font-medium text-slate-800">₹ 100.00</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700 mb-6">
              <p className="font-semibold mb-1">Next Steps:</p>
              <ul className="list-disc pl-4 space-y-1 opacity-80">
                <li>Application Submission</li>
                <li>Fee Payment</li>
                <li>Provider Verification</li>
                <li>Completion</li>
              </ul>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
              <Shield className="w-3 h-3" /> Secure SSL Connection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalFormPage;
