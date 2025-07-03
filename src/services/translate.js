// Mock implementation of Google Translate API
// In a real app, you would use @google-cloud/translate library

const SUPPORTED_LANGUAGES = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
  bn: "Bengali"
};

export const detectLanguage = async (text) => {
  // Mock implementation - in reality would call Google Cloud Translation API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple detection logic for demo
      const detectedLang = Object.keys(SUPPORTED_LANGUAGES).find(lang => 
        text.includes(lang === "hi" ? "ह" : "") || // Hindi
        lang === "mr" && text.includes("म") || // Marathi
        lang === "ta" && text.includes("த") // Tamil
      ) || "en";
      resolve(detectedLang);
    }, 500);
  });
};

export const translateText = async (text, targetLanguage) => {
  // Mock implementation - in reality would call Google Cloud Translation API
  return new Promise((resolve) => {
    setTimeout(() => {
      const translations = {
        hi: "यह एक नकली अनुवाद है।",
        mr: "हे एक बनावट भाषांतर आहे.",
        ta: "இது ஒரு போலி மொழிபெயர்ப்பு.",
        en: "This is a mock translation."
      };
      resolve(translations[targetLanguage] || text);
    }, 800);
  });
};

export const getSupportedLanguages = () => {
  return SUPPORTED_LANGUAGES;
};