"use client";

import { useState, useEffect } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   fetchNotifications();
  //   const interval = setInterval(fetchNotifications, 5000); // Fetch every 5 seconds
  //   return () => clearInterval(interval);
  // }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 max-w-sm">
      {notifications
        .slice(-5)
        .reverse()
        .map((notification) => (
          <div
            key={notification.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 mb-2"
          >
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {notification.message}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
    </div>
  );
}
