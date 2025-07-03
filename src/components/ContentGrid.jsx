import { Link } from 'react-router-dom';
import { FiFileText, FiBook, FiActivity } from 'react-icons/fi';

const ContentGrid = ({ items }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'worksheet': return <FiFileText className="text-blue-500" />;
      case 'lesson': return <FiBook className="text-green-500" />;
      default: return <FiActivity className="text-purple-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            {getIcon(item.type)}
            <h3 className="font-medium">{item.title || 'Untitled'}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {item.description || 'No description available'}
          </p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{new Date(item.createdAt?.toDate()).toLocaleDateString()}</span>
            <Link 
              to={`/${item.type}s/${item.id}`} 
              className="text-blue-600 hover:underline"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentGrid;