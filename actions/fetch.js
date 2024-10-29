"use server"

import { cookies } from "next/headers";

// ฟังก์ชันสำหรับดึงข้อมูลข่าวสาร
export async function fetchNewsData() {
   try {
     const token = cookies().get("token")?.value;     
     if (!token) {
       throw new Error("No access token");
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

    const data = await response.json();
    // เพิ่ม delay 1 วินาที
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data.data.sort((a, b) => a.newsId - b.newsId);
   } catch (error) {
     console.error("เกิดข้อผิดพลาดในการดึงข้อมูลข่าวสาร:", error);
     return [];
   }
}