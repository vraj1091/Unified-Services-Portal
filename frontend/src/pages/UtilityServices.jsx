import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Flame, Droplets, Building, ArrowRight, Home, ChevronRight, FileText, CheckCircle, Shield } from 'lucide-react';

const UtilityServices = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'electricity',
      name: 'Electricity Services',
      nameHindi: 'बिजली सेवाएं',
      icon: Zap,
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'shadow-amber-500/30',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      providers: [
        { id: 'pgvcl', name: 'PGVCL', type: 'Government', fullName: 'Paschim Gujarat Vij Company Ltd.' },
        { id: 'ugvcl', name: 'UGVCL', type: 'Government', fullName: 'Uttar Gujarat Vij Company Ltd.' },
        { id: 'mgvcl', name: 'MGVCL', type: 'Government', fullName: 'Madhya Gujarat Vij Company Ltd.' },
        { id: 'dgvcl', name: 'DGVCL', type: 'Government', fullName: 'Dakshin Gujarat Vij Company Ltd.' },
        { id: 'torrent-power', name: 'Torrent Power', type: 'Private', fullName: 'Torrent Power Ltd.', featured: true }
      ]
    },
    {
      id: 'gas',
      name: 'Gas Connections',
      nameHindi: 'गैस कनेक्शन',
      icon: Flame,
      gradient: 'from-red-400 to-pink-600',
      shadow: 'shadow-red-500/30',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100',
      providers: [
        { id: 'gujarat-gas', name: 'Gujarat Gas', type: 'Government', fullName: 'Gujarat Gas Ltd.' },
        { id: 'adani-gas', name: 'Adani Total Gas', type: 'Private', fullName: 'Adani Total Gas Ltd.' }
      ]
    },
    {
      id: 'water',
      name: 'Water Supply',
      nameHindi: 'पानी की आपूर्ति',
      icon: Droplets,
      gradient: 'from-blue-400 to-cyan-500',
      shadow: 'shadow-blue-500/30',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      providers: [
        { id: 'amc-water', name: 'AMC Water', type: 'Government', fullName: 'Ahmedabad Municipal Corp.' }
      ]
    },
    {
      id: 'property',
      name: 'Property Tax',
      nameHindi: 'संपत्ति कर',
      icon: Building,
      gradient: 'from-emerald-400 to-green-600',
      shadow: 'shadow-emerald-500/30',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      providers: [
        { id: 'anyror', name: 'AnyRoR', type: 'Government', fullName: 'Revenue Department Gujarat' }
      ]
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
          <span className="text-slate-800 font-medium">Utility Services</span>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden flex items-center justify-between gap-6 flex-wrap animate-in slide-in-from-bottom-5 duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-60 pointer-events-none"></div>

          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">Utility Services</h1>
              <p className="text-slate-500 max-w-xl">
                Manage all your utility connections in one place. Apply for name change, new connections, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {categories.map((category, catIdx) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="space-y-4 animate-in slide-in-from-bottom-5 duration-500" style={{ animationDelay: `${catIdx * 100}ms` }}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${category.bgColor}`}>
                  <Icon className={`w-6 h-6 ${category.textColor}`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{category.name}</h2>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{category.nameHindi}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.providers.map((provider, idx) => (
                  <Link
                    key={provider.id}
                    to={`/utility-services/${category.id}/${provider.id}/document-upload`}
                    className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden animate-in slide-in-from-bottom-3 duration-300"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    {provider.featured && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-gradient-to-bl from-primary-600 to-primary-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                          FEATURED
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.bgColor}`}>
                        <Icon className={`w-6 h-6 ${category.textColor}`} />
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${provider.type === 'Government'
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                        }`}>
                        {provider.type}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary-700 transition-colors">
                      {provider.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 truncate" title={provider.fullName}>{provider.fullName}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-400">Select Provider</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm animate-in slide-in-from-bottom-5 duration-500 delay-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Required Documents</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-700 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" /> Identity Proof
            </h4>
            <ul className="space-y-2">
              {['Aadhaar Card', 'PAN Card', 'Passport', 'Voter ID'].map(doc => (
                <li key={doc} className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle className="w-3.5 h-3.5 text-primary-500" /> {doc}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-700 flex items-center gap-2">
              <Home className="w-4 h-4 text-emerald-500" /> Address Proof
            </h4>
            <ul className="space-y-2">
              {['Current Utility Bill', 'Ration Card', 'Bank Statement', 'Rent Agreement'].map(doc => (
                <li key={doc} className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle className="w-3.5 h-3.5 text-primary-500" /> {doc}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-500" /> Ownership Proof
            </h4>
            <ul className="space-y-2">
              {['Index Copy', 'Sale Deed', 'Possession Letter', 'NOC from Owner'].map(doc => (
                <li key={doc} className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle className="w-3.5 h-3.5 text-primary-500" /> {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityServices;
