'use client'

import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';

export default function BlogsPage() {

  const [blogs, setBlogs] = useState([])

  // Fetch all blogs
  async function fetchBlogs() {
    const response = await fetch('/api/blog');
    const blogs = await response.json();
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchBlogs();
  }, []);


  return (
    <div>
      <h1 className="text-2xl font-bold p-2">BlogsPage</h1>
      {
        blogs.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))
      }
    </div>
  )
}
