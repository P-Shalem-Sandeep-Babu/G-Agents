import { useAuth } from '../contexts/AuthContext';
import { saveUserContent } from '../firebase/firestore';
import { useState } from 'react';

export const useContentActions = () => {
  const { currentUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const saveContent = async (contentType, contentData) => {
    if (!currentUser) return;
    
    setIsSaving(true);
    try {
      await saveUserContent(currentUser.uid, contentType, contentData);
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return { saveContent, isSaving };
};