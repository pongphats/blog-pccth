// app/api/blog/[id]/route.js

import { NextResponse } from 'next/server';

const api = 'http://127.0.0.1:8080'

export async function GET(request, { params }) {
    const { id } = params;
    const blogId = parseInt(id, 10); //10 คือ เลขฐานสิบ

    try {
        const response = await fetch(`${api}/posts/getPostById/${blogId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }

        const blog_ = await response.json();
        return NextResponse.json(blog_);
    }
    catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    const blogId = parseInt(id, 10); //10 คือ เลขฐานสิบ

    const reqData = {
        PostHeader: request.header,
        PostBody: request.body,
    }

    console.log(reqData)

    // try {
    // const reqData = {
    //     PostHeader: newBlog.header,
    //     PostBody: newBlog.body,
    // }

    // console.log(reqData)

    //     const response = await fetch(`${api}/posts/updatePost/${blogId}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(reqData),
    //     });

    //     console.log(response)

    //     if (!response.ok) {
    //         throw new Error('Failed to create blog post');
    //     }

    //     const resDate = await response.json();

        return NextResponse.json("ok", { status: 200 });
    // }
    // catch (error) {
    //     return NextResponse.json({ message: error.message }, { status: 500 });
    // }
}