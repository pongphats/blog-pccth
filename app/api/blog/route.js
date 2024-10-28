// app/api/blog/route.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET: Fetch all blog posts
export async function GET() {
    try {
        const token = cookies().get('token')?.value;
        console.log(token)
        // const response = await fetch(`${api}/posts/getAllPosts`);
        const response = await fetch(`${process.env.BACKEND_HOST}/posts/getAllPosts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }

        const blogs = await response.json();
        return NextResponse.json(blogs);
    }
    catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// POST: Create a new blog post
export async function POST(req) {
    try {
        const newBlog = await req.json();
        const token = req.headers.get('Authorization');
        console.log("token", token)

        const reqData = {
            PostHeader: newBlog.header,
            PostBody: newBlog.body,
            PostCreateBy: "mock by pure"
        }

        const response = await fetch(`${api}/posts/createPost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token

            },
            body: JSON.stringify(reqData),
        });

        if (!response.ok) {
            throw new Error('Failed to create blog post');
        }

        const resDate = await response.json();

        return NextResponse.json(resDate, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
