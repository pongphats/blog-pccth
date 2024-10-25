'use client';

import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'การแจ้งเตือน', href: '/notifications' },
  ];

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`/api/notifications?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotifications(notifications.filter(notification => notification.id !== id));
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
      }
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mb-4">การแจ้งเตือน</h1>
      {notifications.length > 0 ? (
        <>
          <button
            onClick={clearAllNotifications}
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            ลบการแจ้งเตือนทั้งหมด
          </button>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg">{notification.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  ลบ
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>ไม่มีการแจ้งเตือนใหม่</p>
      )}
    </div>
  );
}