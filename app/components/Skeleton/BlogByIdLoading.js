import { Pencil, Trash2 } from 'lucide-react';

export default function BlogByIdLoading() {
    return (
        <div className="animate-pulse">
            <div className="flex flex-row justify-between">
                <p className="h-8 w-1/2 mb-2 bg-gray-300 rounded"></p>
                <div>
                    <button className="p-2 rounded text-white bg-yellow-500 opacity-50 cursor-not-allowed">
                        <Pencil className="w-4 h-4 inline mr-[2px]" />แก้ไขบล็อก
                    </button>
                    <button className="ml-2 p-2 rounded text-white bg-red-500 opacity-50 cursor-not-allowed">
                        <Trash2 className="w-4 h-4 inline mr-[2px]" />ลบบล็อก
                    </button>
                </div>
            </div>

            {/* รายละเอียดบล็อก */}
            <div className="mt-3 pt-8 px-8 pb-5 rounded border shadow dark:border">
                <div className="px-2">
                    {[...Array(5)].map((_, index) => (
                        <p key={index} className="h-4 w-full rounded mb-4 bg-gray-300"></p>
                    ))}
                </div>
                <div className="flex justify-end mt-5">
                    <div className="text-right space-y-2">
                        <p className="h-3 w-40 rounded bg-gray-300"></p>
                        <p className="h-3 w-40 rounded bg-gray-300"></p>
                        <p className="h-3 w-40 rounded bg-gray-300"></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
