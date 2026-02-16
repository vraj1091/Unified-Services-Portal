import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  Zap, Flame, Droplets, Building, ArrowLeft, Upload,
  User, Phone, Mail, MapPin, FileText, Calendar,
  AlertCircle, CheckCircle, Info, Sparkles, Play, ChevronRight, Home, Shield
} from 'lucide-react';
import axios from '../api/axios';

const NameChangeApplication = () => {
  const { serviceType } = useParams();
  const [searchParams] = useSearchParams();
  const providerId = searchParams.get('provider');

  const [formData, setFormData] = useState({
    city: 'Ahmedabad',
    serviceNumber: '',
    tNumber: '',
    mobile: '',
    email: '',
    confirmEmail: '',
    currentName: '',
    newName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    pincode: '',
    connectionNumber: '',
    connectionType: '',
    registeredAddress: '',
    identityProof: null,
    addressProof: null,
    nameChangeProof: null,
    connectionBill: null,
    applicationNumber: '',
    subdivisionCode: '',
    consumerCategory: '',
    loadSanctioned: '',
    aadhaarNumber: '',
    rationCardNumber: '',
    customerID: '',
    accountNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAutomation, setShowAutomation] = useState(false);
  const [automationCompleted, setAutomationCompleted] = useState(false);
  const [automationResult, setAutomationResult] = useState(null);

  const serviceConfig = {
    electricity: {
      name: 'Electricity',
      nameHindi: 'बिजली',
      icon: Zap,
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'shadow-amber-500/30',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    gas: {
      name: 'Gas',
      nameHindi: 'गैस',
      icon: Flame,
      gradient: 'from-red-400 to-pink-600',
      shadow: 'shadow-red-500/30',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    water: {
      name: 'Water',
      nameHindi: 'पानी',
      icon: Droplets,
      gradient: 'from-blue-400 to-cyan-500',
      shadow: 'shadow-blue-500/30',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    property: {
      name: 'Property',
      nameHindi: 'संपत्ति',
      icon: Building,
      gradient: 'from-emerald-400 to-green-600',
      shadow: 'shadow-green-500/30',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    }
  };

  const providerConfig = {
    'pgvcl': {
      name: 'PGVCL', nameHindi: 'पीजीवीसीएल', type: 'Government', service: 'electricity',
      requiredFields: ['currentName', 'newName', 'connectionNumber', 'aadhaarNumber', 'mobile', 'email'],
      specificFields: ['subdivisionCode', 'consumerCategory'],
      documents: ['identityProof', 'addressProof', 'nameChangeProof', 'connectionBill'],
      processingTime: '7-15 days', fees: 'As per GERC tariff'
    },
    'ugvcl': {
      name: 'UGVCL', nameHindi: 'यूजीवीसीएल', type: 'Government', service: 'electricity',
      requiredFields: ['currentName', 'newName', 'connectionNumber', 'aadhaarNumber', 'mobile'],
      specificFields: ['subdivisionCode', 'loadSanctioned'],
      documents: ['identityProof', 'addressProof', 'nameChangeProof', 'connectionBill'],
      processingTime: '10-20 days', fees: 'Government prescribed fees'
    },
    'mgvcl': {
      name: 'MGVCL', nameHindi: 'एमजीवीसीएल', type: 'Government', service: 'electricity',
      requiredFields: ['currentName', 'newName', 'connectionNumber', 'aadhaarNumber', 'mobile'],
      specificFields: ['subdivisionCode', 'consumerCategory'],
      documents: ['identityProof', 'addressProof', 'nameChangeProof', 'connectionBill'],
      processingTime: '7-15 days', fees: 'As per GERC tariff'
    },
    'dgvcl': {
      name: 'DGVCL', nameHindi: 'डीजीवीसीएल', type: 'Government', service: 'electricity',
      requiredFields: ['currentName', 'newName', 'connectionNumber', 'aadhaarNumber', 'mobile'],
      specificFields: ['subdivisionCode', 'consumerCategory'],
      documents: ['identityProof', 'addressProof', 'nameChangeProof', 'connectionBill'],
      processingTime: '7-15 days', fees: 'Government prescribed fees'
    },
    'torrent-power': {
      name: 'Torrent Power', nameHindi: 'टॉरेंट पावर', type: 'Private', service: 'electricity',
      requiredFields: ['serviceNumber', 'tNumber', 'mobile', 'email', 'confirmEmail'],
      specificFields: ['city'],
      documents: [],
      processingTime: '5-10 days', fees: 'Rs. 100 + taxes', aiSupported: true,
      portalUrl: 'https://connect.torrentpower.com/tplcp/application/namechangerequest'
    },
    'gujarat-gas': {
      name: 'Gujarat Gas Ltd', nameHindi: 'गुजरात गैस लिमिटेड', type: 'Government', service: 'gas',
      requiredFields: ['currentName', 'newName', 'connectionNumber', 'aadhaarNumber', 'mobile'],
      specificFields: ['consumerCategory', 'registeredAddress'],
      documents: ['identityProof', 'addressProof', 'nameChangeProof', 'connectionBill'],
      processingTime: '10-20 days', fees: 'Government prescribed fees'
    },
    'adani-gas': {
      name: 'Adani Total Gas Ltd', nameHindi: 'अदानी टोटल गैस लिमिटेड', type: 'Private', service: 'gas',
      requiredFields: ['currentName', 'newName', 'customerID', 'mobile', 'email'],
      specificFields: ['accountNumber', 'connectionType'],
      documents: ['identityProof', 'addressProof', 'nameChangeProof', 'connectionBill'],
      processingTime: '3-7 days', fees: 'Rs. 200 + taxes'
    },
    'amc-water': {
      name: 'AMC Water', nameHindi: 'एएमसी जल विभाग', type: 'Government', service: 'water',
      requiredFields: ['currentName', 'newName', 'connectionNumber', 'aadhaarNumber', 'mobile'],
      specificFields: ['wardNumber', 'propertyNumber'],
      documents: ['identityProof', 'addressProof', 'nameChangeProof', 'connectionBill'],
      processingTime: '15-30 days', fees: 'Municipal prescribed fees'
    },
    'anyror': {
      name: 'AnyRoR (Revenue Dept)', nameHindi: 'एनीआरओआर (राजस्व विभाग)', type: 'Government', service: 'property',
      requiredFields: ['currentName', 'newName', 'aadhaarNumber', 'mobile', 'fatherName'],
      specificFields: ['surveyNumber', 'villageCode', 'talukaCode'],
      documents: ['identityProof', 'addressProof', 'nameChangeProof', 'propertyDocuments'],
      processingTime: '30-60 days', fees: 'Revenue department fees'
    }
  };

  const provider = providerConfig[providerId];
  const service = serviceConfig[serviceType];
  const Icon = service?.icon;

  if (!provider || !service) {
    return <div className="p-8 text-center text-slate-500">Provider or service not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (providerId === 'torrent-power') {
      const requiredFields = ['serviceNumber', 'tNumber', 'mobile', 'email', 'confirmEmail'];
      requiredFields.forEach(field => {
        if (!formData[field]?.trim()) newErrors[field] = 'This field is required';
      });
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (formData.email && formData.confirmEmail && formData.email.trim() !== formData.confirmEmail.trim()) {
        newErrors.confirmEmail = 'Email addresses do not match';
      }
      if (formData.mobile && !/^[0-9]{10}$/.test(formData.mobile.trim())) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    } else {
      provider.requiredFields.forEach(field => {
        if (!formData[field]?.trim()) newErrors[field] = 'This field is required';
      });
      provider.documents.forEach(doc => {
        if (!formData[doc]) newErrors[doc] = 'This document is required';
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (providerId === 'torrent-power' && provider.aiSupported) {
      setShowAutomation(true);
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Application submitted successfully for ${provider.name}! You will receive a confirmation email shortly.`);
    } catch (error) {
      alert('Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (fieldName, label, type = 'text', required = false) => {
    const isRequired = provider.requiredFields.includes(fieldName) || required;
    return (
      <div key={fieldName} className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <input
            type={type}
            name={fieldName}
            value={formData[fieldName]}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800 ${errors[fieldName] ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-primary-500'}`}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        </div>

        {errors[fieldName] && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors[fieldName]}
          </p>
        )}
      </div>
    );
  };

  const renderFileUpload = (fieldName, label, accept = '.pdf,.jpg,.jpeg,.png') => {
    const isRequired = provider.documents.includes(fieldName);
    const hasFile = !!formData[fieldName];

    return (
      <div key={fieldName} className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${errors[fieldName] ? 'border-red-300 bg-red-50' :
          hasFile ? 'border-green-300 bg-green-50' : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50'
          }`}>
          <input
            type="file"
            name={fieldName}
            onChange={handleFileChange}
            accept={accept}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id={fieldName}
          />

          {hasFile ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <p className="text-green-700 font-medium text-sm truncate max-w-full px-4">{formData[fieldName].name}</p>
              <p className="text-xs text-green-600">Click to change file</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-slate-600 font-medium text-sm">Click to upload or drag & drop</p>
              <p className="text-xs text-slate-400">PDF, JPG, PNG (Max 5MB)</p>
            </div>
          )}
        </div>
        {errors[fieldName] && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors[fieldName]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary-600 flex items-center gap-1 transition-colors">
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/service-facilities/${serviceType}`} className="hover:text-primary-600 capitalize">{serviceType}</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/service-providers/${serviceType}/name-change`} className="hover:text-primary-600">Providers</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 font-medium">Application</span>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden flex flex-wrap items-center gap-8 animate-in slide-in-from-bottom-5 duration-700">
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none`}></div>

          <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg ${service.shadow} flex-shrink-0`}>
            <Icon className="w-10 h-10 text-white" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-slate-900">{service.name} Name Change</h1>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${provider.type === 'Government' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
                {provider.type}
              </span>
            </div>
            <p className="text-slate-500 text-lg mb-1">{service.nameHindi} नाम परिवर्तन आवेदन</p>
            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
              <Building className="w-4 h-4" /> Provider: <span className="text-slate-700">{provider.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Info Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-5 duration-500 delay-100">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Processing Time</p>
            <p className="text-slate-800 font-bold">{provider.processingTime}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Application Fees</p>
            <p className="text-slate-800 font-bold">{provider.fees}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Secure Process</p>
            <p className="text-slate-800 font-bold">Encrypted Data</p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 duration-700 delay-200">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Application Form</h2>
          <p className="text-slate-500 text-sm">Please fill in the details correctly as per your documents.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">

          {/* Torrent Power Specific Flow */}
          {providerId === 'torrent-power' ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-700">Service Connection Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">City <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800 appearance-none"
                    >
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Surat">Surat</option>
                      <option value="Gandhinagar">Gandhinagar</option>
                      <option value="Bhavnagar">Bhavnagar</option>
                    </select>
                  </div>
                </div>

                {renderField('serviceNumber', 'Service Number', 'text', true)}
                {renderField('tNumber', 'T No (Transaction Number)', 'text', true)}
                {renderField('mobile', 'Mobile Number', 'tel', true)}
                {renderField('email', 'Email Address', 'email', true)}
                {renderField('confirmEmail', 'Confirm Email Address', 'email', true)}
              </div>
            </div>
          ) : (
            // Generic Form Flow
            <>
              {/* Personal Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-700">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField('currentName', 'Current Name (as per bill)')}
                  {renderField('newName', 'New Name (desired)')}
                  {renderField('fatherName', "Father's/Check Name")}
                  {renderField('dateOfBirth', 'Date of Birth', 'date')}

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Gender <span className="text-red-500">*</span></label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-slate-800"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-700">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField('mobile', 'Mobile Number', 'tel')}
                  {renderField('email', 'Email Address', 'email')}
                  {renderField('address', 'Current Address')}
                  {renderField('pincode', 'PIN Code')}
                </div>
              </div>

              {/* Connection Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-700">Connection Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField('connectionNumber', 'Consumer Number')}
                  {provider.type === 'Government' && renderField('aadhaarNumber', 'Aadhaar Number')}

                  {/* Dynamic Fields */}
                  {provider.specificFields.map(field => (
                    renderField(field, field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-700">Required Documents</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {provider.documents.includes('identityProof') &&
                    renderFileUpload('identityProof', 'Identity Proof (Aadhaar/PAN)')}
                  {provider.documents.includes('addressProof') &&
                    renderFileUpload('addressProof', 'Address Proof (Ration Card/Bill)')}
                  {provider.documents.includes('nameChangeProof') &&
                    renderFileUpload('nameChangeProof', 'Proof of Name Change')}
                  {provider.documents.includes('connectionBill') &&
                    renderFileUpload('connectionBill', 'Latest Bill Copy')}
                </div>
              </div>
            </>
          )}

          {/* Submit Action */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <Link
              to={`/service-providers/${serviceType}/name-change`}
              className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 ${providerId === 'torrent-power' && provider.aiSupported
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-purple-500/30'
                : 'bg-primary-600 hover:bg-primary-700 shadow-primary-500/30'
                }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {providerId === 'torrent-power' && provider.aiSupported ? <Sparkles className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                  {providerId === 'torrent-power' && provider.aiSupported ? 'Start AI Auto-Fill' : 'Submit Application'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameChangeApplication;