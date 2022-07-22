/** @format */

import React, { useEffect, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import HeaderLink from "./HeaderLink";
import { useTheme } from "next-themes";
import {
  MdPeople,
  MdBusinessCenter,
  MdHome,
  MdMessage,
  MdNotifications,
  MdVerifiedUser,
  MdAccountCircle,
  MdWork,
  MdPhoneAndroid,
  MdOutlineApps,
} from "react-icons/md";
import { motion } from "framer-motion";
import useAuthentication from "../hooks/useAuthentication";
import { useSession } from "next-auth/react";
const headerItems = [
  {
    text: "Home",
    icon: MdHome,
    active: true,
    hidden: false,
  },
  {
    text: "My Network",
    icon: MdPeople,
    hidden: true,
  },

  {
    text: "Jobs",
    icon: MdBusinessCenter,
    hidden: true,
  },
  {
    text: "Messages",
    icon: MdMessage,
    hidden: false,
  },
  {
    text: "Notifications",
    icon: MdNotifications,
    hidden: false,
  },
  {
    text: "user",
    icon: MdAccountCircle,
    hidden: true,
    avatar: true,
  },
  {
    text: "Work",
    icon: MdOutlineApps,
    hidden: true,
  },
];
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
function Header() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <header className="flex items-center bg-white dark:theme justify-around sticky top-0 z-40 py-1.5 px-3 focus-within:shadow-lg">
      {/* Left */}
      <div className="flex items-center max-w-sm space-x-2 w-full">
        <LinkedInIcon className=" text-blue-700 dark:text-white h-10 w-10" />
        <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded md:w-full bg-gray-300">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            className="hidden md:inline-flex   text-sm focus:outline-none bg-gray-300 dark:bg-gray-700 flex-grow"
          />
        </div>
      </div>
      {/* Right */}
      <div>
        <div className=" flex sm:flex md:space-x-8 md:pr-4 space-x-4">
          {headerItems.map((item) => {
            return (
              <HeaderLink
                key={item.text}
                Icon={item.icon}
                text={item.text}
                active={item.active}
                hidden={item.hidden}
                avatar={item.avatar}
              />
            );
          })}
          {/* Dark mode toggle */}

          {/* Dark mode toggle */}
          {mounted && (
            <div
              className={` md:mt-2.5 bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
                resolvedTheme === "dark" ? "justify-end" : "justify-start"
              }`}
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <span className="absolute left-0">🌜</span>
              <motion.div
                className="w-5 h-5 bg-white rounded-full z-40"
                layout
                transition={spring}
              />

              <span className="absolute right-0.5">🌞</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
