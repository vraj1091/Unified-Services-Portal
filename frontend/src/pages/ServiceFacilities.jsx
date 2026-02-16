import { useParams, Link, useNavigate } from 'react-router-dom';
import { Zap, Flame, Droplets, Building, ArrowRight, FileText, Settings, Plus, ArrowLeft, Home, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

const ServiceFacilities = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();

  const serviceConfig = {
    electricity: {
      name: 'Electricity',
      nameHindi: 'बिजली',
      icon: Zap,
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'shadow-amber-500/30',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100'
    },
    gas: {
      name: 'Gas',
      nameHindi: 'गैस',
      icon: Flame,
      gradient: 'from-red-400 to-pink-600',
      shadow: 'shadow-red-500/30',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    water: {
      name: 'Water',
      nameHindi: 'पानी',
      icon: Droplets,
      gradient: 'from-blue-400 to-cyan-500',
      shadow: 'shadow-blue-500/30',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    property: {
      name: 'Property',
      nameHindi: 'संपत्ति',
      icon: Building,
      gradient: 'from-emerald-400 to-green-600',
      shadow: 'shadow-green-500/30',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100'
    }
  };

  const service = serviceConfig[serviceType];
  const Icon = service?.icon || FileText;

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Service Not Found</h2>
        <p className="text-slate-500 mb-6">The service you requested does not exist.</p>
        <button onClick={() => navigate('/services')} className="px-6 py-2 bg-primary-600 text-white rounded-lg">Return to Services</button>
      </div>
    );
  }

  const facilities = [
    {
      id: 'name-change',
      name: 'Name Change',
      nameHindi: 'नाम परिवर्तन',
      description: 'Change name in your utility connection',
      descriptionHindi: 'अपने उपयोगिता कनेक्शन में नाम बदलें',
      icon: FileText,
      available: true,
      link: `/service-providers/${serviceType}/name-change`
    },
    {
      id: 'new-connection',
      name: 'New Connection',
      nameHindi: 'नया कनेक्शन',
      description: 'Apply for new utility connection',
      descriptionHindi: 'नए उपयोगिता कनेक्शन के लिए आवेदन करें',
      icon: Plus,
      available: false,
      comingSoon: true
    },
    {
      id: 'transfer',
      name: 'Transfer Connection',
      nameHindi: 'कनेक्शन स्थानांतरण',
      description: 'Transfer connection to another location',
      descriptionHindi: 'कनेक्शन को दूसरे स्थान पर स्थानांतरित करें',
      icon: Settings,
      available: false,
      comingSoon: true
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
          <Link to="/services" className="hover:text-primary-600">Services</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 font-medium capitalize">{serviceType}</span>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden flex items-center gap-8 animate-in slide-in-from-bottom-5 duration-700">
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none`}></div>

          <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg ${service.shadow} flex-shrink-0`}>
            <Icon className="w-10 h-10 text-white" />
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">{service.name} Services</h1>
            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <span className="text-sm font-medium uppercase tracking-wider">{service.nameHindi} सेवाएं</span>
            </div>
            <p className="text-slate-500 max-w-xl">
              Select the specific facility you would like to apply for. We are continuously adding more services to serve you better.
            </p>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="animate-in slide-in-from-bottom-10 duration-700 delay-100">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary-500" />
          Available Facilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, idx) => {
            const FacilityIcon = facility.icon;

            if (facility.available) {
              return (
                <Link
                  key={facility.id}
                  to={facility.link}
                  className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-primary-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden animate-in slide-in-from-bottom-3 duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity pointer-events-none`}></div>

                  <div className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <FacilityIcon className={`w-7 h-7 ${service.textColor}`} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-1">{facility.name}</h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">{facility.nameHindi}</p>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {facility.description}
                  </p>

                  <div className={`mt-auto flex items-center gap-2 ${service.textColor} text-sm font-bold group-hover:gap-3 transition-all`}>
                    Select Facility <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            } else {
              return (
                <div
                  key={facility.id}
                  className="bg-slate-50 rounded-3xl p-6 border border-slate-100 relative overflow-hidden opacity-75 grayscale-[0.5] animate-in slide-in-from-bottom-3 duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-slate-200 rounded-xl flex items-center justify-center mb-6">
                    <FacilityIcon className="w-7 h-7 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-slate-700">{facility.name}</h3>
                    {facility.comingSoon && (
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-amber-200">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">{facility.nameHindi}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left animate-in slide-in-from-bottom-5 duration-500 delay-200">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-blue-900 font-medium text-sm">
            Currently, only <strong>Name Change</strong> services are fully online. We are working hard to bring New Connection and Transfer services online by next month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceFacilities;