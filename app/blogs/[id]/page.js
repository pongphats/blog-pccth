'use client'

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from 'lucide-react';

export default function BlogPage({ params }) {
  const id = params.id
  const [blog, setBlog] = useState("")
  const [isLoading, setLoading] = useState(true)

  async function fetchBlogById(blogId) {
    const response = await fetch(`/api/blog/${blogId}`);

    if (response.status === 404) {
      console.log('Blog not found');
      return;
    }

    const blog = await response.json();
    setBlog(blog)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    fetchBlogById(id)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="pt-8 px-8 pb-5 rounded shadow">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-bold">{blog.header}</p>
        <div>
          <button className="px-2 rounded border hover:bg-yellow-200 active:bg-yellow-300"><Pencil className="w-4 h-4 inline mr-[2px]" />edit</button>
          <button className="ml-2 px-2 rounded border hover:bg-red-300 active:bg-red-400"><Trash2 className="w-4 h-4 inline mr-[2px]" />delete</button>
        </div>
      </div>
      <p className="py-4">{blog.body}</p>
      <div className="text-right mt-2">
        <p className="text-sm">โดย {blog.createBy}</p>
        <p className="text-xs text-gray-500">12:00 PM</p>
        <p className="text-xs text-gray-500">{blog.createDate}</p>
      </div>
    </div>
  )
}
