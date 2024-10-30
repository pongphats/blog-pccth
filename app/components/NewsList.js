"use client";

import NewCard from "@/app/components/Newcard";

export default function NewsList({ newsData }) {
  return (
    <ul>
      {newsData.map((news) => (
        <NewCard key={news.newsId} news={news} />
      ))}
    </ul>
  );
}
