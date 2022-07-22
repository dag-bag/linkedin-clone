/** @format */

import React from "react";
import { MdEdit } from "react-icons/md";
import { handlePostState, getPostState } from "../atoms/postAtom";
import { modalState, modalTypeState } from "../atoms/modelAtoms";
import { useRecoilState } from "recoil";
function PostMenu() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  return (
    <div className="origin-top-right absolute right-0  w-30 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
      <div
        className="py-1 divide-y divide-gray-100"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div
          className="flex items-center px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 space-x-2"
          role="menuitem"
        >
          <MdEdit />
          <span className="flex flex-col">
            <span>Edit</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostMenu;
