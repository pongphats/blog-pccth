import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

export default function NewCard({ news }) {
  return (
    <li className="border rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-2xl font-semibold">{news.title}</h2>
      <Link href={`/news/${news.id}`}>
        <p className="text-gray-700 text-xl my-3 cursor-pointer">
          {news.content}
          <SquareArrowOutUpRight className="inline ml-2" />
        </p>
      </Link>
      <p className="text-gray-500 text-md my-2">วันที่: {news.date}</p>
    </li>
  );
}
