import { useState } from "react";
import { generateTextContent, generateWorksheetFromImage } from "../services/gemini";

export const useGemini = () => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateContent = async (prompt, language = "en") => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateTextContent(prompt, language);
      setResponse(result);
    } catch (err) {
      setError(err.message);
      console.error("Generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateWorksheet = async (imageFile, grade, language = "en") => {
    setIsLoading(true);
    setError(null);
    try {
      const imagePart = {
        inlineData: {
          data: await toBase64(imageFile),
          mimeType: imageFile.type,
        },
      };
      const result = await generateWorksheetFromImage([imagePart], grade, language);
      setResponse(result);
    } catch (err) {
      setError(err.message);
      console.error("Worksheet generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  return {
    response,
    isLoading,
    error,
    generateContent,
    generateWorksheet,
    resetResponse: () => setResponse(""),
  };
};