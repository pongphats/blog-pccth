// app/api/blog/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET: Fetch all blog posts
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
      `${process.env.BACKEND_HOST}/posts/getAllPosts`,
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

    const blogs = await response.json();
    console.log("in")
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Blog API Error:", error);
    return NextResponse.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลบทความ",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST: Create a new blog post
export async function POST(req) {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "ไม่พบ Token การยืนยันตัวตน" },
        { status: 401 }
      );
    }

    const newBlog = await req.json();

    const reqData = {
      PostHeader: newBlog.header,
      PostBody: newBlog.body,
      PostCreateBy: newBlog.createBy || "anonymous",
    };

    const response = await fetch(
      `${process.env.BACKEND_HOST}/posts/createPost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqData),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "ไม่สามารถสร้างบทความใหม่ได้");
    }

    const resData = await response.json();
    return NextResponse.json(resData, { status: 201 });
  } catch (error) {
    console.error("Blog API Error:", error);
    return NextResponse.json(
      {
        message: "เกิดข้อผิดพลาดในการสร้างบทความ",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
