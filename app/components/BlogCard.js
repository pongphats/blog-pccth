import Link from 'next/link';
import { SquareArrowOutUpRight, } from 'lucide-react';

export default function BlogCard({blog}) {
    return (
        <div className="py-5 px-5 m-2 rounded shadow dark:border">
            <p className="text-xl font-bold py-2  ">{blog.title}</p>
            <p className="px-2">{blog.description}</p>

            <div className="flex flex-row mt-5 text-sm text-gray-500">
                <p className="">โดย  {blog.author}</p>
                <p className="ml-2">({blog.dataToUpdated})</p>
                <Link href={`/blogs/${blog.id}`}>
                    <SquareArrowOutUpRight className="cursor-pointer" />
                </Link>
            </div>
        </div>
    )
}