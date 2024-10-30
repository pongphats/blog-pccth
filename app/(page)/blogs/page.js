// app/blogs/page.js
import Link from "next/link";
import { SquarePlus } from "lucide-react";
import BlogCard from "../../components/BlogCard";
import Layout from "./layout";
import { fetchBlogData } from "@/actions/fetch";

export default async function BlogsPage() {

  const blogsData = await fetchBlogData();

  const breadcrumbItems = [
    { label: "หน้าหลัก", href: "/home" },
    { label: "บล็อก", href: "/blogs" },
  ];

  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">BlogsPage</h1>
        <Link
          href={`/blogs/editor`}
          className="bg-lime-500 active:bg-lime-600 text-white p-2 rounded mr-2"
        >
          <SquarePlus className="w-5 h-5 inline mr-[5px]" />
          เพิ่มบล็อก
        </Link>
      </div>
      <>
        {blogsData.length > 0 ? (
          blogsData.map((blog) => <BlogCard blog={blog} key={blog.id} />)
        ) : (
          <p>No blogs available.</p>
        )}
      </>
    </Layout>
  );
}