import { Link, useNavigate } from 'react-router-dom';
import { Zap, Flame, Droplets, Building, ExternalLink, Shield, ArrowLeft, Home, ChevronRight } from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'electricity',
      name: 'Electricity',
      nameHindi: 'बिजली',
      description: 'New connection, load change & more',
      icon: Zap,
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'shadow-amber-500/20',
      textColor: 'text-amber-600',
    },
    {
      id: 'gas',
      name: 'Gas Connection',
      nameHindi: 'गैस कनेक्शन',
      description: 'Apply for residential & commercial gas',
      icon: Flame,
      gradient: 'from-red-500 to-pink-600',
      shadow: 'shadow-red-500/20',
      textColor: 'text-red-600',
    },
    {
      id: 'water',
      name: 'Water Supply',
      nameHindi: 'पानी की आपूर्ति',
      description: 'New water connection & billing',
      icon: Droplets,
      gradient: 'from-blue-400 to-cyan-500',
      shadow: 'shadow-blue-500/20',
      textColor: 'text-blue-600',
    },
    {
      id: 'property',
      name: 'Property Tax',
      nameHindi: 'संपत्ति कर',
      description: 'Pay tax, assess value & ownership',
      icon: Building,
      gradient: 'from-emerald-400 to-green-600',
      shadow: 'shadow-emerald-500/20',
      textColor: 'text-emerald-600',
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
          <span className="text-slate-800 font-medium">Services</span>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden animate-in slide-in-from-bottom-5 duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-60 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Government Services</h1>
              <p className="text-slate-500 max-w-2xl">
                Access a wide range of citizen services. Select a category below to proceed with your application.
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center border border-primary-100 shadow-inner">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div key={service.id} className="animate-in slide-in-from-bottom-5 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
              <Link
                to={`/service-facilities/${service.id}`}
                className="group h-full bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>

                <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${service.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-primary-700 transition-colors">{service.name}</h3>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">{service.nameHindi}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-primary-600 text-sm font-bold group-hover:gap-3 transition-all">
                  Select Service <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Help Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden animate-in slide-in-from-bottom-10 duration-700 delay-300">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Need Assistance?</h3>
            <p className="text-slate-400">
              Our support team is available 24/7 to help you with your applications.
            </p>
          </div>
          <Link
            to="/support"
            className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold shadow-lg hover:bg-slate-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
