'use client';

import { Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from "@nextui-org/badge";

export default function NotificationButton({ updateNotificationCount }) {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        updateNotificationCount(data.length);
      }
    } catch (error) {
      // console.error('Error fetching notifications:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`/api/notifications?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedNotifications = notifications.filter(notification => notification.id !== id);
        setNotifications(updatedNotifications);
        updateNotificationCount(updatedNotifications.length);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      const response = await fetch('/api/notifications?id=all', {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotifications([]);
        updateNotificationCount(0);
      }
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  return (
    <div className="relative">
      <button className="hover:text-gray-300 flex flex-row"
        onClick={() => setShowNotifications(!showNotifications)}>
        <Bell />
        {notifications.length > 0 && (
          <Badge content={notifications.length} color="primary" />
        )}
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <>
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={clearAllNotifications}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  ลบการแจ้งเตือนทั้งหมด
                </button>
              </div>
              {notifications.slice().reverse().map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p className="p-4 text-sm text-gray-800 dark:text-gray-200">ไม่มีการแจ้งเตือนใหม่</p>
          )}
        </div>
      )}
    </div>
  );
}