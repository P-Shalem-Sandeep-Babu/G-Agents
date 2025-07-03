import { useState } from 'react';
import SpeechAnalyzer from '../components/SpeechAnalyzer';
import { useAuth } from '../contexts/AuthContext';
import { saveUserContent } from '../firebase/firestore';
import { FiSave } from 'react-icons/fi';

export default function SpeechAnalysis() {
  const { currentUser } = useAuth();
  const [results, setResults] = useState(null);

  const handleSaveResults = async () => {
    if (!results || !currentUser) return;
    
    try {
      await saveUserContent(currentUser.uid, 'assessment', {
        type: 'speech',
        score: results.fluencyScore,
        transcript: results.transcript,
        feedback: results.feedback
      });
      alert('Results saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save results');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Speech Analysis</h1>
      <div className="max-w-3xl mx-auto">
        <SpeechAnalyzer onResults={setResults} />
        
        {results && (
          <button
            onClick={handleSaveResults}
            className="mt-6 btn-primary flex items-center gap-2"
          >
            <FiSave /> Save Assessment
          </button>
        )}
      </div>
    </div>
  );
}