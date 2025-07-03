import { useState, useEffect } from "react";
import { getSupportedLanguages } from "../services/translate";

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const [languages, setLanguages] = useState([]);
  
  useEffect(() => {
    const loadLanguages = async () => {
      const supportedLanguages = getSupportedLanguages();
      setLanguages(Object.entries(supportedLanguages).map(([code, name]) => ({
        code,
        name
      })));
    };
    
    loadLanguages();
  }, []);

  return (
    <div className="mb-4">
      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
        Language
      </label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;