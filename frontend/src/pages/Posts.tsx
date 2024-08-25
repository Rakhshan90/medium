// import React from 'react'

import Navbar from "@/components/Navbar"
import PostCard from "@/components/PostCard"
import PostsSkeleton from "@/components/PostsSkeleton";
import { postsAtom } from "@/store/atoms";
import { useRecoilValueLoadable } from "recoil";
// import { usePosts } from "@/hooks"


interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
}
const Posts = () => {

  // const { loading, error, posts } = usePosts();
  const posts = useRecoilValueLoadable<Post>(postsAtom('postsAtom'));
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="max-w-xl divide-y divide-gray-500">
          {posts.state === 'loading' ? (
            <div>
              <PostsSkeleton />
              <PostsSkeleton />
              <PostsSkeleton />
              <PostsSkeleton />
            </div>
          ) : posts.state === 'hasError' ? (
            <div> Error while getting post, try to refresh the page</div>
          ) : posts.state === 'hasValue' && Array.isArray(posts.contents) ? (
            posts.contents.map((post, index) => (
              <PostCard
                key={index}
                id={post.id}
                authorName={post.author.name}
                publishedDate="Aug 08, 2024"
                title={post.title}
                content={post.content}
              />
            ))
          ) : <div>No posts available</div>}
        </div>
      </div>
    </div>
  )
}

export default Posts