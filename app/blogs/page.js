'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SquarePlus } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import Layout from './layout';
import PaginationComponent from '../components/Pagination';


export default function BlogsPage() {

  const [blogs, setBlogs] = useState([])
  const [isLoading, setLoading] = useState(true)
  // {Pagination}
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'บล็อก', href: '/blogs' },
  ];

  // Fetch all blogs
  // async function fetchBlogs() {
  //   try {
  //     const response = await fetch('/api/blog');
  //     const blogs = await response.json();

  //     if (!response.ok) {
  //       throw new Error(blogs.message || "Failed to fetch blogs");
  //     }

  //     const sortedBlogs = blogs.sort((a, b) => a.id - b.id);
  //     setBlogs(sortedBlogs);
  //     setLoading(false)

  //   } catch (error) {
  //     console.error("Error fetching blogs:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function fetchBlogs() {
    try {
      const response = await fetch(`/api/blog/?page=${currentPage}&size=${blogsPerPage}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });
      const blogs = await response.json();

      if (!response.ok) {
        throw new Error(blogs.message || "Failed to fetch blogs");
      }

      const sortedBlogs = blogs.sort((a, b) => a.id - b.id);
      setBlogs(sortedBlogs);
      setLoading(false)

    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }

  // {Pagination} : คำนวณบล็อกที่จะแสดงในหน้าเฉพาะ
  const indexOfLastBlog = currentPage * blogsPerPage; // index ตัวสุดท้ายของหน้า
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage; // index ตัวแรกของหน้า
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog); // blog ที่เราต้องการแสดง


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
        currentBlogs.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))
      }

      {/* Pagination */}
      <div className="w-full flex justify-center mt-5">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(blogs.length / blogsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  )
}
