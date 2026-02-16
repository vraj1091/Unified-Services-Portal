import { Link, useNavigate } from 'react-router-dom';
import { Zap, Briefcase, Gift, ArrowRight, FileText, CheckCircle, ArrowLeft, Home, ChevronRight, Shield, Award, Sparkles, Building, Globe, Star } from 'lucide-react';

const NewHome = () => {
  const navigate = useNavigate();

  const mainServices = [
    {
      id: 'utility-name-change',
      title: 'Utility Name Change',
      titleHindi: 'उपयोगिता नाम परिवर्तन',
      description: 'Seamlessly update names on electricity, gas, and water bills.',
      descriptionHindi: 'उपयोगिता बिलों में नाम बदलें',
      icon: Zap,
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'shadow-amber-500/30',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      services: [
        { name: 'Electricity', count: 5, icon: '⚡' },
        { name: 'Gas', count: 2, icon: '🔥' },
        { name: 'Water', count: 1, icon: '💧' },
        { name: 'Property', count: 1, icon: '🏢' }
      ],
      route: '/utility-services'
    },
    {
      id: 'company-formation',
      title: 'Company Formation',
      titleHindi: 'नई कंपनी गठन',
      description: 'End-to-end business registration and compliance services.',
      descriptionHindi: 'अपना व्यवसाय पंजीकृत करें',
      icon: Briefcase,
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/30',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      services: [
        { name: 'GST Registration', icon: '📋' },
        { name: 'Company Pan', icon: '🆔' },
        { name: 'MSME/Udyam', icon: '🏭' },
        { name: 'Start-up India', icon: '🚀' }
      ],
      route: '/company-formation'
    },
    {
      id: 'govt-grants',
      title: 'Government Grants',
      titleHindi: 'सरकारी अनुदान',
      description: 'AI-powered discovery of eligible government schemes.',
      descriptionHindi: 'अपने व्यवसाय के लिए अनुदान खोजें',
      icon: Gift,
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/30',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      services: [
        { name: 'Find Grant for Me', icon: '🔍' },
        { name: 'Startup Funding', icon: '💰' },
        { name: 'Export Incentives', icon: '🌍' },
        { name: 'Women Entrepreneur', icon: '👩‍💼' }
      ],
      route: '/government-grants'
    }
  ];

  return (
    <div
      className="min-h-screen bg-slate-50/50 animate-in fade-in duration-500"
    >
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-primary-600 flex items-center gap-1 transition-colors font-medium">
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-800 font-bold">Services Directory</span>
          </div>
          {/* Profile/User placeholder could go here */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Hero Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-2xl animate-in slide-in-from-bottom-5 duration-700">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[100px] opacity-30 -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20 pointer-events-none"></div>

          <div className="relative z-10 px-8 py-16 md:p-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider mb-6 text-indigo-200">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              National Single Window System
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
              India's Unified <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
                Digital Services Portal
              </span>
            </h1>

            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Access over 500+ government services, apply for grants, and manage business compliance.
              <br className="hidden md:block" /> Powered by AI for instant processing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/government-grants')} className="px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-white/10 flex items-center gap-2">
                <Gift className="w-5 h-5" /> Explore Grants
              </button>
              <button onClick={() => navigate('/company-formation')} className="px-8 py-4 bg-indigo-600/30 backdrop-blur-md border border-indigo-500/50 text-white rounded-xl font-bold hover:bg-indigo-600/40 transition-colors flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> Start Business
              </button>
            </div>
          </div>

          {/* Abstract Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Main Services Grid */}
        <div className="animate-in slide-in-from-bottom-10 duration-[800ms] delay-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Our Core Services</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Everything you need to manage your personal and business needs with the government.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  to={service.route}
                  className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 hover:shadow-2xl hover:border-transparent transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                  <div className={`w-20 h-20 ${service.bgColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className={`w-10 h-10 ${service.iconColor}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{service.titleHindi}</p>

                  <p className="text-slate-500 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {service.services.slice(0, 3).map((sub, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600">
                          <span>{sub.icon}</span> {sub.name}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className={`text-sm font-bold ${service.iconColor}`}>Get Started</span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 group-hover:${service.bgColor} transition-colors`}>
                        <ArrowRight className={`w-5 h-5 text-slate-400 group-hover:${service.iconColor} transition-colors`} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Feature Highlights (Light & Clean) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-10 duration-[900ms] delay-200">
          {[
            { title: "One-Time Document Upload", desc: "Digital Locker Integration", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
            { title: "AI-Powered Verification", desc: "Instant Application Processing", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50" },
            { title: "Universal Compatibility", desc: "Works across all state depts", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50" },
          ].map((feat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center ${feat.color}`}>
                <feat.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{feat.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline / Process */}
        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100 animate-in slide-in-from-bottom-10 duration-[1000ms] delay-300">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-800">Application Process Simplified</h3>
            <p className="text-slate-500">From application to approval in 4 simple steps</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: 1, title: 'Upload', desc: 'Securely upload your documents' },
                { step: 2, title: 'Analyze', desc: 'AI verifies & extracts details' },
                { step: 3, title: 'Review', desc: 'Confirm the pre-filled form' },
                { step: 4, title: 'Submit', desc: 'Instant submission to provider' }
              ].map((s, i) => (
                <div key={i} className="relative z-10 text-center group">
                  <div className="w-16 h-16 mx-auto bg-white rounded-2xl border-4 border-slate-100 flex items-center justify-center text-xl font-bold text-slate-700 shadow-sm mb-4 group-hover:border-primary-100 group-hover:text-primary-600 transition-all duration-300">
                    {s.step}
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">{s.title}</h4>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewHome;
