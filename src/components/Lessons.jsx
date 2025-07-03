import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserContent } from '../firebase/firestore';
import ContentGrid from '../components/ContentGrid';
import EmptyState from '../components/EmptyState';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Lessons() {
  const { currentUser } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      if (currentUser) {
        const data = await getUserContent(currentUser.uid, 'lesson');
        setLessons(data.map(doc => ({ ...doc, type: 'lesson' })));
      }
      setLoading(false);
    };
    fetchLessons();
  }, [currentUser]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Lesson Plans</h1>
        <Link 
          to="/lessons/new" 
          className="btn-primary flex items-center gap-2"
        >
          <FiPlus /> New Lesson
        </Link>
      </div>
      
      {lessons.length > 0 ? (
        <ContentGrid items={lessons} />
      ) : (
        <EmptyState 
          title="No Lessons Created"
          description="Get started by creating your first lesson plan"
        />
      )}
    </div>
  );
}