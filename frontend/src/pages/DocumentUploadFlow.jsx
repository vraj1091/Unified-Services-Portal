import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Upload, CheckCircle, FileText,
  Loader, AlertCircle, Eye, Edit, ArrowRight, Home, ChevronRight, Sparkles, Shield
} from 'lucide-react';

const DocumentUploadFlow = () => {
  const { serviceType, providerId, serviceId } = useParams();
  const navigate = useNavigate();

  const getBackUrl = () => {
    if (serviceId) {
      return '/company-formation';
    } else if (serviceType && providerId) {
      return `/service-providers/${serviceType}/name-change`;
    } else {
      return '/';
    }
  };

  const backUrl = getBackUrl();

  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);

  const [documents, setDocuments] = useState({
    identityProof: null,
    addressProof: null,
    nameChangeProof: null
  });

  const [extractedData, setExtractedData] = useState({});

  const steps = [
    {
      id: 1,
      title: 'Identity Proof',
      titleHindi: 'पहचान प्रमाण',
      description: 'Upload Aadhaar, PAN, or Passport',
      documentType: 'identityProof',
      icon: Shield,
    },
    {
      id: 2,
      title: 'Address Proof',
      titleHindi: 'पता प्रमाण',
      description: 'Utility Bill, Ration Card, or Bank Statement',
      documentType: 'addressProof',
      icon: Home,
    },
    {
      id: 3,
      title: 'Name Change Proof',
      titleHindi: 'नाम परिवर्तन प्रमाण',
      description: 'Marriage Certificate, Gazette, or Affidavit',
      documentType: 'nameChangeProof',
      icon: FileText,
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setDocuments(prev => ({ ...prev, [currentStepData.documentType]: file }));
    setUploading(false);

    setExtracting(true);
    await new Promise(resolve => setTimeout(resolve, 2500));

    const mockData = {
      identityProof: {
        name: 'Rajesh Kumar',
        dob: '1990-08-15',
        idNumber: '1234-5678-9012'
      },
      addressProof: {
        address: 'B-404, Ganesh Glory, SG Highway',
        city: 'Ahmedabad',
        pincode: '382481'
      },
      nameChangeProof: {
        oldName: 'Rajesh Kumar',
        newName: 'Rajesh Kumar Patel',
        dateOfChange: '2025-01-01'
      }
    };

    setExtractedData(prev => ({
      ...prev,
      [currentStepData.documentType]: mockData[currentStepData.documentType]
    }));
    setExtracting(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate(`/utility-services/${serviceType}/${providerId}/final-form`, {
        state: { extractedData, documents }
      });
    }
  };

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
          <span className="text-slate-800 font-medium">Document Upload</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Stepper */}
        <div className="w-full lg:w-1/3 space-y-6 animate-in slide-in-from-left-5 duration-700">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
            <h2 className="text-xl font-bold text-slate-800 mb-6 relative z-10">Upload Progress</h2>

            <div className="space-y-6 relative z-10">
              {steps.map((step, idx) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                const StepIcon = step.icon;

                return (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? 'bg-green-500 border-green-500 text-white' :
                        isActive ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30' :
                          'bg-white border-slate-200 text-slate-400'
                        }`}>
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                      </div>
                      {idx !== steps.length - 1 && (
                        <div className={`w-0.5 h-full mt-2 rounded-full ${isCompleted ? 'bg-green-200' : 'bg-slate-100'}`}></div>
                      )}
                    </div>
                    <div className={`pb-8 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                      <h3 className={`font-bold text-sm ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>{step.title}</h3>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{step.titleHindi}</p>
                      <p className="text-xs text-slate-500 mt-1">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 blur-3xl opacity-20 rounded-full pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="font-bold">AI-Powered Extraction</h3>
                <p className="text-xs text-indigo-200">Processing your documents</p>
              </div>
            </div>
            <p className="text-sm text-indigo-100 leading-relaxed mb-4 relative z-10">
              Our AI automatically extracts details from your uploaded documents to fill the application form for you.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-full w-fit border border-emerald-500/20">
              <Shield className="w-3 h-3" /> Secure & Encrypted
            </div>
          </div>
        </div>

        {/* Right Side: Upload Area */}
        <div className="w-full lg:w-2/3 animate-in slide-in-from-right-5 duration-700">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
            <div className="p-8 border-b border-slate-100">
              <h1 className="text-2xl font-bold text-slate-800 mb-1">{currentStepData.title}</h1>
              <p className="text-slate-500">{currentStepData.description}</p>
            </div>

            <div className="p-8 flex-1 flex flex-col items-center justify-center min-h-[400px]">
              {extracting ? (
                <div className="text-center animate-in zoom-in-95 duration-300">
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-primary-500 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing Document...</h3>
                  <p className="text-slate-500">Our AI is reading the details.</p>
                </div>
              ) : extractedData[currentStepData.documentType] ? (
                <div className="w-full max-w-md animate-in zoom-in-95 duration-300">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-800 mb-1">Upload Successful!</h3>
                    <p className="text-sm text-emerald-600">Data extracted automatically.</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-slate-400" /> Extracted Data
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(extractedData[currentStepData.documentType]).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-sm">
                          <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-semibold text-slate-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setDocuments(prev => ({ ...prev, [currentStepData.documentType]: null }));
                        setExtractedData(prev => ({ ...prev, [currentStepData.documentType]: null }));
                      }}
                      className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      Re-upload
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-xl animate-in zoom-in-95 duration-300">
                  <label
                    htmlFor="file-upload"
                    className={`relative flex flex-col items-center justify-center w-full h-80 border-3 border-dashed rounded-3xl cursor-pointer transition-all duration-300 group ${uploading ? 'border-primary-300 bg-primary-50' : 'border-slate-300 hover:border-primary-500 hover:bg-slate-50'
                      }`}
                  >
                    <div className="relative z-10 flex flex-col items-center text-center p-8">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${uploading ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400 group-hover:bg-primary-100 group-hover:text-primary-600 group-hover:scale-110'
                        }`}>
                        {uploading ? <Loader className="w-10 h-10 animate-spin" /> : <Upload className="w-10 h-10" />}
                      </div>

                      <h3 className="text-xl font-bold text-slate-700 mb-2 group-hover:text-primary-700 transition-colors">
                        {uploading ? 'Uploading Document...' : 'Click to Upload or Drag & Drop'}
                      </h3>
                      <p className="text-slate-500 mb-6 max-w-sm">
                        Support for PDF, JPEG, PNG. Max file size 5MB.
                      </p>

                      <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 shadow-sm group-hover:shadow-md transition-all">
                        Choose File
                      </span>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadFlow;
