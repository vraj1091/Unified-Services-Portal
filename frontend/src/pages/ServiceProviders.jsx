import { useParams, Link, useNavigate } from 'react-router-dom';
import { Zap, Flame, Droplets, Building, ArrowRight, MapPin, Phone, AlertCircle, CheckCircle, ArrowLeft, Home, ChevronRight, Search, Filter, Shield, Briefcase } from 'lucide-react';

const ServiceProviders = () => {
  const { serviceType, facilityType } = useParams();
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
      borderColor: 'border-amber-100',
      providers: [
        {
          id: 'pgvcl',
          name: 'PGVCL',
          nameHindi: 'पीजीवीसीएल',
          fullName: 'Paschim Gujarat Vij Company Ltd.',
          areas: ['Rajkot', 'Jamnagar', 'Bhavnagar', 'Junagadh', 'Porbandar'],
          phone: '1912',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'ugvcl',
          name: 'UGVCL',
          nameHindi: 'यूजीवीसीएल',
          fullName: 'Uttar Gujarat Vij Company Ltd.',
          areas: ['Mehsana', 'Patan', 'Banaskantha', 'Sabarkantha'],
          phone: '1912',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'torrent-power',
          name: 'Torrent Power',
          nameHindi: 'टॉरेंट पावर',
          fullName: 'Torrent Power Ltd.',
          areas: ['Ahmedabad', 'Gandhinagar', 'Surat (parts)'],
          phone: '1800-200-9090',
          type: 'Private',
          available: true,
          onlineAvailable: true,
          featured: true
        }
      ]
    },
    gas: {
      name: 'Gas',
      nameHindi: 'गैस',
      icon: Flame,
      gradient: 'from-red-400 to-pink-600',
      shadow: 'shadow-red-500/30',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100',
      providers: [
        {
          id: 'gujarat-gas',
          name: 'Gujarat Gas',
          nameHindi: 'गुजरात गैस',
          fullName: 'Gujarat Gas Ltd.',
          areas: ['Rajkot', 'Jamnagar', 'Morbi', 'Bhavnagar'],
          phone: '1800-233-3555',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'adani-gas',
          name: 'Adani Total Gas',
          nameHindi: 'अदानी टोटल गैस',
          fullName: 'Adani Total Gas Ltd.',
          areas: ['Ahmedabad', 'Vadodara', 'Surat', 'Kheda'],
          phone: '1800-266-6666',
          type: 'Private',
          available: true,
          onlineAvailable: true,
          featured: true
        }
      ]
    },
    water: {
      name: 'Water',
      nameHindi: 'पानी',
      icon: Droplets,
      gradient: 'from-blue-400 to-cyan-500',
      shadow: 'shadow-blue-500/30',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      providers: [
        {
          id: 'amc-water',
          name: 'AMC Water',
          nameHindi: 'एएमसी जल विभाग',
          fullName: 'Ahmedabad Municipal Corporation',
          areas: ['Ahmedabad'],
          phone: '079-2550-0000',
          type: 'Government',
          available: true,
          onlineAvailable: true
        }
      ]
    },
    property: {
      name: 'Property',
      nameHindi: 'संपत्ति',
      icon: Building,
      gradient: 'from-emerald-400 to-green-600',
      shadow: 'shadow-green-500/30',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      providers: [
        {
          id: 'anyror',
          name: 'AnyRoR',
          nameHindi: 'एनीआरओआर',
          fullName: 'Revenue Department Gujarat',
          areas: ['All Gujarat Districts'],
          phone: '079-2325-2000',
          type: 'Government',
          available: true,
          onlineAvailable: true
        }
      ]
    }
  };

  const facilityConfig = {
    'name-change': {
      name: 'Name Change',
      nameHindi: 'नाम परिवर्तन',
      description: 'Change name in your utility connection'
    }
  };

  const service = serviceConfig[serviceType];
  const facility = facilityConfig[facilityType];
  const Icon = service?.icon;

  if (!service || !facility) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Provider Not Found</h2>
        <p className="text-slate-500 mb-6">The provider or service you requested does not exist.</p>
        <button onClick={() => navigate('/services')} className="px-6 py-2 bg-primary-600 text-white rounded-lg">Return to Services</button>
      </div>
    );
  }

  const governmentProviders = service.providers.filter(p => p.type === 'Government');
  const privateProviders = service.providers.filter(p => p.type === 'Private');

  const renderProvider = (provider, idx) => (
    <div
      key={provider.id}
      className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col h-full animate-in slide-in-from-bottom-3 duration-300"
      style={{ animationDelay: `${idx * 80}ms` }}
    >
      {provider.featured && (
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${service.gradient} opacity-10 rounded-bl-full -mr-4 -mt-4 pointer-events-none`}></div>
      )}

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${service.bgColor}`}>
            <Icon className={`w-6 h-6 ${service.textColor}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 leading-tight">{provider.name}</h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{provider.nameHindi}</p>
          </div>
        </div>

        {provider.onlineAvailable ? (
          <span className="flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-100">
            <CheckCircle className="w-3 h-3" /> ONLINE
          </span>
        ) : (
          <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-100">
            OFFLINE
          </span>
        )}
      </div>

      <p className="text-sm text-slate-600 mb-4 font-medium flex-grow">{provider.fullName}</p>

      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-2 text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
          <span>
            <strong className="text-slate-700">Areas:</strong> {provider.areas.slice(0, 3).join(', ')}{provider.areas.length > 3 && '...'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          <span><strong className="text-slate-700">Helpline:</strong> {provider.phone}</span>
        </div>
      </div>

      <div className="mt-auto">
        {provider.available ? (
          <Link
            to={`/name-change-application/${serviceType}?provider=${provider.id}`}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${service.gradient} shadow-lg ${service.shadow} hover:opacity-90 active:scale-95 transition-all`}
          >
            Select Provider <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-slate-100 text-slate-400 py-3 rounded-xl font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
          >
            Currently Unavailable
          </button>
        )}
      </div>
    </div>
  );

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
          <Link to={`/service-facilities/${serviceType}`} className="hover:text-primary-600 capitalize">{serviceType}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 font-medium capitalize">Select Provider</span>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden flex flex-wrap items-center gap-8 animate-in slide-in-from-bottom-5 duration-700">
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none`}></div>

          <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg ${service.shadow} flex-shrink-0`}>
            <Icon className="w-10 h-10 text-white" />
          </div>

          <div className="relative z-10 flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">{facility.name} Providers</h1>
            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <span className="text-sm font-medium uppercase tracking-wider">{facility.nameHindi}</span>
            </div>
            <p className="text-slate-500 max-w-2xl">
              Choose your service provider to proceed with the application. Government providers cover most regions, while private providers operate in select cities.
            </p>
          </div>

          <div className="relative z-10 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search provider..."
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Government Providers */}
      {governmentProviders.length > 0 && (
        <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-700 delay-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Government Providers</h2>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">State Owned Agencies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentProviders.map(renderProvider)}
          </div>
        </div>
      )}

      {/* Private Providers */}
      {privateProviders.length > 0 && (
        <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-700 delay-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Private Providers</h2>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Authorized Private Companies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privateProviders.map(renderProvider)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviders;