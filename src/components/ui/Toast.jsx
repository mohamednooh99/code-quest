import React from "react";

const Toast = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`px-4 py-2 rounded-lg shadow-lg text-white ${
            notification.type === "error" ? "bg-red-500" : "bg-green-500"
          } animate-slide-in`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
