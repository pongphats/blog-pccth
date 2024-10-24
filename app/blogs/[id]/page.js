'use client'

import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import Layout from "../layout";
import Dialog from "@/app/components/Dialog";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "@/app/styles/quill.css";
import { QuillFormats, QuillModules } from "@/app/utils/QuillConstants";
import CommentCard from "@/app/components/CommentCard";

export default function BlogPage({ params }) {

  const router = useRouter();

  const id = params.id
  const [blog, setBlog] = useState("")
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(null);
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(null)

  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'บล็อก', href: '/blogs' },
    { label: blog ? blog.postHeader : 'Loading...', href: `/blogs/${id}` },
  ];

  async function fetchBlogById(blogId) {

    try {
      const response = await fetch(`/api/blog/${blogId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load blog");
      }

      const blogData = await response.json();
      setBlog(blogData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCommentsByBlogId(blogId) {
    try {
      const response = await fetch(`http://localhost:8080/comment/getCommentByPostId/${blogId}`)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load blog");
      }

      const comments = await response.json();
      setComments(comments)
      console.log("response COMMENT", comments)
    } catch (error) {
      console.error("get comment error : ", error)
    }
  }

  async function handleDelete() {
    const confirmed = await Dialog.confirm("คุณต้องการลบบล็อกนี้หรือไม่?", `หัวข้อ :${blog.postHeader}`);
    if (confirmed) {
      setLoading(true)
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete blog");
        }

        await Dialog.success('ลบแล้ว!', 'บล็อกของคุณถูกลบแล้ว.');
        await new Promise((resolve, reject) => {
          return setTimeout(resolve, 100);
        })
        router.refresh()
        await new Promise((resolve, reject) => {
          return setTimeout(resolve, 100);
        })
        router.push('/blogs');

      } catch (error) {
        console.error("Error deleting blog:", error);
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEditorChange = (content) => {
    setComment(content);
  };

  async function handleCreateComment() {
    console.log(comment)
    const reqData = {
      postID: parseInt(id),
      CommentBody: comment,
      CommentCreateBy: "mock by pure"
    }

    try {
      const response = await fetch(`http://localhost:8080/comment/createComment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqData)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      const data = await response.json();
      fetchCommentsByBlogId(id)
      setComment("")
      console.log('Comment created:', data);
    } catch (error) {
      console.error("add comment error : ", error)
    }
  }

  async function handleDeleteComment(comment) {

    const confirmed = await Dialog.confirm("คุณต้องการลบความคิดเห็นนี้หรือไม่?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8080/comment/deleteComment/${comment.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete blog");
        }
        await Dialog.success('ลบแล้ว!', 'บล็อกของคุณถูกลบแล้ว.');
        fetchCommentsByBlogId(id)
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchBlogById(id)
    fetchCommentsByBlogId(id)
  }, [id])

  const modules = QuillModules;
  const formats = QuillFormats;

  if (isLoading) {
    return <div className="text-center">กำลังโหลด...</div>;
  }

  if (isError) {
    return <div className="text-center">
      <p>ไม่พบข้อมูล</p>
      <Link href={`/blogs`}><p className="text-blue-500 underline mt-6 hover:text-blue-600 ">ดูบล็อกทั้งหมด</p></Link>
    </div>;
  }

  return (
    <Layout breadcrumbItems={breadcrumbItems}>

      <div className="flex flex-row justify-between">
        <p className="text-3xl font-bold">{blog.postHeader}</p>
        {/*Button edit Blog & Button delete Blog*/}
        <div>
          <Link href={`/blogs/editor/${blog.id}`}>
            <button className="p-2 rounded text-white bg-yellow-500 active:bg-yellow-600"><Pencil className="w-4 h-4 inline mr-[2px]" />แก้ไขบล็อก</button>
          </Link>
          <button className="ml-2 p-2 rounded text-white bg-red-500 active:bg-red-600" onClick={handleDelete}><Trash2 className="w-4 h-4 inline mr-[2px]" />ลบบล็อก</button>
        </div>
      </div>

      {/* details blog */}
      <div className="mt-3 pt-8 px-8 pb-5 rounded border shadow dark:border">
        <div
          className="px-2"
          dangerouslySetInnerHTML={{ __html: blog.postBody }}
        />
        <div className="text-right mt-5">
          <p className="text-sm">โดย {blog.postCreateBy}</p>
          <p className="text-xs text-gray-500">
            {new Date(blog.postCreateDate).toLocaleTimeString('th-TH')}
          </p>
          <p className="text-xs text-gray-500">{new Date(blog.postCreateDate).toLocaleDateString('th-TH')}</p>
        </div>
      </div>

      {/* comment */}
      <div className="mt-8 rounded dark:border">
        <p className="text-lg font-semibold mt-5">ความคิดเห็น {comments.length > 0 ? "(" + comments.length + ")" : ""}</p>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard comment={comment} key={comment.id} onDelete={handleDeleteComment} />
          ))
        ) : (
          <p>No Comment available.</p>
        )}

        {/* add comment */}
        <div className="m-3 mt-5">
          <p>แสดงความคิดเห็น :</p>
          <div className="quill-editor mt-4">
            <ReactQuill
              theme="snow"
              value={comment}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
            />
          </div>
        </div>
        <div className="flex justify-end m-3">
          <button className="bg-blue-500 active:bg-blue-600 text-white p-2 rounded mr-2" onClick={handleCreateComment}>เพิ่มความคิดเห็น</button>
        </div>
      </div>

    </Layout>
  )
}
