import { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiX } from "react-icons/fi";

const ToastNotification = ({ message, type = "success", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const typeStyles = {
    success: {
      bg: "bg-green-50",
      text: "text-green-800",
      icon: <FiCheckCircle className="text-green-500" size={20} />,
    },
    error: {
      bg: "bg-red-50",
      text: "text-red-800",
      icon: <FiXCircle className="text-red-500" size={20} />,
    },
    warning: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      icon: <FiAlertCircle className="text-yellow-500" size={20} />,
    },
  };

  const currentStyle = typeStyles[type] || typeStyles.success;

  return (
    <div
      className={`fixed bottom-4 right-4 ${currentStyle.bg} ${currentStyle.text} rounded-lg shadow-lg p-4 max-w-xs flex items-start space-x-3 z-50 animate-fade-in-up`}
    >
      <div className="flex-shrink-0">{currentStyle.icon}</div>
      <div className="flex-1 text-sm font-medium">{message}</div>
      <button
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        className="text-gray-400 hover:text-gray-500"
      >
        <FiX size={18} />
      </button>
    </div>
  );
};

export default ToastNotification;