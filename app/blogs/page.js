'use client'

import { useEffect, useState } from 'react';
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
    const response = await fetch('/api/blog');
    const blogs = await response.json();
    setBlogs(blogs)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    fetchBlogs();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      <h1 className="text-3xl font-bold">BlogsPage</h1>
      {
        blogs.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))
      }
    </Layout>
  )
}
