/** @format */

import { Avatar, IconButton } from "@mui/material";
import React from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { useRecoilState } from "recoil";
import { handlePostState, getPostState } from "../atoms/postAtom";
import { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { modalState, modalTypeState } from "../atoms/modelAtoms";
import { useSession } from "next-auth/react";
import TimeAgo from "timeago-react";
// import TimeAgo from "timeago-react";
function Post({ post, modalPost }) {
  const { data: session } = useSession();
  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "...see more" : string;
  const [ShowInput, setShowInput] = useState(false);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [liked, setLiked] = useState(false);
  const deletePost = async (id) => {
    const response = await fetch("/api/post", {
      method: "DELETE",
      body: JSON.stringify({
        _id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respData = await response.json();
    console.log(respData);
    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } border-spacing-y-2 py-2.5 border border-gray-300 dark:border-none`}
    >
      <div className={`flex items-center px-2.5 cursor-pointer`}>
        {post.userImg ? (
          <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        ) : (
          <Avatar />
        )}
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline pt-3">
            {post.username}
          </h6>
          <p className="text-xs text-white/70 opacity-80">{post.email}</p>
          <TimeAgo
            datetime={post.createdAtPost}
            locale="vi"
            className="text-xs text-white/70 opacity-80"
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>
      {post.title && (
        <div className="px-2.5 break-all md:break-normal">
          {modalPost || ShowInput ? (
            <p onClick={() => setShowInput(false)}>{post.title}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.title, 150)}
            </p>
          )}
        </div>
      )}

      {post.imgUrl && !modalPost && (
        <img
          src={post.imgUrl}
          alt=""
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(post);
          }}
        />
      )}
      <div className="flex justify-evenly items-center border-t border-gray-300 dark:border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && "text-blue-500"}`}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}

            <h4>Like</h4>
          </button>
        )}

        {session?.user?.email === post.email ? (
          <button
            className="postButton focus:text-red-400"
            onClick={() => {
              deletePost(post._id);
            }}
          >
            <DeleteRoundedIcon />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="postButton ">
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
