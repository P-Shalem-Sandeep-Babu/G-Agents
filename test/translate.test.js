import { detectLanguage, translateText, getSupportedLanguages } from "../src/services/translate";

describe("Translation Service", () => {
  describe("getSupportedLanguages", () => {
    it("should return supported languages", () => {
      const languages = getSupportedLanguages();
      expect(languages).toEqual({
        en: "English",
        hi: "Hindi",
        mr: "Marathi",
        ta: "Tamil",
        te: "Telugu",
        kn: "Kannada",
        ml: "Malayalam",
        bn: "Bengali"
      });
    });
  });
  
  describe("detectLanguage", () => {
    it("should detect Hindi text", async () => {
      const hindiText = "हिंदी में कुछ टेक्स्ट";
      const detected = await detectLanguage(hindiText);
      expect(detected).toBe("hi");
    });
    
    it("should detect Marathi text", async () => {
      const marathiText = "मराठी मधील काही मजकूर";
      const detected = await detectLanguage(marathiText);
      expect(detected).toBe("mr");
    });
    
    it("should default to English for unknown text", async () => {
      const englishText = "Some text in English";
      const detected = await detectLanguage(englishText);
      expect(detected).toBe("en");
    });
  });
  
  describe("translateText", () => {
    it("should translate text to Hindi", async () => {
      const text = "Hello";
      const translated = await translateText(text, "hi");
      expect(translated).toBe("यह एक नकली अनुवाद है।");
    });
    
    it("should return original text for unsupported language", async () => {
      const text = "Hello";
      const translated = await translateText(text, "xx");
      expect(translated).toBe(text);
    });
  });
});