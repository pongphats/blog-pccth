// app/api/blog/route.js

import { NextResponse } from 'next/server';

// Mock blog data (usually you'd interact with a database)
let blogs = [
    {
        id: 1,
        header: "หัวข้อที่หนึ่ง",
        body: "รายละเอียดของหัวข้อที่หนึ่ง",
        createBy: "อุรังอุตัง",
        createDate: "09/10/2567"
    },
    {
        id: 2,
        header: "หัวข้อที่สอง",
        body: "รายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สองรายละเอียดของหัวข้อที่สอง",
        createBy: "อุรังอุตัง",
        createDate: "10/10/2567"
    },
    {
        id: 3,
        header: "หัวข้อที่สาม",
        body: "รายละเอียดของหัวข้อที่สาม",
        createBy: "อุรังอุตัง",
        createDate: "12/10/2567"
    },
    {
        id: 4,
        header: "หัวข้อที่สี่",
        body: "รายละเอียดของหัวข้อที่สี่",
        createBy: "อุรังอุตัง",
        createDate: "14/10/2567"
    },
    {
        id: 5,
        header: "หัวข้อที่ห้า",
        body: "รายละเอียดของหัวข้อที่ห้า",
        createBy: "อุรังอุตัง",
        createDate: "15/10/2567"
    },
    {
        id: 6,
        header: "หัวข้อที่หก",
        body: "รายละเอียดของหัวข้อที่หก",
        createBy: "อุรังอุตัง",
        createDate: "19/10/2567"
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
