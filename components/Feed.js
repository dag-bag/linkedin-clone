/** @format */

import Input from "../components/Input";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import Post from "../components/Post";

function Feed({ posts }) {
  const [RealTimePost, setRealTimePost] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();
      setRealTimePost(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };

    fetchPosts();
  }, [handlePost]);
  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {!useSSRPosts
        ? RealTimePost.map((post) => {
            return <Post key={post._id} post={post} />;
          })
        : posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
    </div>
  );
}

export default Feed;
