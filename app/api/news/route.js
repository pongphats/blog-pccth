import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

let newsData = [];

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
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]; // รับ token จาก headers

    if (!token) {
      return NextResponse.json(
        { message: "ไม่พบ Token การยืนยันตัวตน" },
        { status: 401 }
      );
    }

    const newNews = await request.json();
    const response = await fetch(
      `${process.env.BACKEND_HOST}/news/createNews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // เพิ่ม token ในส่วน headers
        },
        body: JSON.stringify(newNews),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "ไม่สามารถสร้างข่าวใหม่ได้");
    }

    const createdNews = await response.json();
    newsData.push(createdNews);
    return NextResponse.json(createdNews, { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      {
        message: "เกิดข้อผิดพลาดในการสร้างข่าว",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
