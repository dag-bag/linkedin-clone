/** @format */

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState } from "../atoms/modelAtoms";
import { handlePostState } from "../atoms/postAtom";
function Form() {
  const { data: session } = useSession();
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const setModalOpen = useSetRecoilState(modalState);
  const [TextArea, setTextArea] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const upLoadPost = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        title: TextArea,
        imgUrl: photoUrl,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAtPost: new Date().getTime().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <form className="flex flex-col relative space-y-2">
      <textarea
        name=""
        id=""
        rows="4"
        placeholder="What do you want to talk about ?"
        className="bg-white dark:bg-black dark:text-white text-black border-2 border-gray-600 rounded-lg p-2"
        value={TextArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a photo URL (optional)"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button
        className="absolute -bottom-2 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
        type="submit"
        disabled={!TextArea.trim() && !photoUrl.trim()}
        onClick={upLoadPost}
      >
        Post
      </button>
    </form>
  );
}

export default Form;
