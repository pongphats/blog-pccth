import { SquarePlus } from "lucide-react";
import Layout from "@/app/(page)/blogs/layout";
export default function BlogSkeletonLoading() {

    const breadcrumbItems = [
        { label: "หน้าหลัก", href: "/home" },
        { label: "บล็อก", href: "/blogs" },
    ];
    return (
        <>
            <Layout breadcrumbItems={breadcrumbItems}>
                <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-bold">BlogsPage</h1>
                    <div
                        className="bg-lime-500 active:bg-lime-600 text-white p-2 rounded mr-2"
                    >
                        <SquarePlus className="w-5 h-5 inline mr-[5px]" />
                        เพิ่มบล็อก
                    </div>
                </div>

                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="py-5 px-5 m-2 my-5 rounded border shadow-lg dark:border animate-pulse ">
                        <div className="h-6 w-3/5 rounded-lg mb-2 bg-gray-300"></div>
                        <div className="h-4 w-full rounded-lg mb-2 bg-gray-300"></div>
                        <div className="h-4 w-full rounded-lg mb-2 bg-gray-300"></div>
                        <div className="h-4 w-4/5 rounded-lg mb-2 bg-gray-300"></div>
                        <div className="flex flex-row mt-5 text-sm justify-between">
                            <div className="h-4 w-1/4 rounded-lg bg-gray-300"></div>
                            <div className="h-5 w-5 rounded-full bg-gray-300"></div>
                        </div>
                    </div>
                ))}
            </Layout>
        </>
    );
}