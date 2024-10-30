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
import { QuillFormats, QuillModules } from "@/utils/QuillConstants";
import CommentCard from "@/app/components/CommentCard";
import BlogByIdLoading from "@/app/components/Skeleton/BlogByIdLoading";
import CommentBlogLoading from "@/app/components/Skeleton/CommentBlogLoading";
import { formatDateAndTime } from "@/utils/dateUtils";

export default function BlogPage({ params }) {
  const router = useRouter();
  const id = params.id
  const [blog, setBlog] = useState("")
  const [isLoadingBlog, setLoadingBlog] = useState(true)
  const [isLoadingComment, setLoadingComment] = useState(true)
  const [isError, setError] = useState(null);
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(null)
  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const breadcrumbItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'บล็อก', href: '/blogs' },
    { label: blog ? blog.postHeader : 'Loading...', href: `/blogs/${id}` },
  ];

  async function fetchBlogById(blogId) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(`/api/blog/${blogId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // ส่ง token ใน headers
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load blog");
      }

      const blogData = await response.json();
      setBlog(blogData.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingBlog(false);
    }
  }

  async function fetchCommentsByBlogId(blogId) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(`/api/blog/comment/${blogId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load blog");
      }

      const comments = await response.json();
      setComments(comments.data)
      // console.log("response COMMENT", comments)
    } catch (error) {
      console.error("get comment error : ", error)
    } finally {
      setLoadingComment(false);
    }
  }

  async function fetchUserProfile() {
    try {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      setUserProfile(data.data);

      const mappings = data.data?.clientMappings?.['sso-client-api']?.mappings || [];
      const adminStatus = mappings.some(mapping => mapping.name === 'client_admin');
      setIsAdmin(adminStatus);

    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  async function handleDelete() {
    const confirmed = await Dialog.confirm("คุณต้องการลบบล็อกนี้หรือไม่?", `หัวข้อ :${blog.postHeader}`);
    if (confirmed) {
      setLoadingBlog(true)
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete blog");
        }

        await Dialog.success('ลบแล้ว!', 'บล็อกของคุณถูกลบแล้ว.');
        await new Promise((resolve, reject) => {
          return setTimeout(resolve, 500);
        })
        router.refresh()
        await new Promise((resolve, reject) => {
          return setTimeout(resolve, 500);
        })
        router.push('/blogs');

      } catch (error) {
        console.error("Error deleting blog:", error);
      } finally {
        setLoadingBlog(false)
      }
    }
  }

  const handleEditorChange = (content) => {
    setComment(content);
  };

  async function handleCreateComment() {
    if (!comment.trim()) {
      await Dialog.warning('แจ้งเตือน', 'กรุณากรอกความคิดเห็น');
      return;
    }

    try {
      const response = await fetch(`/api/blog/comment/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          commentBody: comment,
          commentCreateBy: userProfile?.name || 'Anonymous' // ใช้ชื่อจริงจาก userProfile
        })
      });

      if (!response.ok) {
        throw new Error('ไม่สามารถสร้างความคิดเห็นได้');
      }

      await Dialog.success('สำเร็จ', 'เพิ่มความคิดเห็นเรียบร้อยแล้ว');
      fetchCommentsByBlogId(id);
      setComment("");
    } catch (error) {
      console.error("add comment error:", error);
      await Dialog.error('ผิดพลาด', 'ไม่สามารถเพิ่มความคิดเห็นได้');
    }
  }

  async function handleDeleteComment(comment) {
    const confirmed = await Dialog.confirm("คุณต้องการลบความคิดเห็นนี้หรือไม่?");
    if (confirmed) {
      try {
        const response = await fetch(`/api/blog/comment/${comment.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("ไม่สามารถลบความคิดเห็นได้");
        }

        await Dialog.success('สำเร็จ', 'ลบความคิดเห็นเรียบร้อยแล้ว');
        fetchCommentsByBlogId(id);
      } catch (error) {
        console.error("Error deleting comment:", error);
        await Dialog.error('ผิดพลาด', 'ไม่สามารถลบความคิดเห็นได้');
      }
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      console.log(id)
      fetchBlogById(id)
      fetchCommentsByBlogId(id)
      fetchUserProfile()
    }
  }, [id, token])

  const modules = QuillModules;
  const formats = QuillFormats;

  if (isError) {
    return <div className="text-center">
      <p>ไม่พบข้อมูล</p>
      <Link href={`/blogs`}><p className="text-blue-500 underline mt-6 hover:text-blue-600 ">ดูบล็อกทั้งหมด</p></Link>
    </div>;
  }

  return (
    <Layout breadcrumbItems={breadcrumbItems}>
      {isLoadingBlog ?
        (
          <BlogByIdLoading />
        )
        :
        (
          <>
            <div className="flex flex-row justify-between">
              <p className="text-3xl font-bold">{blog.postHeader}</p>
              {/*Button edit Blog & Button delete Blog*/}
              {(isAdmin || userProfile?.username === blog.postCreateBy) && (
                <div>
                  <Link href={`/blogs/editor/${blog.id}`}>
                    <button className="p-2 rounded text-white bg-yellow-500 active:bg-yellow-600"><Pencil className="w-4 h-4 inline mr-[2px]" />แก้ไขบล็อก</button>
                  </Link>
                  <button className="ml-2 p-2 rounded text-white bg-red-500 active:bg-red-600" onClick={handleDelete}><Trash2 className="w-4 h-4 inline mr-[2px]" />ลบบล็อก</button>
                </div>
              )}
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
                  {formatDateAndTime(blog.postCreateDate)}
                </p>
              </div>
            </div>
          </>
        )}

      {/* comment */}
      <div className="mt-8 rounded">
        {isLoadingComment ? (
          <CommentBlogLoading />
        ) : (
          <>
            <p className="text-lg font-semibold mt-5">ความคิดเห็น {comments && comments.length > 0 ? "(" + comments.length + ")" : ""}</p>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard comment={comment} key={comment.id} onDelete={handleDeleteComment} userProfile={userProfile} isAdmin={isAdmin} />
              ))
            ) : (
              <p>ไม่มีความคิดเห็น</p>
            )}
          </>
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

    </Layout >
  )
}
