"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "@/app/styles/quill.css";
import { QuillFormats, QuillModules } from "@/app/utils/QuillConstants";

export default function BlogEditorPage({ params }) {

  const id = params.id
  const [isEditMode, setEditMode] = useState(false);
  const [isLoading, setLoading] = useState(true)

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSave() {
    console.log({ title, content });
    const apiUrl = id ? `/api/blog/${id}` : `/api/blog`;
    const method = id ? "PUT" : "POST"; // Use POST for create, PUT for edit

    const blogData = {
      header: title,
      body: content,
    };

    const response = await fetch(apiUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (response.ok) {
      console.log("Blog saved successfully!");
    } else {
      console.error("Failed to save blog.");
    }
  };

  const modules = QuillModules;

  const formats = QuillFormats;

  async function fetchBlogById(blogId) {
    const response = await fetch(`/api/blog/${blogId}`);

    if (response.status === 404) {
      console.log('Blog not found');
      return;
    }

    const blog = await response.json();
    setTitle(blog.header)
    setContent(blog.body)
    setLoading(false)
  }

  useEffect(() => {
    if (id) {
      setEditMode(true);
      setLoading(true);
      fetchBlogById(id);
    } else {
      setEditMode(false);
      setLoading(false);
    }
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

      <Link href={`/blogs`}>
        <p
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        >
          {isEditMode ? "อัปเดตบทความ" : "บันทึกบทความ"}
        </p>
      </Link>
    </div>
  );
}
