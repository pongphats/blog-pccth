// app/api/blog/route.js

import { NextResponse } from 'next/server';

const api = 'http://127.0.0.1:8080'

// GET: Fetch all blog posts
export async function GET() {
    try {
        const response = await fetch(`${api}/posts/getAllPosts`);

        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }

        const blogs = await response.json();
        // console.log(blogs)
        return NextResponse.json(blogs);
    }
    catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// GET: Fetch all blog posts (pagination : ทำไมใช้ get นะ)
// export async function GET(req) {
//     try {
//         const reqData = await req.json();

//         console.log(reqData)

//         const response = await fetch(`${api}/posts/getPaginatedPosts`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(reqData),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch data from the API');
//         }

//         const blogs = await response.json();
//         console.log(blogs)
//         return NextResponse.json(blogs);
//     }
//     catch (error) {
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }

// POST: Create a new blog post
export async function POST(req) {
    try {
        const newBlog = await req.json();

        const reqData = {
            PostHeader: newBlog.header,
            PostBody: newBlog.body,
            PostCreateBy: "mock by pure"
        }

        const response = await fetch(`${api}/posts/createPost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
