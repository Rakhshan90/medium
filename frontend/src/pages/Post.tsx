// import React from 'react'
import Navbar from "@/components/Navbar"
import { PostSkeleton } from "@/components/PostSkeleton"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { usePost } from "@/hooks"
import { postAtom } from "@/store/atoms"
import { useLocation } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil"

interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

const Post = () => {
  const location = useLocation();
  const id = Number(location.pathname.split('/')[2]);
  // const { post, error, loading } = usePost(id);

  const post = useRecoilValueLoadable<Post>(postAtom(id));

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-12 px-4">
        {post.state === 'loading' ? (
          <PostSkeleton />
        ) : post.state === 'hasError' ? (
          <div>Error while getting post detail</div>
        ) : post.state === 'hasValue' ? (
          <div className="flex flex-col gap-4">
            <div className="text-4xl font-bold">
              {post.contents.title}
            </div>
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div>{post.contents.author.name}</div>
                <div className="text-gray-500">Posted on August 24, 2024</div>
              </div>
            </div>
            <div className="text-lg">
              {post.contents.content}
            </div>
          </div>

        ): <div>No post detail available</div>}
      </div>
    </div>
  )
}

export default Post