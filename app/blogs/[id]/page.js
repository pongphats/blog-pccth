'use client'

import { useEffect, useState } from "react";
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import Layout from "../layout";

export default function BlogPage({ params }) {

  const id = params.id
  const [blog, setBlog] = useState("")
  const [isLoading, setLoading] = useState(true)

  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'blogs', href: '/blogs' },
    { label: blog ? blog.header : 'Loading...', href: `/blogs/${id}` },
  ];

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
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-row justify-between">
        <p className="text-3xl font-bold">{blog.header}</p>
        <div>
          <Link href={`/blogs/editor/${blog.id}`}>
            <button className="p-2 rounded border text-white bg-yellow-500 active:bg-yellow-600"><Pencil className="w-4 h-4 inline mr-[2px]" />แก้ไขบล็อก</button>
          </Link>
          <button className="ml-2 p-2 rounded border text-white bg-red-500 active:bg-red-600"><Trash2 className="w-4 h-4 inline mr-[2px]" />ลบบล็อก</button>
        </div>
      </div>
      <div className="mt-3 pt-8 px-8 pb-5 rounded border shadow dark:border">
        <div
          className="px-2"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />
        <div className="text-right mt-5">
          <p className="text-sm">โดย {blog.createBy}</p>
          <p className="text-xs text-gray-500">
            {new Date(blog.createDate).toLocaleTimeString('th-TH', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </p>
          <p className="text-xs text-gray-500">{new Date(blog.createDate).toLocaleDateString('th-TH')}</p>
        </div>
      </div>
    </Layout>
  )
}
