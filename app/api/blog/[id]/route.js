// app/api/blog/[id]/route.js

import { NextResponse } from 'next/server';

// Mock blog data (usually you'd interact with a database)
let blogs = [
    {
        id: 1,
        header: "หัวข้อที่หนึ่ง",
        body: "<h2><strong><em><s>pure</s></em></strong></h2>", createBy: "อุรังอุตัง",
        createDate: new Date()
    },
    {
        id: 2,
        header: "หัวข้อที่สอง",
        body: "<p>dlsakd</p><p>a</p><p>a</p><p><br></p><p>aa</p><p>aaaa</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>aa</p><p><br></p><p>a</p><p>aaaa</p><p>a</p><p>a</p><p>a</p><p>a</p><p>aaa</p>",
        createBy: "อุรังอุตัง",
        createDate: new Date()
    },
    {
        id: 3,
        header: "หัวข้อที่สาม",
        body: "<h1 className='ql-align-center'>test</h1>",
        createBy: "อุรังอุตัง",
        createDate: new Date()
    },
    {
        id: 4,
        header: "หัวข้อที่สี่",
        body: "<p><strong>testTTTTt</strong></p>",
        createBy: "อุรังอุตัง",
        createDate: new Date()
    },
    {
        id: 5,
        header: "หัวข้อที่ห้า",
        body: '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/RbjuXKt4aoM?showinfo=0"></iframe><p><br></p>',
        createBy: "อุรังอุตัง",
        createDate: new Date()
    },
    {
        id: 6,
        header: "หัวข้อที่หก",
        body: "รายละเอียดของหัวข้อที่หก",
        createBy: "อุรังอุตัง",
        createDate: new Date()
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