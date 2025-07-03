import { useState } from 'react';
import PromptInput from '../components/PromptInput';
import AIResponseViewer from '../components/AIResponseViewer';

export default function Assistant() {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (prompt) => {
    setIsLoading(true);
    // In a real app, call Gemini API here
    setTimeout(() => {
      setResponse(`Mock response for: ${prompt}`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6">
      <PromptInput onSubmit={handleSubmit} isLoading={isLoading} />
      <AIResponseViewer content={response} isLoading={isLoading} />
    </div>
  );
}