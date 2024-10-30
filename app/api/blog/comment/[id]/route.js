// app/api/blog/comment/[id]/route.js
import { NextResponse } from "next/server";

// GET: Fetch all Comment by BlogId
export async function GET(req, { params }) {
    try {
        const { id } = params;
        const blogId = parseInt(id, 10);
        console.log("GET Comments BY id", blogId)
        const token = req.headers.get("Authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                { message: "ไม่พบ Token การยืนยันตัวตน" },
                { status: 401 }
            );
        }

        const response = await fetch(
            `${process.env.BACKEND_HOST}/comment/getCommentByPostId/${blogId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "ไม่สามารถดึงข้อมูลจาก API ได้");
        }

        const comments = await response.json();
        return NextResponse.json(comments);
    } catch (error) {
        console.error("Blog/Comment API Error:", error);
        return NextResponse.json(
            {
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลความคิดเห็น",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// POST: Create new comment
export async function POST(req, { params }) {
    try {
        const { id } = params;
        const blogId = parseInt(id, 10);
        const token = req.headers.get("Authorization")?.split(" ")[1];
        const data = await req.json();

        if (!token) {
            return NextResponse.json(
                { message: "ไม่พบ Token การยืนยันตัวตน" },
                { status: 401 }
            );
        }

        const response = await fetch(
            `${process.env.BACKEND_HOST}/comment/createComment`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postID: blogId,
                    CommentBody: data.commentBody,
                    CommentCreateBy: data.commentCreateBy
                })
            }
        );

        if (!response.ok) {
            throw new Error("ไม่สามารถสร้างความคิดเห็นได้");
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// DELETE: Delete comment by ID
export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        const commentId = parseInt(id, 10);
        const token = req.headers.get("Authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                { message: "ไม่พบ Token การยืนยันตัวตน" },
                { status: 401 }
            );
        }

        const response = await fetch(
            `${process.env.BACKEND_HOST}/comment/deleteComment/${commentId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "ไม่สามารถลบความคิดเห็นได้");
        }

        return NextResponse.json({ message: "ลบความคิดเห็นสำเร็จ" });
    } catch (error) {
        console.error("Delete Comment API Error:", error);
        return NextResponse.json(
            {
                message: "เกิดข้อผิดพลาดในการลบความคิดเห็น",
                error: error.message,
            },
            { status: 500 }
        );
    }
} 