import Link from 'next/link';
import { SquareArrowOutUpRight, } from 'lucide-react';
import "react-quill/dist/quill.core.css";
import 'react-quill/dist/quill.snow.css'; 

import "react-quill/dist/quill.snow.css"; // Quill CSS
import "@/app/styles/quill.css"
export default function BlogCard({ blog }) {
    console.log(blog)
    return (
        <div className="py-5 px-5 m-2 my-5 rounded border shadow-lg dark:border">
            <p className="text-xl font-bold py-2  ">{blog.header}</p>
            <div
                className=""
                dangerouslySetInnerHTML={{ __html: blog.body }}
            />
            <div className="flex flex-row mt-5 text-sm text-gray-500 justify-between">
                <div className="flex">
                    <p>โดย {blog.createBy}</p>
                    <p className="ml-2">({new Date(blog.createDate).toLocaleDateString('th-TH')})</p>
                </div>
                <Link href={`/blogs/${blog.id}`}>
                    <SquareArrowOutUpRight className="cursor-pointer w-5 h-5 " />
                </Link>
            </div>
        </div>
    )
}