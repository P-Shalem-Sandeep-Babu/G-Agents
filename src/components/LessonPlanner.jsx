import { useState } from "react";
import { generateLessonPlan } from "../services/gemini";
import { saveUserContent } from "../firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import PDFExporter from "./PDFExporter";

const LessonPlanner = ({ language }) => {
  const { currentUser } = useAuth();
  const [syllabus, setSyllabus] = useState("");
  const [grade, setGrade] = useState("3");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lessonPlan, setLessonPlan] = useState("");
  
  const generatePlan = async () => {
    if (!syllabus.trim()) return;
    
    setIsGenerating(true);
    try {
      const plan = await generateLessonPlan(syllabus, grade, language);
      setLessonPlan(plan);
    } catch (error) {
      console.error("Error generating lesson plan:", error);
      alert("Failed to generate lesson plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const savePlan = async () => {
    if (!lessonPlan || !currentUser) return;
    
    try {
      await saveUserContent(currentUser.uid, "lesson", {
        syllabus,
        grade,
        language,
        content: lessonPlan
      });
      alert("Lesson plan saved successfully!");
    } catch (error) {
      console.error("Error saving lesson plan:", error);
      alert("Failed to save lesson plan.");
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Lesson Plan Generator</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            Grade Level
          </label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {[1, 2, 3, 4, 5].map((g) => (
              <option key={g} value={g.toString()}>
                Grade {g}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="syllabus" className="block text-sm font-medium text-gray-700 mb-1">
            Syllabus/Topic
          </label>
          <textarea
            id="syllabus"
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            placeholder="Enter the syllabus or topic you want to cover (e.g., 'Water cycle for science class')"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={3}
          />
        </div>
        
        <button
          onClick={generatePlan}
          disabled={isGenerating || !syllabus.trim()}
          className={`px-4 py-2 rounded-md text-white ${isGenerating || !syllabus.trim() ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} flex items-center space-x-2`}
        >
          {isGenerating ? (
            <>
              <span>Generating...</span>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            <span>Generate Lesson Plan</span>
          )}
        </button>
      </div>
      
      {lessonPlan && (
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">Your Lesson Plan</h4>
            <div className="flex space-x-2">
              {currentUser && (
                <button
                  onClick={savePlan}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Save Plan
                </button>
              )}
              <PDFExporter 
                content={lessonPlan} 
                fileName={`lesson-plan-grade-${grade}.pdf`} 
              />
            </div>
          </div>
          
          <div className="prose max-w-none bg-gray-50 p-4 rounded-md border border-gray-200">
            <pre className="whitespace-pre-wrap font-sans">{lessonPlan}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPlanner;