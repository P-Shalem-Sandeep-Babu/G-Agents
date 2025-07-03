import { useState, useEffect } from "react";
import { FiCopy, FiDownload, FiSave, FiPrinter } from "react-icons/fi";
import logo from "@/assets/logo.png";

const AIResponseViewer = ({ content, onSave, onExport, isLoading }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleExport = (format) => {
    onExport(format);
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full"></div>
          <div className="text-indigo-600 font-medium">Sandy is thinking...</div>
        </div>
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center h-64">
        <div className="text-gray-500 text-center">
          <p className="text-lg">👩‍🏫 Welcome to Sandy!</p>
          <p className="mt-2">Enter a prompt to get started</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-700">Sandy's Response</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded hover:bg-gray-200 text-gray-600"
            title="Copy to clipboard"
          >
            <FiCopy size={18} />
            {copied && <span className="ml-1 text-xs text-green-600">Copied!</span>}
          </button>
          <button
            onClick={() => handleExport("pdf")}
            className="p-2 rounded hover:bg-gray-200 text-gray-600"
            title="Download as PDF"
          >
            <FiDownload size={18} />
          </button>
          <button
            onClick={onSave}
            className="p-2 rounded hover:bg-gray-200 text-gray-600"
            title="Save to cloud"
          >
            <FiSave size={18} />
          </button>
          <button
            onClick={() => window.print()}
            className="p-2 rounded hover:bg-gray-200 text-gray-600"
            title="Print"
          >
            <FiPrinter size={18} />
          </button>
        </div>
      </div>
      <div className="p-6 max-h-96 overflow-y-auto">
        {content.startsWith("<svg") ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formatResponse(content) }} />
        )}
      </div>
    </div>
  );
};

// Helper function to format the response text
const formatResponse = (text) => {
  // Convert markdown-like formatting to HTML
  let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
  formatted = formatted.replace(/^# (.*$)/gm, "<h3>$1</h3>");
  formatted = formatted.replace(/^## (.*$)/gm, "<h4>$1</h4>");
  formatted = formatted.replace(/\n/g, "<br />");
  
  // Format lists
  formatted = formatted.replace(/^\d+\. (.*$)/gm, "<li>$1</li>");
  formatted = formatted.replace(/^-(.*$)/gm, "<li>$1</li>");
  
  return formatted;
};

export default AIResponseViewer;