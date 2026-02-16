import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, ArrowRight, CheckCircle, Home, Clock, Shield, Info, Award, TrendingUp, FileCheck, ChevronRight, Star, Zap, CreditCard, Building } from 'lucide-react';

const CompanyFormation = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'gst',
      name: 'GST Registration',
      nameHindi: 'जीएसटी पंजीकरण',
      icon: CreditCard,
      description: 'Goods and Services Tax Registration',
      subtitle: 'As per GSTN guidelines',
      processingTime: '7-10 days',
      fees: '₹2,000 - ₹5,000',
      documents: ['PAN Card', 'Aadhaar', 'Address Proof', 'Bank Statement'],
      gradient: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-500/30',
      iconColor: 'bg-blue-50 text-blue-600',
      badges: ['🏛 Govt Approved', '🔥 Most Applied'],
      grantEligible: true,
      tooltip: 'Includes government fees & professional charges. No hidden costs.'
    },
    {
      id: 'tan',
      name: 'TAN',
      nameHindi: 'टैन',
      icon: FileCheck,
      description: 'Tax Deduction Account Number',
      subtitle: 'Required for TDS compliance',
      processingTime: '10-15 days',
      fees: '₹1,500 - ₹3,000',
      documents: ['PAN Card', 'Address Proof', 'Identity Proof'],
      gradient: 'from-purple-500 to-pink-500',
      shadow: 'shadow-purple-500/30',
      iconColor: 'bg-purple-50 text-purple-600',
      badges: ['🏛 Govt Approved'],
      grantEligible: false,
      tooltip: 'All-inclusive pricing with no hidden charges'
    },
    {
      id: 'pan',
      name: 'PAN Card',
      nameHindi: 'पैन कार्ड',
      icon: Shield,
      description: 'Permanent Account Number',
      subtitle: 'Essential for all business types',
      processingTime: '15-20 days',
      fees: '₹1,000 - ₹2,000',
      documents: ['Aadhaar', 'Photo', 'Address Proof'],
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/30',
      iconColor: 'bg-emerald-50 text-emerald-600',
      badges: ['🏛 Govt Approved', '⭐ Recommended'],
      grantEligible: true,
      tooltip: 'Government fees included'
    },
    {
      id: 'dsc',
      name: 'DSC',
      nameHindi: 'डीएससी',
      icon: Zap,
      description: 'Digital Signature Certificate',
      subtitle: 'For online filings',
      processingTime: '3-5 days',
      fees: '₹1,500 - ₹3,500',
      documents: ['PAN Card', 'Aadhaar', 'Photo'],
      gradient: 'from-orange-500 to-red-500',
      shadow: 'shadow-orange-500/30',
      iconColor: 'bg-orange-50 text-orange-600',
      badges: ['🏛 Govt Approved'],
      grantEligible: false,
      tooltip: 'Valid for 2 years'
    },
    {
      id: 'din',
      name: 'DIN',
      nameHindi: 'डीआईएन',
      icon: Star,
      description: 'Director Identification Number',
      subtitle: 'For company directors',
      processingTime: '7-10 days',
      fees: '₹1,000 - ₹2,000',
      documents: ['PAN Card', 'Aadhaar', 'Photo', 'Address Proof'],
      gradient: 'from-indigo-500 to-violet-500',
      shadow: 'shadow-indigo-500/30',
      iconColor: 'bg-indigo-50 text-indigo-600',
      badges: ['🏛 Govt Approved'],
      grantEligible: false,
      tooltip: 'Lifetime validity'
    },
    {
      id: 'shop-est',
      name: 'Shop Establishment',
      nameHindi: 'दुकान स्थापना',
      icon: Building,
      description: 'Shop & Establishment Registration',
      subtitle: 'Mandatory for local business compliance',
      processingTime: '10-15 days',
      fees: '₹2,000 - ₹4,000',
      documents: ['Rent Agreement', 'Owner ID', 'Address Proof'],
      gradient: 'from-amber-500 to-yellow-500',
      shadow: 'shadow-amber-500/30',
      iconColor: 'bg-amber-50 text-amber-600',
      badges: ['📍 State Specific'],
      grantEligible: false,
      tooltip: 'State government registration'
    },
    {
      id: 'msme',
      name: 'MSME/Udyam',
      nameHindi: 'एमएसएमई/उद्यम',
      icon: Building,
      description: 'MSME/Udyam Registration',
      subtitle: 'Required for government schemes & grants',
      processingTime: '1-3 days',
      fees: 'Free',
      documents: ['Aadhaar', 'PAN', 'Business Details'],
      gradient: 'from-rose-500 to-pink-600',
      shadow: 'shadow-rose-500/30',
      iconColor: 'bg-rose-50 text-rose-600',
      badges: ['🎯 Grant Eligible', '🔥 Most Applied'],
      grantEligible: true,
      tooltip: 'Free government registration'
    },
    {
      id: 'coi',
      name: 'COI',
      nameHindi: 'सीओआई',
      icon: FileCheck,
      description: 'Certificate of Incorporation',
      subtitle: 'Company registration with MCA',
      processingTime: '15-20 days',
      fees: '₹10,000 - ₹20,000',
      documents: ['MOA', 'AOA', 'Director Details', 'Address Proof'],
      gradient: 'from-teal-500 to-cyan-500',
      shadow: 'shadow-teal-500/30',
      iconColor: 'bg-teal-50 text-teal-600',
      badges: ['🏛 MCA Registered'],
      grantEligible: true,
      tooltip: 'Complete company incorporation'
    }
  ];

  const packages = [
    {
      id: 'startup',
      name: 'Startup Package',
      nameHindi: 'स्टार्टअप पैकेज',
      subtitle: 'Ideal for newly started businesses',
      services: ['PAN Registration', 'GST Registration', 'MSME Registration'],
      price: '₹5,999',
      savings: 'Save ₹2,000',
      timeline: '7–10 days',
      popular: false,
      recommended: true,
      gradient: 'from-slate-700 to-slate-900',
      textColor: 'text-white'
    },
    {
      id: 'business',
      name: 'Business Package',
      nameHindi: 'व्यवसाय पैकेज',
      subtitle: 'For growing businesses',
      services: ['PAN', 'GST', 'TAN', 'Shop Establishment', 'MSME'],
      price: '₹12,999',
      savings: 'Save ₹5,000',
      timeline: '10–15 days',
      popular: true,
      recommended: true,
      gradient: 'from-violet-600 to-purple-600',
      textColor: 'text-white',
      badge: 'Most Popular'
    },
    {
      id: 'complete',
      name: 'Complete Business Package',
      nameHindi: 'पूर्ण व्यवसाय पैकेज',
      subtitle: 'End-to-end business compliance',
      services: ['PAN', 'GST', 'TAN', 'DSC', 'DIN', 'Shop Est', 'MSME', 'COI'],
      price: '₹24,999',
      savings: 'Save ₹10,000',
      timeline: '15–20 days',
      popular: false,
      recommended: false,
      gradient: 'from-emerald-600 to-teal-700',
      textColor: 'text-white'
    }
  ];

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
          <span className="text-slate-800 font-medium">Company Formation</span>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden flex items-center gap-8 animate-in slide-in-from-bottom-5 duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl -mr-20 -mt-20 opacity-60 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-100 rounded-full blur-3xl -ml-16 -mb-16 opacity-60 pointer-events-none"></div>

          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0 z-10">
            <Briefcase className="w-10 h-10 text-white" />
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Company Formation</h1>
            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <span className="text-sm font-medium uppercase tracking-wider">नई कंपनी गठन</span>
            </div>
            <p className="text-slate-500 max-w-2xl text-lg">
              Launch your business with confidence. From GST to Incorporation, get all legal compliances handled by experts in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 flex flex-wrap items-center justify-center gap-6 animate-in slide-in-from-bottom-5 duration-500 delay-100">
        <div className="flex items-center gap-2 text-emerald-800 text-sm font-medium">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Digitally Secured Documents</span>
        </div>
        <div className="w-px h-4 bg-emerald-200 hidden sm:block"></div>
        <div className="flex items-center gap-2 text-emerald-800 text-sm font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>100% Government Compliant</span>
        </div>
        <div className="w-px h-4 bg-emerald-200 hidden sm:block"></div>
        <div className="flex items-center gap-2 text-emerald-800 text-sm font-medium">
          <Zap className="w-4 h-4 text-emerald-600" />
          <span>Fast-Track Processing</span>
        </div>
      </div>

      {/* Packages Section */}
      <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500 delay-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            Popular Packages
          </h2>
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Save up to 40%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-1 bg-gradient-to-br ${pkg.gradient} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-amber-500/30 z-20 flex items-center gap-1 uppercase tracking-wider">
                  <Award className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div className="bg-white rounded-[22px] p-6 h-full flex flex-col relative overflow-hidden">
                <div className={`absolute top-0 right-0 bg-gradient-to-bl ${pkg.gradient} text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl opacity-90`}>
                  {pkg.savings}
                </div>

                <div className="mb-6">
                  <h3 className={`text-xl font-bold text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${pkg.gradient} transition-all`}>{pkg.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">{pkg.nameHindi}</p>
                  <p className="text-sm text-slate-500 leading-tight">{pkg.subtitle}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through">MRP {(parseInt(pkg.price.replace(/[^\d]/g, '')) * 1.4).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }).replace('.00', '')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-2 bg-emerald-50 px-2 py-1 rounded-lg w-fit">
                    <Clock className="w-3 h-3" /> {pkg.timeline}
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {pkg.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{service}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/company-formation/${pkg.id}/document-upload`}
                  className={`w-full py-3.5 rounded-xl font-bold text-center text-white shadow-lg transition-transform active:scale-95 bg-gradient-to-r ${pkg.gradient} hover:opacity-90`}
                >
                  {pkg.recommended ? 'Check Eligibility' : 'Get Started'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Services */}
      <div className="pt-8 border-t border-slate-200 animate-in slide-in-from-bottom-5 duration-500 delay-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Review Individual Services</h2>
            <p className="text-slate-500">Pick and choose specific registrations for your business</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={`/company-formation/${service.id}/document-upload`}
                className="group bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col h-full animate-in slide-in-from-bottom-3 duration-300"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {service.grantEligible && (
                  <div className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-orange-200">
                    <Award className="w-3 h-3" /> Grant Eligible
                  </div>
                )}

                <div className={`w-12 h-12 ${service.iconColor} rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight group-hover:text-primary-600 transition-colors">{service.name}</h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">{service.nameHindi}</p>
                  <p className="text-xs text-slate-500 line-clamp-2">{service.description}</p>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {service.processingTime}</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-sm text-slate-800">
                    <span>{service.fees}</span>
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyFormation;
