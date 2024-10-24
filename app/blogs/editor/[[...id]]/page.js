"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "@/app/styles/quill.css";
import { QuillFormats, QuillModules } from "@/app/utils/QuillConstants";

export default function BlogEditorPage({ params }) {

  const router = useRouter();

  const id = params.id
  const [isEditMode, setEditMode] = useState(false);
  const [isLoading, setLoading] = useState(true)

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSave() {
    const apiUrl = id ? `/api/blog/${id}` : `/api/blog`;
    const method = id ? "PUT" : "POST";

    const blogData = {
      header: title,
      body: content
    };

    const response = await fetch(apiUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
      cache: 'no-store'
    });

    if (response.ok) {
      await new Promise((resolve, reject) => {
        return setTimeout(resolve, 100);
      })
      router.refresh()
      await new Promise((resolve, reject) => {
        return setTimeout(resolve, 100);
      })
      router.push('/blogs');
    } else {
      console.error("Failed to save blog.");
    }
  };

  const modules = QuillModules;

  const formats = QuillFormats;

  async function fetchBlogById(blogId) {
    try {
      const response = await fetch(`/api/blog/${blogId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load blog");
      }

      const blogData = await response.json();
      setTitle(blogData.postHeader)
      setContent(blogData.postBody)

    } catch (err) {
      // setError(err.message);
      router.push('/blogs/editor');
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    if (id) {
      setEditMode(true);
      fetchBlogById(id);
    } else {
      setEditMode(false);
      setLoading(false);
    }
  }, [id])

  if (isLoading) {
    return <div className="text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-5 space-y-4 p-10 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        {isEditMode ? "แก้ไขบทความ" : "สร้างบทความใหม่"}
      </h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="ชื่อบทความ"
        className="w-full text-2xl font-bold p-4 border border-gray-300 shadow-sm focus:outline-none dark:bg-gray-900 dark:text-white"
      />

      <div className="quill-editor mt-4">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {isEditMode ? "อัปเดตบทความ" : "บันทึกบทความ"}
      </button>
    </div>

  );
}
