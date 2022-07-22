/** @format */

import { Avatar, Hidden } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

function HeaderLink({ Icon, text, avatar, feed, active, hidden }) {
  const { data: session } = useSession();
  return (
    <div
      className={`flex flex-col justify-center items-center cursor-pointer ${
        feed
          ? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1"
          : "text-gray-500 hover:text-gray-700"
      }  ${hidden ? "hidden md:inline-flex" : "inline-flex"} ${
        active && "text-black dark:text-white"
      }  `}
    >
      {avatar ? (
        <Avatar
          src={session?.user?.image}
          className="!h-7 !w-7 cursor-pointer"
        />
      ) : (
        <Icon className={`text-2xl  ${hidden && "hidden md:inline-flex"}`} />
      )}

      <h4 className="text-sm hidden lg:flex">{text}</h4>
      {active && (
        <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black  rounded-t-full dark:bg-white" />
      )}
    </div>
  );
}

export default HeaderLink;
