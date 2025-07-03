import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserContent } from '../firebase/firestore';
import EmptyState from '../components/EmptyState';
import GamePreview from '../components/GamePreview';

export default function Games() {
  const { currentUser } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      if (currentUser) {
        const data = await getUserContent(currentUser.uid, 'game');
        setGames(data);
      }
      setLoading(false);
    };
    fetchGames();
  }, [currentUser]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Educational Games</h1>
      
      {games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <GamePreview key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No Games Generated"
          description="Create your first game using the Game Generator"
        />
      )}
    </div>
  );
}