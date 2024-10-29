"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [userCount, setUserCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await fetch("/json/users.json");
      const users = await usersResponse.json();
      setUserCount(users.length);

      const commentsResponse = await fetch("/json/contact_data.json");
      const comments = await commentsResponse.json();
      setCommentCount(comments.length);

      const notificationsResponse = await fetch("/api/notifications");
      const notifications = await notificationsResponse.json();
      setNotificationCount(notifications.length);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };

  return (
    <div className="p-4 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">แดชบอร์ด</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 dark:bg-blue-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">
            จำนวนผู้ใช้
          </h2>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-300">
            {userCount}
          </p>
          <Link
            href="/users"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            ดูรายชื่อผู้ใช้ทั้งหมด
          </Link>
        </div>

        <div className="bg-green-100 dark:bg-green-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">
            จำนวนความคิดเห็น
          </h2>
          <p className="text-4xl font-bold text-green-600 dark:text-green-300">
            {commentCount}
          </p>
          <Link
            href="/comment"
            className="text-green-500 hover:underline mt-2 inline-block"
          >
            ดูความคิดเห็นทั้งหมด
          </Link>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
            จำนวนการแจ้งเตือน
          </h2>
          <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-300">
            {notificationCount}
          </p>
          <Link
            href="/notifications"
            className="text-yellow-500 hover:underline mt-2 inline-block"
          >
            ดูการแจ้งเตือนทั้งหมด
          </Link>
        </div>
      </div>

      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/users" className="text-blue-500 hover:underline">
              จัดการรายชื่อผู้ใช้
            </Link>
          </li>
          <li>
            <Link href="/comment" className="text-green-500 hover:underline">
              จัดการความคิดเห็น
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-purple-500 hover:underline">
              เกี่ยวกับเรา
            </Link>
          </li>
          <li>
            <Link
              href="/notifications"
              className="text-yellow-500 hover:underline"
            >
              การแจ้งเตือน
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
