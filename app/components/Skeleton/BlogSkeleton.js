import { Skeleton } from "@nextui-org/react";

export default function BlogSkeletonLoading() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="py-5 px-5 m-2 my-5 rounded border shadow-lg dark:border">
                    <Skeleton className="h-6 w-3/5 rounded-lg mb-2" />
                    <Skeleton className="h-4 w-full rounded-lg mb-2" />
                    <Skeleton className="h-4 w-full rounded-lg mb-2" />
                    <Skeleton className="h-4 w-4/5 rounded-lg mb-2" />
                    <div className="flex flex-row mt-5 text-sm justify-between">
                        <Skeleton className="h-4 w-1/4 rounded-lg" />
                        <Skeleton className="h-5 w-5 rounded-full" />
                    </div>
                </div>
            ))}
        </>
    );
}