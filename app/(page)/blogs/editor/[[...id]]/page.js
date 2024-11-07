"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "@/app/styles/quill.css";
import { QuillFormats, QuillModules } from "@/utils/QuillConstants";
import { fetchProfileData } from "@/actions/fetch";
import Dialog from "@/app/components/Dialog";

export default function BlogEditorPage({ params }) {
  const router = useRouter();
  const id = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [labelText, setLabelText] = useState("สร้างบทความใหม่");
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // เพิ่ม state สำหรับเก็บสถานะ admin
  const [videoUrl, setVideoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      const profile = await fetchProfileData();
      setUserProfile(profile);
    };
    getUserProfile();

    if (id) {
      setLabelText("แก้ไขบทความ");
      console.log("แก้ไขบทความ");
      fetchBlogById(id);
    } else {
      setLabelText("สร้างบทความใหม่");
      console.log("สร้างบทความใหม่");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [id]);

  async function fetchBlogById(blogId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/blog/${blogId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch blog item");
      }
      const blogData = await response.json();
      setTitle(blogData.data.postHeader);
      setContent(blogData.data.postBody);
    } catch (error) {
      console.error("Error fetching blog item:", error);
      router.push("/blogs/editor");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  async function handleSave() {
    const confirmSave = await Dialog.confirm(
      "ยืนยันการบันทึก",
      "คุณแน่ใจหรือไม่ว่าต้องการบันทึบล็อกนี้?"
    );
    if (!confirmSave) {
      return;
    }

    const apiUrl = id ? `/api/blog/${id}` : `/api/blog`;
    const method = id ? "PUT" : "POST";

    const blogData = {
      header: title,
      body: content,
      createBy: userProfile?.user_id,
    };

    const token = localStorage.getItem("token");

    const response = await fetch(apiUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
      cache: "no-store",
    });

    if (response.ok) {
      await new Promise((resolve, reject) => {
        return setTimeout(resolve, 500);
      });
      router.refresh();
      await new Promise((resolve, reject) => {
        return setTimeout(resolve, 500);
      });
      router.push("/blogs");
    } else {
      console.error("Failed to save blog.");
    }
  }

  async function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadedUrl(""); // รีเซ็ต URL เมื่อเลือกไฟล์ใหม่
    }
  }

  async function handleVideoUpload() {
    if (!selectedFile) {
      console.log("กรุณาเลือกไฟล์วิดีโอ");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("title", title || "Untitled");
    formData.append("description", "Blog video");
    formData.append("createBy", userProfile?.user_id);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("อัพโหลดวิดีโอไม่สำเร็จ");
      }

      const data = await response.json();
      setUploadedUrl(data.fullURL);
      setVideoUrl(data.fullURL);

      // เพิ่ม URL วิดีโอลงในเนื้อหาบทความ
      const videoHtml = `<video controls src="${data.fullURL}" style="width: 100%; max-width: 600px;"></video>`;
      setContent((prevContent) => prevContent + videoHtml);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsUploading(false);
    }
  }

  const modules = QuillModules;
  const formats = QuillFormats;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto p-4 py-10">
      <div className="bg-gray-100 dark:bg-gray-800 border p-4 rounded-md">
        <label
          htmlFor="header"
          className="block text-2xl font-medium mb-2 text-gray-900 dark:text-white text-center"
        >
          {labelText}
        </label>
        <div className="bg-white dark:bg-gray-900 m-5 p-5 rounded-md">
          <label
            htmlFor="title"
            className="block text-2xl font-medium mb-2 text-gray-900 dark:text-white"
          >
            กรอกหัวข้อ
          </label>
          <div className="border dark:border-none p-2">
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ชื่อบทความ"
              className="w-full text-xl font-bold p-2 border-none focus:outline-none rounded dark:bg-gray-800"
            />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 m-5 p-5 rounded-md">
          <label
            htmlFor="body"
            className="block text-2xl font-medium mb-2 text-gray-900 dark:text-white"
          >
            เนื้อหาบทความ
          </label>

          <div className="quill-editor">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 m-5 p-5 rounded-md">
          <label className="block text-2xl font-medium mb-2 text-gray-900 dark:text-white">
            อัพโหลดวิดีโอ
          </label>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                disabled={isUploading}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  dark:file:bg-gray-700 dark:file:text-gray-200"
              />
              <button
                onClick={handleVideoUpload}
                disabled={!selectedFile || isUploading}
                className={`px-4 py-2 rounded ${
                  !selectedFile || isUploading
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {isUploading ? "กำลังอัพโหลด..." : "อัพโหลด"}
              </button>
            </div>

            {uploadedUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  URL วิดีโอที่อัพโหลด:
                </p>
                <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded break-all">
                  {uploadedUrl}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded w-full mx-5"
          >
            บันทึกบทความ
          </button>
        </div>
      </div>
    </div>
  );
}
