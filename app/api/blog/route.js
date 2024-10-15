// app/api/blog/route.js

import { NextResponse } from 'next/server';

const api = 'http://127.0.0.1:8080'

// GET: Fetch all blog posts
export async function GET() {
    try {
        const response = await fetch(`${api}/posts/getAllPostsByPage`);

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
// export async function POST(req) {
//     try {
//         const newBlog = await req.json();
//         console.log("newBlog > ", newBlog)

//         const reqData = {
//             PostHeader: newBlog.header,
//             PostBody: newBlog.body,
//             PostCreateBy: "mock by pure"
//         }

//         const response = await fetch('http://127.0.0.1:8080/posts/createPost', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(reqData),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to create blog post');
//         }

//         const resDate = await response.json();

//         return NextResponse.json(resDate, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }

// PUT: Update an existing blog post by ID
export async function PUT(req) {
    const { id, title, description, author } = await req.json();
    const blog = blogs.find((b) => b.id === id);

    if (blog) {
        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.author = author || blog.author;
        return NextResponse.json({ message: 'Blog updated', blog });
    } else {
        return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
}

// DELETE: Remove a blog post by ID
export async function DELETE(req) {
    const { id } = await req.json();
    const blogIndex = blogs.findIndex((b) => b.id === id);

    if (blogIndex !== -1) {
        const deletedBlog = blogs.splice(blogIndex, 1); // Remove the blog
        return NextResponse.json({ message: 'Blog deleted', blog: deletedBlog[0] });
    } else {
        return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
}
