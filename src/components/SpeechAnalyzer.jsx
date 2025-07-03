import { useState, useRef } from "react";
import { analyzeSpeech } from "../services/speech";
import { FiUpload, FiMic, FiVolume2 } from "react-icons/fi";

const SpeechAnalyzer = ({ language }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setResults(null);
      
      // Create a preview URL for the audio player
      const audioURL = URL.createObjectURL(file);
      if (audioRef.current) {
        audioRef.current.src = audioURL;
      }
    }
  };
  
  const analyzeAudio = async () => {
    if (!audioFile) return;
    
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeSpeech(audioFile, language);
      setResults(analysis);
    } catch (error) {
      console.error("Error analyzing speech:", error);
      alert("Failed to analyze audio. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Student Reading Assessment</h3>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Upload student's reading audio</label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 flex items-center space-x-1"
          >
            <FiUpload size={16} />
            <span>Choose File</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
          />
          {audioFile && (
            <span className="text-sm text-gray-600 truncate max-w-xs">{audioFile.name}</span>
          )}
        </div>
      </div>
      
      {audioFile && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FiVolume2 className="text-gray-500" />
            <audio ref={audioRef} controls className="w-full" />
          </div>
          
          <button
            onClick={analyzeAudio}
            disabled={isAnalyzing}
            className={`px-4 py-2 rounded-md text-white ${isAnalyzing ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"} flex items-center space-x-2`}
          >
            {isAnalyzing ? (
              <>
                <span>Analyzing...</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              <>
                <FiMic size={16} />
                <span>Analyze Pronunciation</span>
              </>
            )}
          </button>
        </div>
      )}
      
      {results && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Analysis Results</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Fluency Score</span>
                <span className="font-medium">{results.fluencyScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${results.fluencyScore > 80 ? "bg-green-500" : results.fluencyScore > 60 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${results.fluencyScore}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pronunciation</span>
                <span className="font-medium">{results.pronunciationScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${results.pronunciationScore > 80 ? "bg-green-500" : results.pronunciationScore > 60 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${results.pronunciationScore}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-700 mb-1">Transcript</h5>
            <p className="text-sm bg-white p-2 rounded border border-gray-200">{results.transcript}</p>
          </div>
          
          <div className="mt-3">
            <h5 className="text-sm font-medium text-gray-700 mb-1">Feedback</h5>
            <p className="text-sm bg-white p-2 rounded border border-gray-200">{results.feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechAnalyzer;