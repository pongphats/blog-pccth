import Breadcrumb from "@/app/components/Breadcrumb";
import NewsLoadingGroup from "@/app/components/Skeleton/NewsLoadingGroup";

export default function loading() {
  const breadcrumbItems = [
    { label: "หน้าหลัก", href: "/home" },
    { label: "หน้าข่าวสาร", href: "/news" },
  ];
  return (
    <div className="p-4 my-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-4 mt-5">ข้อมูลข่าวสาร</h1>
      </div>
      <NewsLoadingGroup />
    </div>
  );
}
