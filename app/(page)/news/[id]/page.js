"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";
import Dialog from "@/app/components/Dialog";
import SkeletonNewsDetail from "@/app/components/Skeleton/SkeletonNewsDetail"; // นำเข้าคอมโพเนนต์ใหม่
import { fetchProfileData } from "@/actions/fetch"; // เพิ่ม import

export default function NewsPage() {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true); // เพิ่มสถานะ loading
  const [isAdmin, setIsAdmin] = useState(false); // เพิ่ม state สำหรับเก็บสถานะ admin
  const { id } = useParams();
  const router = useRouter();

  const breadcrumbItems = [
    { label: "หน้าหลัก", href: "/" },
    { label: "หน้าข่าวสาร", href: "/news" },
    { label: "ข่าวสาร", href: `/news/${id}` },
  ];

  useEffect(() => {
    if (id) {
      const fetchNewsItem = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`/api/news/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          });
          const data = await response.json();
          // เพิ่ม delay 1000 มิลลิวินาที
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setNews(data.data);
        } catch (error) {
          console.error("Error fetching news item:", error);
        } finally {
          setLoading(false); // ตั้งค่า loading เป็น false เมื่อโหลดเสร็จ
        }
      };

      fetchNewsItem();
    }
  }, [id]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProfile(data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileData();
  }, []); // เรียกใช้เมื่อคอมโพเนนต์โหลดครั้งแรก

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const userProfile = await fetchProfileData();
        const mappings = userProfile?.clientMappings?.['sso-client-api']?.mappings || [];
        const adminStatus = mappings.some(mapping => mapping.name === 'client_admin');
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  const handleDelete = async () => {
    const confirmed = await Dialog.confirm(
      "ยืนยันการลบ",
      "คุณแน่ใจหรือว่าต้องการลบข่าวสารนี้?"
    );

    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await fetch(`/api/news/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          await Dialog.success("ลบสำเร็จ", "ข่าวสารถูกลบเรียบร้อยแล้ว");
          await new Promise((resolve, reject) => {
            return setTimeout(resolve, 500);
          });
          router.refresh();
          await new Promise((resolve, reject) => {
            return setTimeout(resolve, 500);
          });
          router.push("/news"); // Redirect to news list page after deletion
        } else {
          await Dialog.error("ลบไม่สำเร็จ", "ไม่สามารถลบข่าวสารได้");
          console.error("Failed to delete news item");
        }
      } catch (error) {
        await Dialog.error("ข้อผิดพลาด", "เกิดข้อผิดพลาดในการลบข่าวสาร");
        console.error("Error deleting news item:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-4 my-10">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-2xl font-bold mb-4 mt-5">ข้อมูลข่าวสาร</h1>
        <SkeletonNewsDetail />
      </div>
    );
  }

  if (!news) return <div>ไม่พบข้อมูลข่าวสาร</div>;

  return (
    <div className="p-4 my-10">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mb-4 mt-5 ">ข้อมูลข่าวสาร</h1>
      <div className="border rounded-lg shadow-md p-4 mb-4 relative">
        <h1 className="text-xl font-bold mb-4">{news.newsHeader}</h1>
        <div
          className="text-gray-700 my-3 dark:text-white"
          dangerouslySetInnerHTML={{ __html: news.newsBody }}
        />
        <div className="flex flex-row justify-between">
          <p className="text-gray-500 dark:text-white">
            วันที่: {new Date(news.newsCreateDate).toLocaleDateString("th-TH")}
          </p>

          {isAdmin && ( // แสดงปุ่มเฉพาะเมื่อเป็น admin
            <div className="flex flex-row gap-2">
              <Link href={`/news/editor/${news.newsId}`}>
                <div className="flex items-center text-black dark:text-white cursor-pointer hover:text-green-500">
                  <span>แก้ไข</span>
                </div>
              </Link>
              <div
                onClick={handleDelete}
                className="flex items-center text-black dark:text-white cursor-pointer hover:text-red-500"
              >
                <span>ลบ</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
