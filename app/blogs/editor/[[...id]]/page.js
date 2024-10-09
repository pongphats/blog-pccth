"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "@/app/styles/quill.css";
import { QuillFormats, QuillModules } from "@/app/utils/QuillConstants";

export default function BlogEditorPage({ params }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    console.log({ title, content });
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
