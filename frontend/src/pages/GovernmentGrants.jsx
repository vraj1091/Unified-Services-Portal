import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Search, ArrowRight, TrendingUp, Home, ChevronRight, Award, Zap, Globe, Users, Building, Laptop, Heart, Target } from 'lucide-react';

const GovernmentGrants = () => {
  const navigate = useNavigate();

  const grantCategories = [
    {
      id: 'find-grant',
      name: 'Find Grant for My Business',
      nameHindi: 'मेरे व्यवसाय के लिए अनुदान खोजें',
      icon: Search,
      description: 'AI will analyze your business and suggest eligible grants',
      gradient: 'from-violet-600 to-fuchsia-600',
      shadow: 'shadow-fuchsia-500/30',
      featured: true,
      route: '/government-grants/find-grant'
    },
    {
      id: 'startup',
      name: 'Startup Grants',
      nameHindi: 'स्टार्टअप अनुदान',
      icon: Zap,
      description: 'Grants for new startups and entrepreneurs',
      gradient: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-cyan-500/30',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      grants: [
        { name: 'Startup India Seed Fund', amount: '₹20 Lakhs', eligibility: 'DPIIT Recognized' },
        { name: 'Atal Innovation Mission', amount: '₹10 Lakhs', eligibility: 'Tech Startups' },
        { name: 'SISFS', amount: '₹15 Lakhs', eligibility: 'SC/ST Entrepreneurs' }
      ]
    },
    {
      id: 'msme',
      name: 'MSME Grants',
      nameHindi: 'एमएसएमई अनुदान',
      icon: Building,
      description: 'Grants for Micro, Small & Medium Enterprises',
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/30',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      grants: [
        { name: 'Credit Guarantee Scheme', amount: '₹50 Lakhs', eligibility: 'MSME Registered' },
        { name: 'Technology Upgradation', amount: '₹10 Lakhs', eligibility: 'Manufacturing' },
        { name: 'Marketing Assistance', amount: '₹5 Lakhs', eligibility: 'Export Oriented' }
      ]
    },
    {
      id: 'export',
      name: 'Export Grants',
      nameHindi: 'निर्यात अनुदान',
      icon: Globe,
      description: 'Grants for export-oriented businesses',
      gradient: 'from-orange-500 to-red-500',
      shadow: 'shadow-orange-500/30',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      grants: [
        { name: 'Market Development Assistance', amount: '₹5 Lakhs', eligibility: 'Exporters' },
        { name: 'Export Promotion Capital Goods', amount: '₹10 Lakhs', eligibility: 'Manufacturers' },
        { name: 'Trade Fair Participation', amount: '₹3 Lakhs', eligibility: 'All Exporters' }
      ]
    },
    {
      id: 'technology',
      name: 'Technology Grants',
      nameHindi: 'प्रौद्योगिकी अनुदान',
      icon: Laptop,
      description: 'Grants for technology and innovation',
      gradient: 'from-indigo-500 to-violet-500',
      shadow: 'shadow-indigo-500/30',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      grants: [
        { name: 'R&D Grant', amount: '₹25 Lakhs', eligibility: 'Tech Companies' },
        { name: 'Patent Filing Support', amount: '₹2 Lakhs', eligibility: 'Innovators' },
        { name: 'Digital India Initiative', amount: '₹5 Lakhs', eligibility: 'IT Services' }
      ]
    },
    {
      id: 'women',
      name: 'Women Entrepreneur Grants',
      nameHindi: 'महिला उद्यमी अनुदान',
      icon: Heart,
      description: 'Special grants for women-led businesses',
      gradient: 'from-pink-500 to-rose-500',
      shadow: 'shadow-pink-500/30',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      grants: [
        { name: 'Mahila Udyam Nidhi', amount: '₹10 Lakhs', eligibility: 'Women Owned' },
        { name: 'Stree Shakti Package', amount: '₹5 Lakhs', eligibility: 'Women Entrepreneurs' },
        { name: 'TREAD Scheme', amount: '₹15 Lakhs', eligibility: 'Women in Rural Areas' }
      ]
    },
    {
      id: 'scst',
      name: 'SC/ST Entrepreneur Grants',
      nameHindi: 'एससी/एसटी उद्यमी अनुदान',
      icon: Users,
      description: 'Special grants for SC/ST entrepreneurs',
      gradient: 'from-amber-500 to-yellow-600',
      shadow: 'shadow-amber-500/30',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      grants: [
        { name: 'NSFDC Loan Scheme', amount: '₹20 Lakhs', eligibility: 'SC Entrepreneurs' },
        { name: 'NSTFDC Scheme', amount: '₹15 Lakhs', eligibility: 'ST Entrepreneurs' },
        { name: 'Stand-Up India', amount: '₹10 Lakhs', eligibility: 'SC/ST/Women' }
      ]
    }
  ];

  return (
    <div
      className="space-y-8 animate-in fade-in duration-500"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary-600 flex items-center gap-1 transition-colors">
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 font-medium">Government Grants</span>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden flex items-center gap-8 animate-in slide-in-from-bottom-5 duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl -mr-20 -mt-20 opacity-60 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-100 rounded-full blur-3xl -ml-16 -mb-16 opacity-60 pointer-events-none"></div>

          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0 z-10">
            <Gift className="w-10 h-10 text-white" />
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Government Grants</h1>
            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <span className="text-sm font-medium uppercase tracking-wider">सरकारी अनुदान</span>
            </div>
            <p className="text-slate-500 max-w-2xl text-lg">
              Access thousands of government grants designed to help your business grow. From startups to established enterprises, find the financial support you need.
            </p>
          </div>
        </div>
      </div>

      {/* AI Grant Finder - Featured */}
      <div className="w-full animate-in slide-in-from-bottom-10 duration-[800ms] delay-100">
        <Link
          to="/government-grants/find-grant"
          className="group relative overflow-hidden block w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl transform transition-transform duration-300 group-hover:scale-[1.01]"></div>

          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0">
              <Search className="w-12 h-12 text-white" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h2 className="text-3xl font-bold text-white">Find Grant for My Business</h2>
                <span className="bg-white/25 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30 uppercase tracking-wider">
                  AI Powered
                </span>
              </div>
              <p className="text-indigo-100 text-lg mb-2">मेरे व्यवसाय के लिए अनुदान खोजें</p>
              <p className="text-indigo-50/90 text-lg font-light leading-relaxed max-w-2xl">
                Upload your business documents and let our advanced AI analyze your eligibility for over 500+ government schemes instantly.
              </p>
            </div>

            <div className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-900/20 group-hover:bg-indigo-50 transition-colors flex items-center gap-2">
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>
        </Link>
      </div>

      {/* Grant Categories */}
      <div className="animate-in slide-in-from-bottom-10 duration-[900ms] delay-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Browse by Category</h2>
            <p className="text-slate-500">Explore grants tailored to your specific industry and needs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {grantCategories.slice(1).map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/government-grants/${category.id}`}
                className="group bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-primary-100 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col h-full"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity pointer-events-none`}></div>

                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 ${category.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className={`w-7 h-7 ${category.iconColor}`} />
                  </div>
                  <div className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-100">
                    {category.grants.length} Schemes
                  </div>
                </div>

                <div className="mb-6 flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-primary-600 transition-colors">{category.name}</h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">{category.nameHindi}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{category.description}</p>
                </div>

                {/* Mini Grant List Preview */}
                <div className="space-y-3 mb-6 bg-slate-50/50 rounded-xl p-3 border border-slate-100/50">
                  {category.grants.slice(0, 2).map((grant, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-700 truncate max-w-[60%]">{grant.name}</span>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{grant.amount}</span>
                    </div>
                  ))}
                  {category.grants.length > 2 && (
                    <p className="text-xs text-center text-slate-400 font-medium">+ {category.grants.length - 2} more schemes</p>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-primary-600 group-hover:text-primary-700 transition-colors">
                  <span>View All Grants</span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden animate-in slide-in-from-bottom-10 duration-[1000ms] delay-300">
        <div className="absolute inset-0 bg-grid-slate-50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center flex items-center justify-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
            Impact & Statistics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {[
              { label: 'Total Grants Available', value: '₹500Cr+', color: 'text-emerald-600' },
              { label: 'Active Schemes', value: '50+', color: 'text-blue-600' },
              { label: 'Businesses Funded', value: '10,000+', color: 'text-violet-600' },
              { label: 'Success Rate', value: '85%', color: 'text-amber-600' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center px-4 pt-4 sm:pt-0">
                <div className={`text-4xl font-extrabold ${stat.color} mb-2`}>{stat.value}</div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-8 animate-in slide-in-from-bottom-10 duration-[1100ms] delay-400">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          How to Apply for Grants
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10"></div>

          {[
            { step: '1', title: 'Upload Documents', desc: 'Securely upload business registration & financials', icon: '📄' },
            { step: '2', title: 'AI Analysis', desc: 'Our AI instantly matches you with eligible schemes', icon: '🤖' },
            { step: '3', title: 'Fill Details', desc: 'Complete the simplified application form', icon: '✍️' },
            { step: '4', title: 'Get Funded', desc: 'Track status and receive funds directly', icon: '💰' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-white border-4 border-primary-50 text-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-sm relative z-10 group-hover:border-primary-200 transition-colors">
                {item.icon}
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-slate-50 text-xs font-bold text-slate-500 mb-3 border border-slate-100">
                Step 0{item.step}
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentGrants;
