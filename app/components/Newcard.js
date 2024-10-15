import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

export default function NewCard({ news }) {
  return (
    <li className="border rounded-lg shadow-md p-4 mb-4 relative">
      <h2 className="text-xl font-semibold">{news.title}</h2>
      {/* <p className="text-gray-700 text-xl my-3 ">{news.content}</p> */}

      <p
        className="text-gray-700  my-3 dark:text-white "
        dangerouslySetInnerHTML={{ __html: news.content }}
      />
      <div className=" flex flex-row justify-between">
        <p className="text-gray-500 dark:text-white ">วันที่: {news.date}</p>
        <Link href={`/news/${news.id}`}>
          <SquareArrowOutUpRight className=" cursor-pointer hover:text-green-500" />
        </Link>
      </div>
    </li>
  );
}
