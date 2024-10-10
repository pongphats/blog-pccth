// app/api/blog/route.js

import { NextResponse } from 'next/server';

// Mock blog data (usually you'd interact with a database)
let blogs = [
    {
        id: 1,
        header: "หัวข้อที่หนึ่ง",
        body: '<h2><strong><em><s>pure</s></em></strong></h2><blockquote>lalalalalallala</blockquote><p><img src=\"data:image/jpeg;base64,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\"></p>',
        createBy: "อุรังอุตัง",
        createDate: "12/12/2022"
    },
    {
        id: 2,
        header: "หัวข้อที่สอง",
        body: "รายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สอง",
        createBy: "อุรังอุตัง",
        createDate: "15/01/2023"
    },
    {
        id: 3,
        header: "หัวข้อที่สาม",
        body: "<h1 className='ql-align-center'>test</h1>",
        createBy: "อุรังอุตัง",
        createDate: "09/02/2023"
    },
    {
        id: 4,
        header: "หัวข้อที่สี่",
        body: "<p><strong>testTTTTt</strong></p>",
        createBy: "อุรังอุตัง",
        createDate: "26/02/2023"
    },
    {
        id: 5,
        header: "หัวข้อที่ห้า",
        body: '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/RbjuXKt4aoM?showinfo=0"></iframe><p><br></p>',
        createBy: "อุรังอุตัง",
        createDate: "19/03/2023"
    },
    {
        id: 6,
        header: "หัวข้อที่หก",
        body: "รายละเอียดของหัวข้อที่หก",
        createBy: "อุรังอุตัง",
        createDate: "30/04/2023"
    },
]

// GET: Fetch all blog posts
export async function GET() {
    return NextResponse.json(blogs); // Return the list of blogs as JSON
}

// POST: Create a new blog post
export async function POST(req) {
    const newBlog = await req.json();
    newBlog.id = blogs.length + 1; // Assign a new ID
    newBlog.createBy = "เพียว"
    newBlog.createDate = new Date()
    blogs.push(newBlog); // Add new blog to the list
    return NextResponse.json({ message: 'Blog created', blog: newBlog }, { status: 201 });
}

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
