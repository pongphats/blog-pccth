// app/api/blog/[id]/route.js

import { NextResponse } from 'next/server';

export async function GET(req, { params }) {

    try {
        const { id } = params;
        const blogId = parseInt(id, 10); //10 คือ เลขฐานสิบ
        console.log("GET BY id", blogId)

        const token = req.headers.get("Authorization")?.split(" ")[1]; // รับ token จาก headers
        // console.log("GET BY token", token)
        if (!token) {
            return NextResponse.json(
                { message: "ไม่พบ Token การยืนยันตัวตน" },
                { status: 401 }
            );
        }

        const response = await fetch(`${process.env.BACKEND_HOST}/posts/getPostById/${blogId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

        if (!response.ok) {
            const errorData = await response.json();
            const err = {
                message: errorData.error || `Failed to fetch data from '/posts/getPostById/${blogId}'`,
                status: response.status
            }
            return NextResponse.json(err, { status: response.status });
        }

        const blog = await response.json();
        return NextResponse.json(blog);
    }
    catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const blogId = parseInt(id, 10); //10 คือ เลขฐานสิบ
    const newBlog = await req.json();

    const token = req.headers.get("Authorization")?.split(" ")[1]; // รับ token จาก headers
    // console.log("PUT BY token", token)
    if (!token) {
        return NextResponse.json(
            { message: "ไม่พบ Token การยืนยันตัวตน" },
            { status: 401 }
        );
    }

    try {
        const reqData = {
            PostHeader: newBlog.header,
            PostBody: newBlog.body,
        }

        const response = await fetch(`${process.env.BACKEND_HOST}/posts/updatePost/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(reqData),
        });

        if (!response.ok) {
            throw new Error('Failed to update blog post');
        }

        return NextResponse.json("ok", { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        const blogId = parseInt(id, 10);
        console.log("id", blogId)

        const token = req.headers.get("Authorization")?.split(" ")[1]; // รับ token จาก headers

        if (!token) {
            return NextResponse.json(
                { message: "ไม่พบ Token การยืนยันตัวตน" },
                { status: 401 }
            );
        }
        const response = await fetch(`${process.env.BACKEND_HOST}/posts/deletePost/${blogId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}