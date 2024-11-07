import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "ไม่พบ Token การยืนยันตัวตน" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const backendFormData = new FormData();
    backendFormData.append("video", formData.get("video"));
    backendFormData.append("title", formData.get("title"));
    backendFormData.append("description", formData.get("description"));
    backendFormData.append("createBy", formData.get("createBy"));

    const response = await fetch(`${process.env.BACKEND_HOST}/upload/video`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: backendFormData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "ไม่สามารถอัพโหลดวิดีโอได้");
    }

    const resData = await response.json();
    return NextResponse.json(resData, { status: 201 });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      {
        message: "เกิดข้อผิดพลาดในการอัพโหลดวิดีโอ",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
