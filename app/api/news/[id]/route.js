import { NextResponse } from "next/server";

let newsData = [
  {
    id: 1,
    title: "ข่าวที่ 1",
    content: "รายละเอียดของข่าวที่ 1",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: "ข่าวที่ 2",
    content: "รายละเอียดของข่าวที่ 2",
    date: "2023-10-02",
  },
  // ... more news items
];

export async function GET(request, { params }) {
  const { id } = params;
  const newsItem = newsData.find((news) => news.id === parseInt(id));

  if (newsItem) {
    return NextResponse.json(newsItem);
  } else {
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }
}
