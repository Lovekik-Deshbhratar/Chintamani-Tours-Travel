import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [type, setType] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    // Hide notification after 3 seconds
    const time = setTimeout(() => {
      setShowNotification(false);
    }, 1400);

    return () => clearTimeout(time);
  }, [showNotification]);

  const notificationHandler = (args) => {
    setType(args.type);
    setMessage(args.message);
    setShowNotification(true);
  };
  return (
    <NotificationContext.Provider
      value={{ notificationHandler, showNotification, type, message }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
