import { useState } from "react";
import { generateEducationalGame } from "../services/gemini";
import { saveUserContent } from "../firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const GameGenerator = ({ language }) => {
  const { currentUser } = useAuth();
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("3");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameCode, setGameCode] = useState("");
  
  const generateGame = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    try {
      const code = await generateEducationalGame(topic, grade, language);
      setGameCode(code);
    } catch (error) {
      console.error("Error generating game:", error);
      alert("Failed to generate game. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const saveGame = async () => {
    if (!gameCode || !currentUser) return;
    
    try {
      await saveUserContent(currentUser.uid, "game", {
        topic,
        grade,
        language,
        code: gameCode
      });
      alert("Game saved successfully!");
    } catch (error) {
      console.error("Error saving game:", error);
      alert("Failed to save game.");
    }
  };
  
  const previewGame = () => {
    if (!gameCode) return;
    
    const previewWindow = window.open("", "_blank");
    previewWindow.document.write(gameCode);
    previewWindow.document.close();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Educational Game Generator</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="game-grade" className="block text-sm font-medium text-gray-700 mb-1">
            Grade Level
          </label>
          <select
            id="game-grade"
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
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Game Topic
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic for the game (e.g., 'Animal names', 'Multiplication tables')"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <button
          onClick={generateGame}
          disabled={isGenerating || !topic.trim()}
          className={`px-4 py-2 rounded-md text-white ${isGenerating || !topic.trim() ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} flex items-center space-x-2`}
        >
          {isGenerating ? (
            <>
              <span>Generating...</span>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            <span>Generate Game</span>
          )}
        </button>
      </div>
      
      {gameCode && (
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">Your Game</h4>
            <div className="flex space-x-2">
              {currentUser && (
                <button
                  onClick={saveGame}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  Save Game
                </button>
              )}
              <button
                onClick={previewGame}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Preview Game
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 max-h-64 overflow-y-auto">
            <pre className="text-xs whitespace-pre-wrap">{gameCode}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameGenerator;