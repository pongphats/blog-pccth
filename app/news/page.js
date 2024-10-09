"use client";

import { useEffect, useState } from "react";
import NewCard from "../components/Newcard";

export default function NewsListPage() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNewsData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ข้อมูลข่าวสาร</h1>
      <ul>
        {newsData.map((news) => (
          <NewCard key={news.id} news={news} />
        ))}
      </ul>
    </div>
  );
}
