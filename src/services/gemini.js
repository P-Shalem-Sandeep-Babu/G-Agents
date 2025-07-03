import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Initialize the generative model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const visionModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

// Function to generate text content (stories, explanations, etc.)
export const generateTextContent = async (prompt, language = "en") => {
  try {
    // Adjust prompt based on language
    const fullPrompt = `Respond in ${language}. ${prompt} 
      Make sure the response is culturally appropriate for ${language} speakers 
      and uses simple language suitable for primary school children.`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating text content:", error);
    throw error;
  }
};

// Function to generate worksheets from textbook images
export const generateWorksheetFromImage = async (imageParts, gradeLevel, language = "en") => {
  try {
    const prompt = `Generate a differentiated worksheet suitable for grade ${gradeLevel} students in ${language} based on this textbook page. 
      Include 3 sections with increasing difficulty:
      1. Basic comprehension questions
      2. Application questions
      3. Creative extension activity
      
      Format the output with clear headings and space for answers.`;
    
    const result = await visionModel.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating worksheet:", error);
    throw error;
  }
};

// Function to generate child-friendly explanations
export const generateChildFriendlyExplanation = async (question, language = "en") => {
  try {
    const prompt = `Explain this concept in simple terms suitable for a 8-year-old child who speaks ${language}: ${question}
      Use a relatable analogy and break it down into 3 key points.
      Format as:
      1. Simple explanation
      2. Everyday analogy
      3. Key takeaways`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating explanation:", error);
    throw error;
  }
};

// Function to generate simple diagrams (SVG format)
export const generateDiagram = async (concept, language = "en") => {
  try {
    const prompt = `Generate SVG code for a simple line diagram illustrating ${concept} suitable for primary school children.
      The SVG should be:
      - Black and white
      - Simple lines and shapes
      - Labeled in ${language}
      - 500x300 pixels
      - Include a title at the top
      
      Return ONLY the SVG code with no additional text or explanation.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating diagram:", error);
    throw error;
  }
};

// Function to generate lesson plans
export const generateLessonPlan = async (syllabus, grade, language = "en") => {
  try {
    const prompt = `Create a detailed 5-day lesson plan for grade ${grade} covering: ${syllabus}
      Language: ${language}
      Include for each day:
      1. Learning objectives
      2. Warm-up activity
      3. Main lesson content
      4. Group activity
      5. Assessment question
      6. Homework suggestion
      
      Format as a structured table with clear headings.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    throw error;
  }
};

// Function to generate simple educational games
export const generateEducationalGame = async (topic, grade, language = "en") => {
  try {
    const prompt = `Create a simple drag-and-drop HTML game for grade ${grade} students about ${topic} in ${language}.
      The game should:
      - Have 5-10 items to match
      - Include simple instructions in ${language}
      - Be suitable for a 30-minute classroom activity
      - Use basic HTML/CSS/JavaScript
      
      Return the complete HTML code with embedded CSS and JavaScript.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating game:", error);
    throw error;
  }
};