import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const newsId = parseInt(id, 10);
  const response = await fetch(
    `http://127.0.0.1:8080/news/getNewsById/${newsId}`
  );
  const data = await response.json();
  console.log("data", data);

  if (data) {
    return NextResponse.json(data);
  } else {
    console.error(`News with id ${id} not found`);
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }
}
