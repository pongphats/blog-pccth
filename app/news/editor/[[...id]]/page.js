"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "@/app/styles/quill.css";
import { QuillFormats, QuillModules } from "@/app/utils/QuillConstants";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewsEditorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [labelText, setLabelText] = useState("เพิ่มข่าวสาร");
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setLabelText("แก้ไขข่าวสาร");
      const fetchNewsItem = async () => {
        try {
          const response = await fetch(`/api/news/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch news item");
          }
          const data = await response.json();
          setTitle(data.newsHeader);
          setContent(data.newsBody);
        } catch (error) {
          console.error("Error fetching news item:", error);
        }
      };

      fetchNewsItem();
    } else {
      setLabelText("เพิ่มข่าวสาร");
    }
  }, [id]);

  const handleSave = async () => {
    const newsData = {
      id, // Ensure the ID is included for the PUT request
      newsHeader: title,
      newsBody: content, // Store HTML content directly
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = id
        ? await fetch(`/api/news/${id}`, {
            // Use id directly if it's not an array
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newsData),
          })
        : await fetch("/api/news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newsData),
          });

      if (response.ok) {
        router.push("/news");
      } else {
        console.error("Error saving news item");
      }
    } catch (error) {
      console.error("Error saving news item:", error);
    }
  };

  const modules = QuillModules;
  const formats = QuillFormats;

  return (
    <div className="space-y-4 max-w-4xl mx-auto p-4 py-10">
      <div className="bg-gray-100 p-4 rounded-md ">
        <label
          htmlFor="header"
          className="block text-2xl font-medium mb-2 text-gray-900 text-center"
        >
          {labelText}
        </label>
        <div className="bg-white m-5 p-5 rounded-md">
          <label
            htmlFor="title"
            className="block text-2xl font-medium mb-2 text-gray-900"
          >
            กรอกหัวข้อ
          </label>
          <div className="border border-gray-300 p-2 dark:border-none">
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ชื่อบทความ"
              className="w-full text-xl font-bold p-2 border-none focus:outline-none rounded dark:bg-gray-900"
            />
          </div>
        </div>
        <div className="bg-white m-5 p-5 rounded-md">
          <label
            htmlFor="body"
            className="block text-2xl font-medium mb-2 text-gray-900"
          >
            ข้อมูลข่าวสาร
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
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded w-full mx-5 "
          >
            บันทึกบทความ
          </button>
        </div>
      </div>
    </div>
  );
}
