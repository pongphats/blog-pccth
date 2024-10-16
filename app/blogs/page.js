'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SquarePlus } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import Layout from './layout';

export default function BlogsPage() {

  const [blogs, setBlogs] = useState([])
  const [isLoading, setLoading] = useState(true)

  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'blogs', href: '/blogs' },
  ];

  // Fetch all blogs
  async function fetchBlogs() {
    try {
      const response = await fetch('/api/blog');
      const blogs = await response.json();

      if (!response.ok) {
        throw new Error(blogs.message || "Failed to fetch blogs");
      }

      const sortedBlogs = blogs.data.sort((a, b) => a.id - b.id);
      setBlogs(sortedBlogs);
      setLoading(false)

    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchBlogs();
  }, []);

  if (isLoading) {
    return <div className='text-center'>กำลังโหลด...</div>;
  }

  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">BlogsPage</h1>
        <Link href={`/blogs/editor`} className='bg-lime-500 active:bg-lime-600 text-white p-2 rounded mr-2'>
          <SquarePlus className="w-5 h-5 inline mr-[5px] " />เพิ่มบล็อก
        </Link>
      </div>
      {
        blogs.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))
      }
    </Layout>
  )
}
