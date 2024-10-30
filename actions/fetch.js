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

// ฟังก์ชันสำหรับดึงข้อมูล 'บล็อก'
export async function fetchBlogData() {
  try {
    const token = cookies().get("token")?.value;     
    if (!token) {
      throw new Error("No access token");
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

   const data = await response.json();
   // เพิ่ม delay 1 วินาที
   await new Promise((resolve) => setTimeout(resolve, 1000));
   return data.data.sort((a, b) => a.newsId - b.newsId);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลบล็อก:", error);
    return [];
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลโปรไฟล์
export async function fetchProfileData() {
  try {
    const token = cookies().get("token")?.value;     
    if (!token) {
      throw new Error("ไม่พบ token สำหรับการเข้าถึง");
    }

    const response = await fetch(
      `${process.env.KEYCLOAK_HOST}/api/app/getprofile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ตรวจสอบว่าข้อมูลที่ได้รับมีโครงสร้างที่ถูกต้อง
    if (!data.data) {
      throw new Error("ข้อมูลที่ได้รับไม่ถูกต้อง");
    }

    return data.data;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์:", error.message);
    throw error;
  }
}

