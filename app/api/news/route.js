import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

let newsData = [];

// GET: Fetch all news
// export async function GET() {
//   await fetchNewsFromAPI(); // ดึงข้อมูลก่อนส่งกลับ
//   console.log("Returning news data:", newsData); // ตรวจสอบข้อมูลที่ส่งกลับ
//   return NextResponse.json(newsData);
// }

export async function GET(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]; // รับ token จาก headers

    if (!token) {
      return NextResponse.json(
        { message: "ไม่พบ Token การยืนยันตัวตน" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.BACKEND_HOST}/news/getAllNews`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "ไม่สามารถดึงข้อมูลจาก API ได้");
    }

    const news = await response.json();
    return NextResponse.json(news);
  } catch (error) {
    console.error("news API Error:", error);
    return NextResponse.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลบทความ",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST: Create a new news item
export async function POST(request) {
  const newNews = await request.json();
  try {
    console.log(newNews);
    const response = await fetch("http://127.0.0.1:8080/news/createNews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNews),
    });

    if (!response.ok) {
      throw new Error("Failed to create news");
    }

    const createdNews = await response.json();
    newsData.push(createdNews); // Update local newsData with the created news
    return NextResponse.json(createdNews, { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing news item
export async function PUT(request) {
  const updatedNews = await request.json();
  const newsId = updatedNews.id;
  // Assuming the updated news object contains an 'id' field

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
    const index = newsData.findIndex((news) => news.id === newsId);
    if (index !== -1) {
      revalidatePath("/news");
      newsData[index] = updatedNewsFromAPI; // Update local newsData with the updated news
      return NextResponse.json(updatedNewsFromAPI);
    } else {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a news item
export async function DELETE(request) {
  const { id } = await request.json();
  const newsId = parseInt(id, 10); // Ensure the ID is an integer

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

    // Optionally, you can remove the deleted item from local newsData
    const index = newsData.findIndex((news) => news.id === newsId);
    if (index !== -1) {
      newsData.splice(index, 1);
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
