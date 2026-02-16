import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
  };

  return (
    <div className="flex gap-2 items-center">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${i18n.language === lang.code
              ? 'bg-orange-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
