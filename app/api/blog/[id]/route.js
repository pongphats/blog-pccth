// app/api/blog/[id]/route.js

import { NextResponse } from 'next/server';

const api = 'http://127.0.0.1:8080'

export async function GET(request, { params }) {
    const { id } = params;
    const blogId = parseInt(id, 10); //10 คือ เลขฐานสิบ

    try {
        const response = await fetch(`${api}/posts/getPostById/${blogId}`, { cache: 'no-store' });

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

export async function PUT(request, { params }) {
    const { id } = params;
    const blogId = parseInt(id, 10); //10 คือ เลขฐานสิบ
    const newBlog = await request.json();

    try {
        const reqData = {
            PostHeader: newBlog.header,
            PostBody: newBlog.body,
        }

        const response = await fetch(`${api}/posts/updatePost/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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

export async function DELETE(request, { params }) {
    const { id } = params;
    const blogId = parseInt(id, 10);

    try {
        const response = await fetch(`${api}/posts/deletePost/${blogId}`, {
            method: 'DELETE',
        });
        console.log(await response.json())

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}