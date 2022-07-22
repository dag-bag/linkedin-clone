/** @format */
import HeaderLink from "../components/HeaderLink";
// import { MdExplore, MdPeople, MdBusinessCenter } from "react-icons/md";

import React from "react";
import Image from "next/image";
import { getProviders, signIn } from "next-auth/react";
import {
  MdExplore,
  MdPeople,
  MdBusinessCenter,
  MdOndemandVideo,
  MdArrowForwardIos,
} from "react-icons/md";
export default function Home({ providers }) {
  const headerItems = [
    {
      text: "Explore",
      icon: MdExplore,
    },
    {
      text: "People",
      icon: MdPeople,
    },
    {
      text: "Learning",
      icon: MdOndemandVideo,
    },
    {
      text: "Jobs",
      icon: MdBusinessCenter,
    },
  ];

  const arrowData = [
    {
      icon: MdArrowForwardIos,
      text: "Search for a job",
    },
    {
      icon: MdArrowForwardIos,
      text: "Find a person you know",
    },
    {
      icon: MdArrowForwardIos,
      text: "Learn a new skill",
    },
  ];
  return (
    <div>
      <header className="flex justify-around items-center py-4">
        <div className="relative w-35 h-10 ">
          <Image
            src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
            layout="fixed"
            width={150}
            height={50}
            objectFit="contain"
            alt="Linkedin logo"
          />
        </div>
        <div className="flex item-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4 ">
            {headerItems.map((item) => {
              return (
                <HeaderLink key={item.text} Icon={item.icon} text={item.text} />
              );
            })}
          </div>
          <div className="pl-4">
            {Object.values(providers).map((provider) => {
              return (
                <button
                  key={provider.name}
                  className="py-1.5 px-5 border border-blue-700 rounded-full text-blue-700 transition-all duration-100 hover:border-2"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in
                </button>
              );
            })}
          </div>
        </div>
      </header>
      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10 pt-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0  font-light           lg:text-[3.5rem] ">
            Welcome to your professional community
          </h1>
          <div className="space-y-4">
            {arrowData.map((item) => {
              return (
                <div key={item.text} className="intent border border-gray-200">
                  <h2 className="text-xl">{item.text}</h2>
                  <item.icon className="text-gray-700" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative xl:absolute w-80 h-80 xl:w-[700px] xl:h-[550px] top-14 right-5 mt-6">
          <Image src="/home.jpg" layout="fill" priority alt="Illustration" />
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
