import { useAuth } from '../contexts/AuthContext';
import { getUserContent } from '../firebase/firestore';
import { useEffect, useState } from 'react';
import ContentGrid from '../components/ContentGrid';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [content, setContent] = useState({
    lessons: [],
    worksheets: [],
    stories: []
  });

  useEffect(() => {
    const fetchContent = async () => {
      if (currentUser) {
        const lessons = await getUserContent(currentUser.uid, 'lesson');
        const worksheets = await getUserContent(currentUser.uid, 'worksheet');
        const stories = await getUserContent(currentUser.uid, 'story');
        setContent({ lessons, worksheets, stories });
      }
    };
    fetchContent();
  }, [currentUser]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Content</h1>
      <ContentGrid items={[...content.lessons, ...content.worksheets, ...content.stories]} />
    </div>
  );
}