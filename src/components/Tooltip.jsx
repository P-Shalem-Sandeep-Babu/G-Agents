import { useState } from 'react';

const Tooltip = ({ text, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={`absolute ${positionClasses[position]} z-50 w-max max-w-xs px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg`}
        >
          {text}
          <div
            className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
              position === 'top' ? 'bottom-[-2px]' :
              position === 'bottom' ? 'top-[-2px]' :
              position === 'left' ? 'right-[-2px]' :
              'left-[-2px]'
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;