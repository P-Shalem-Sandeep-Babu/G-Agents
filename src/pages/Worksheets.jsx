import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserContent } from '../firebase/firestore';
import ContentGrid from '../components/ContentGrid';
import EmptyState from '../components/EmptyState';

export default function Worksheets() {
  const { currentUser } = useAuth();
  const [worksheets, setWorksheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorksheets = async () => {
      if (currentUser) {
        const data = await getUserContent(currentUser.uid, 'worksheet');
        setWorksheets(data.map(doc => ({ ...doc, type: 'worksheet' })));
      }
      setLoading(false);
    };
    fetchWorksheets();
  }, [currentUser]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Worksheets</h1>
      {worksheets.length > 0 ? (
        <ContentGrid items={worksheets} />
      ) : (
        <EmptyState 
          title="No Worksheets"
          description="Generate your first worksheet using the AI Assistant"
        />
      )}
    </div>
  );
}