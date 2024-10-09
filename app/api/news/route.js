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

// GET: Fetch all news
export async function GET() {
  return NextResponse.json(newsData);
}

// POST: Create a new news item
export async function POST(request) {
  const newNews = await request.json();
  newNews.id = newsData.length + 1; // Simple ID generation
  newsData.push(newNews);
  return NextResponse.json(newNews, { status: 201 });
}

// PUT: Update an existing news item
export async function PUT(request) {
  const updatedNews = await request.json();
  const index = newsData.findIndex((news) => news.id === updatedNews.id);
  if (index !== -1) {
    newsData[index] = updatedNews;
    return NextResponse.json(updatedNews);
  } else {
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }
}

// DELETE: Remove a news item
export async function DELETE(request) {
  const { id } = await request.json();
  const index = newsData.findIndex((news) => news.id === id);
  if (index !== -1) {
    newsData.splice(index, 1);
    return NextResponse.json({ message: "News deleted" });
  } else {
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }
}
