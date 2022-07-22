/** @format */

import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { motion } from "framer-motion";
import {
  MdPhotoLibrary,
  MdVideoLibrary,
  MdBusinessCenter,
  MdArticle,
} from "react-icons/md";
import { useRecoilState } from "recoil";
import { modalTypeState, modalState } from "../atoms/modelAtoms";
const buttonData = [
  {
    icon: MdPhotoLibrary,
    text: "Photo",
    color: "text-blue-400",
  },
  {
    icon: MdVideoLibrary,
    text: "Video",
    color: "text-green-400",
  },
  {
    icon: MdBusinessCenter,
    text: "Job",
    color: "text-orange-400",
  },
  {
    icon: MdArticle,
    text: "File",
    color: "text-red-400",
  },
];

function Input() {
  const { data: session } = useSession();
  const [ModelState, setModalOpen] = useRecoilState(modalState);
  const [ModalTypeState, setModalType] = useRecoilState(modalTypeState);

  return (
    <div className="bg-white dark:theme rounded-lg p-3 border border-gray-300 dark:border-none space-y-3">
      <div className="flex items-center space-x-2">
        <Avatar src={session?.user?.image} className="!h-10 !w-10" />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left"
          onClick={() => {
            setModalOpen(true);
            setModalType("dropIn");
          }}
        >
          Start a post
        </motion.button>
      </div>
      <div className="flex items-center flex-wrap gap-4 justify-center md:gap-x-10">
        {buttonData.map((data) => {
          return (
            <button key={data.text} className="inputButton group">
              <data.icon className={`${data.color} !h-6 !w-6`} />
              <h4 className="opacity-80 group-hover:opacity-100">
                {data.text}
              </h4>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Input;
