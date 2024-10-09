// app/api/blog/[id]/route.js

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

export async function GET(request, { params }) {
    const { id } = params;
    const blogId = parseInt(id, 10); //10 คือ เลขฐานสิบ

    // Find the blog post with the matching ID
    const blog = blogs.find(b => b.id === blogId);

    // If no blog is found, return 404
    if (!blog) {
        return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Return the found blog as JSON
    return NextResponse.json(blog);
}