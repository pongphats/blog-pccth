import Breadcrumb from "@/app/components/Breadcrumb";
import { fetchNewsData, fetchProfileData } from "@/actions/fetch";
import NewsAdminButton from "@/app/components/NewsAdminButton";
import NewsList from "@/app/components/NewsList";

export default async function NewsListPage() {
  // Server-side data fetching
  const [newsData] = await Promise.all([fetchNewsData()]);

  const breadcrumbItems = [
    { label: "หน้าหลัก", href: "/home" },
    { label: "หน้าข่าวสาร", href: "/news" },
  ];

  return (
    <div className="p-4 my-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4 mt-5">ข้อมูลข่าวสาร</h1>
        <NewsAdminButton />
      </div>
      <NewsList newsData={newsData} />
    </div>
  );
}
