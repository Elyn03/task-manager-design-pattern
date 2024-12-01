import React, { useState, useEffect } from "react";
import { SetStateAction } from "react";

import "../Notification.css";

interface NotificationProps {
  message: string;
  setMessage: (action: SetStateAction<string>) => void;
  duration?: number; // Duration in milliseconds
}

const Notification: React.FC<NotificationProps> = ({
  message,
  setMessage,
  duration = 3000000,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setMessage("");
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  return <div className={`toast ${visible ? "show" : ""}`}>{message}</div>;
};

export default Notification;
