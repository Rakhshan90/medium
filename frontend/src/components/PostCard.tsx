// import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Circle from "./Circle";
import { Link } from "react-router-dom";


interface postProps {
    authorName: string;
    publishedDate: string;
    title: string;
    content: string;
    id: number;
}

const PostCard = ({ authorName, publishedDate, title, content, id }: postProps) => {
    return (
        <Link to={`/post/${id}`}>
            <div className="py-12 px-4 md:px-8">
                <div className="flex gap-2">
                    <div className="flex flex-col justify-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex flex-col justify-center">
                        {authorName}
                    </div>

                    <div className="flex flex-col justify-center">
                        <Circle />
                    </div>

                    <div className="text-gray-500 flex flex-col justify-center">
                        {publishedDate}
                    </div>
                </div>

                <div className="mt-4 mb-2 text-2xl font-bold">
                    {title}
                </div>

                <div className="text-lg">
                    {content.slice(0, 100) + '...'}
                </div>

                <div className="text-lg text-gray-500">
                    {Math.ceil(content.length / 100) + ' min read'}
                </div>
            </div>
        </Link>
    )
}

export default PostCard
