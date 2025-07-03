import { generateTextContent, generateChildFriendlyExplanation } from "../src/services/gemini";

// Mock the GoogleGenerativeAI module
jest.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          generateContent: jest.fn().mockResolvedValue({
            response: {
              text: jest.fn().mockReturnValue("Mock AI response")
            }
          })
        })
      };
    })
  };
});

describe("Gemini API Service", () => {
  describe("generateTextContent", () => {
    it("should generate text content with the given prompt", async () => {
      const prompt = "Tell me a story about a brave rabbit";
      const result = await generateTextContent(prompt);
      expect(result).toBe("Mock AI response");
    });
    
    it("should include language in the prompt", async () => {
      const prompt = "Tell me a story";
      const language = "hi";
      await generateTextContent(prompt, language);
      
      // Verify the language was included in the prompt
      const mockGenerateContent = require("@google/generative-ai").GoogleGenerativeAI.mock.results[0].value.getGenerativeModel.mock.results[0].value.generateContent;
      const fullPrompt = mockGenerateContent.mock.calls[1][0];
      expect(fullPrompt).toContain("Respond in hi");
    });
  });
  
  describe("generateChildFriendlyExplanation", () => {
    it("should generate a child-friendly explanation", async () => {
      const question = "Why is the sky blue?";
      const result = await generateChildFriendlyExplanation(question);
      expect(result).toBe("Mock AI response");
    });
    
    it("should format the prompt correctly", async () => {
      const question = "Why do we have seasons?";
      await generateChildFriendlyExplanation(question);
      
      const mockGenerateContent = require("@google/generative-ai").GoogleGenerativeAI.mock.results[0].value.getGenerativeModel.mock.results[0].value.generateContent;
      const fullPrompt = mockGenerateContent.mock.calls[3][0];
      expect(fullPrompt).toContain("Explain this concept in simple terms");
      expect(fullPrompt).toContain("everyday analogy");
      expect(fullPrompt).toContain("Key takeaways");
    });
  });
});