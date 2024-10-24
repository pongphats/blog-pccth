// app/blogs/page.js
import Link from 'next/link';
import { SquarePlus } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import Layout from './layout';
import { Suspense } from 'react';
import Loading from './loading';

async function fetchBlogs() {
  const api = 'http://127.0.0.1:8080';
  try {
    const response = await fetch(`${api}/posts/getAllPosts`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const blogs = await response.json();
    return blogs.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'บล็อก', href: '/blogs' },
  ];

  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">BlogsPage</h1>
        <Link href={`/blogs/editor`} className='bg-lime-500 active:bg-lime-600 text-white p-2 rounded mr-2'>
          <SquarePlus className="w-5 h-5 inline mr-[5px]" />เพิ่มบล็อก
        </Link>
      </div>

      <Suspense fallback={<Loading />}>
        <BlogContent />
      </Suspense>
    </Layout>
  );
}

async function BlogContent() {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay

  const blogs = await fetchBlogs();

  return (
    <>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </>
  );
}