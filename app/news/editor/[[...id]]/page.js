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
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchNewsItem = async () => {
        try {
          const response = await fetch(`/api/news/${id}`);
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
        } catch (error) {
          console.error("Error fetching news item:", error);
        }
      };

      fetchNewsItem();
    }
  }, [id]);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleSave = async () => {
    const plainTextContent = stripHtml(content);
    const newsData = {
      title,
      content: plainTextContent,
      date: new Date().toISOString().split("T")[0],
    };
    try {
      const response = id
        ? await fetch(`/api/news/${id}`, {
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
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="ชื่อบทความ"
        className="w-full text-2xl font-bold p-2 border-none focus:outline-none rounded dark:text-white dark:bg-gray-900"
      />

      <div className="quill-editor">
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
        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
      >
        บันทึกบทความ
      </button>
    </div>
  );
}
