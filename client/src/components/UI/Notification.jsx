import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 
                  type === 'error' ? 'bg-red-500' : 
                  'bg-blue-500';

  return (
    <div className={`fixed top-20 right-5 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in-down`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;