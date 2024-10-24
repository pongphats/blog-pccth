import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";

import "react-quill/dist/quill.snow.css"; // Quill CSS
import "@/app/styles/quill.css";
import { formatDate } from "../utils/dateUtils";
export default function BlogCard({ blog }) {
    return (
        <div className="py-5 px-5 m-2 my-5 rounded border shadow-lg dark:border">
            <p className="text-xl font-bold py-2  ">{blog.postHeader}</p>
            <div className="line-clamp-5 overflow-hidden overflow-ellipsis" dangerouslySetInnerHTML={{ __html: blog.postBody }} />
            <div className="flex flex-row mt-5 text-sm text-gray-500 justify-between">
                <div className="flex">
                    <p>โดย {blog.postCreateBy}</p>
                    <p className="ml-2">
                        {/* ({new Date(blog.postCreateDate).toLocaleDateString("th-TH")}) */}
                        ({formatDate(blog.postCreateDate)})
                    </p>
                </div>
                <Link href={`/blogs/${blog.id}`}>
                    <SquareArrowOutUpRight className="cursor-pointer w-5 h-5 hover:text-gray-600 " />
                </Link>
            </div>
        </div>
    );
}
