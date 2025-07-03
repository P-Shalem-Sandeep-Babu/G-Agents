import { useState, useRef } from "react";
import { FiMic, FiImage, FiUpload, FiSend } from "react-icons/fi";

const PromptInput = ({
  onSubmit,
  onImageUpload,
  onAudioUpload,
  isLoading,
  language
}) => {
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const audioInputRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt("");
    }
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };
  
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onAudioUpload(file);
    }
  };
  
  const startRecording = () => {
    setIsRecording(true);
    // In a real app, you would initialize the Web Speech API here
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, you would process the recorded audio here
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            title="Upload image"
          >
            <FiImage size={20} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          <button
            type="button"
            onClick={() => audioInputRef.current.click()}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            title="Upload audio"
          >
            <FiUpload size={20} />
          </button>
          <input
            type="file"
            ref={audioInputRef}
            onChange={handleAudioUpload}
            accept="audio/*"
            className="hidden"
          />
          
          <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className={`p-2 rounded-full hover:bg-gray-100 ${isRecording ? "text-red-500" : "text-gray-600"}`}
            title="Record audio"
          >
            <FiMic size={20} />
          </button>
        </div>
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Ask Sandy anything in ${language}...`}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={4}
          disabled={isLoading}
        />
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`px-4 py-2 rounded-md text-white ${isLoading || !prompt.trim() ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} flex items-center space-x-1`}
          >
            {isLoading ? (
              <>
                <span>Generating...</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              <>
                <span>Ask Sandy</span>
                <FiSend size={16} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;