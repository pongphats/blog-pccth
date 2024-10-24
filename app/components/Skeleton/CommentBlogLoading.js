import React from 'react';

const CommentBlogLoading = () => {
    return (
        <div className="animate-pulse">
            <div className="text-lg font-semibold mt-5">ความคิดเห็น</div>
            <div className='border rounded p-3 m-3'>
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                                <div className="h-3 bg-gray-200 rounded w-16"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentBlogLoading;
