import { Link } from 'react-router-dom';
import { FiPlay } from 'react-icons/fi';

const GamePreview = ({ game }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h3 className="font-medium mb-2">{game.topic || 'Untitled Game'}</h3>
      <p className="text-sm text-gray-600 mb-4">
        For Grade {game.grade || 'N/A'}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {new Date(game.createdAt?.toDate()).toLocaleDateString()}
        </span>
        <Link
          to={`/games/${game.id}`}
          className="btn-primary text-sm flex items-center gap-1"
        >
          <FiPlay /> Play
        </Link>
      </div>
    </div>
  );
};

export default GamePreview;