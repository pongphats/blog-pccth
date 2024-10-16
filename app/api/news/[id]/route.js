import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const newsId = parseInt(id, 10);
  const response = await fetch(
    `http://127.0.0.1:8080/news/getNewsById/${newsId}`,
    { cache: "no-store" }
  );

  const data = await response.json();

  if (data) {
    return NextResponse.json(data);
  } else {
    console.error(`News with id ${id} not found`);
    return NextResponse.json({ error: "News not found" }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const updatedNews = await request.json();
  const newsId = parseInt(id, 10);

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/news/updateNews/${newsId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNews),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update news");
    }

    const updatedNewsFromAPI = await response.json();
    return NextResponse.json(updatedNewsFromAPI);
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const newsId = parseInt(id, 10);

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/news/deleteNews/${newsId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete news");
    }

    return NextResponse.json({ message: "News deleted" });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
