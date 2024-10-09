"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function NewsPage() {
  const [news, setNews] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchNewsItem = async () => {
        try {
          const response = await fetch(`/api/news/${id}`);
          const data = await response.json();
          setNews(data);
        } catch (error) {
          console.error("Error fetching news item:", error);
        }
      };

      fetchNewsItem();
    }
  }, [id]);

  if (!news) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{news.title}</h1>
      <p className="text-gray-700 text-xl my-3">{news.content}</p>
      <p className="text-gray-500 text-md my-2">วันที่: {news.date}</p>
    </div>
  );
}
