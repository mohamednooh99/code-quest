import { useState } from "react";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "success") => {
    const id = Date.now();

    setNotifications((prev) => {
      // clone
      const updated = [...prev];
      // edit
      updated.push({ id, message, type });
      // update
      return updated;
    });

    // timer to remove notify
    setTimeout(() => {
      setNotifications((prev) => {
        // clone
        const updated = [...prev];
        // edit
        const filtered = updated.filter((n) => n.id !== id);
        // update
        return filtered;
      });
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => {
      // clone
      const updated = [...prev];
      // edit and update
      return updated.filter((n) => n.id !== id);
    });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};
