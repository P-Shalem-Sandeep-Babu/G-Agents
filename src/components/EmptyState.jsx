import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ 
  title = "No content found", 
  description = "Get started by creating new content",
  action = null 
}) => {
  return (
    <div className="text-center py-12">
      <FiInbox className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;