import NewCard from "@/app/components/Newcard";
import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";
import { SquarePlus } from "lucide-react";
import { fetchNewsData } from "@/actions/fetch";

export default async function NewsListPage() {
  const newsData = await fetchNewsData();

  const breadcrumbItems = [
    { label: "หน้าหลัก", href: "/home" },
    { label: "หน้าข่าวสาร", href: "/news" },
  ];

  return (
    <div className="p-4 my-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4 mt-5">ข้อมูลข่าวสาร</h1>
        <Link
          href="/news/editor"
          className="inline-flex items-center px-2 py-2 border border-green-500 bg-green-500 rounded mb-4 mt-5 text-white "
        >
          <SquarePlus className="mr-2" /> เพิ่มข่าวสาร
        </Link>
      </div>
      <ul>
        {newsData.map((news) => (
          <NewCard key={news.newsId} news={news} />
        ))}
      </ul>
    </div>
  );
}
