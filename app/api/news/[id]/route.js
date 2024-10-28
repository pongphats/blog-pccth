import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]; // รับ token จาก headers

    if (!token) {
      return NextResponse.json(
        { message: "ไม่พบ Token การยืนยันตัวตน" },
        { status: 401 }
      );
    }

    const { id } = params;
    const newsId = parseInt(id, 10);

    const response = await fetch(
      `${process.env.BACKEND_HOST}/news/getNewsById/${newsId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "ไม่สามารถดึงข้อมูลข่าวได้");
    }

    const data = await response.json();

    if (data) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { message: "ไม่พบข่าวที่ต้องการ" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(`Error fetching news with id ${params.id}:`, error);
    return NextResponse.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลข่าว",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT: Update an existing news item
export async function PUT(request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]; // รับ token จาก headers

    if (!token) {
      return NextResponse.json(
        { message: "ไม่พบ Token การยืนยันตัวตน" },
        { status: 401 }
      );
    }

    const updatedNews = await request.json();
    const newsId = updatedNews.id;

    const response = await fetch(
      `${process.env.BACKEND_HOST}/news/updateNews/${newsId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedNews),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "ไม่สามารถอัพเดทข่าวได้");
    }

    const updatedNewsFromAPI = await response.json();
    return NextResponse.json(updatedNewsFromAPI);
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      {
        message: "เกิดข้อผิดพลาดในการอัพเดทข่าว",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove a news item
export async function DELETE(request, { params }) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1]; // รับ token จาก headers

    if (!token) {
      return NextResponse.json(
        { message: "ไม่พบ Token การยืนยันตัวตน" },
        { status: 401 }
      );
    }

    const { id } = params; // รับ id จาก params แทน
    const newsId = parseInt(id, 10);

    const response = await fetch(
      `${process.env.BACKEND_HOST}/news/deleteNews/${newsId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "ไม่สามารถลบข่าวได้");
    }

    return NextResponse.json({ message: "ลบข่าวเรียบร้อยแล้ว" });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข่าว",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
