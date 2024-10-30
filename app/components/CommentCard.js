import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { Trash2 } from 'lucide-react';
import { Tooltip } from "@nextui-org/react";
import { formatDateAndTime } from "@/utils/dateUtils";

export default function CommentCard({ comment, onDelete, userProfile, isAdmin }) {
    const handleDelete = () => {
        onDelete(comment);
    };

    const currentUser = userProfile?.name;

    return (
        <div className="border rounded p-3 m-3">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row ">
                    <Avatar name={comment.commentCreateBy} />
                    <div className="pl-2">
                        <div className="" >{comment.commentCreateBy}</div>
                        <div className="text-xs" >{formatDateAndTime(comment.commentCreateDate)}</div>
                    </div>
                </div>
                {/* แสดงปุ่มลบเฉพาะเมื่อ comment เป็นของผู้ใช้ปัจจุบัน */}
                {(comment.commentCreateBy === currentUser || isAdmin) && (
                    <div>
                        <Tooltip content="delete comment">
                            <Trash2 
                                className="cursor-pointer w-5 h-5 text-red-400 active:text-red-500" 
                                onClick={handleDelete} 
                            />
                        </Tooltip>
                    </div>
                )}
            </div>
            <div className="p-2 mt-2" dangerouslySetInnerHTML={{ __html: comment.commentBody }} />
        </div>
    );
}
