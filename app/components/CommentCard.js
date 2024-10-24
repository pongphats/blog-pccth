import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { Trash2 } from 'lucide-react';
import { Tooltip } from "@nextui-org/react";

export default function CommentCard({ comment, onDelete }) {
    const handleDelete = () => {
        onDelete(comment);
    };
    const name = "mock by pure" // mock role
    return (
        <div className="border rounded p-3 m-3">
            {/* Avater */}
            <div className="flex flex-row justify-between">
                <div className="flex flex-row ">
                    <Avatar name={comment.commentCreateBy} />
                    <div className="my-auto p-2" >{comment.commentCreateBy}</div>
                </div>
                {/* Button Delete Comment */}
                {
                    comment.commentCreateBy == name &&
                    <div>
                        <Tooltip content="delete comment">
                            <Trash2 className="cursor-pointer w-5 h-5 text-red-400 active:text-red-500 " onClick={handleDelete} />
                        </Tooltip>
                    </div>
                }
            </div>
            {/* content */}
            <div className="p-2 mt-2" dangerouslySetInnerHTML={{ __html: comment.commentBody }} />
        </div>
    );
}
