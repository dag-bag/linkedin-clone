/** @format */

import { AnimatePresence } from "framer-motion";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modelAtoms";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import useAuthentication from "../hooks/useAuthentication";
import mongoose from "mongoose";
import Post from "../models/Post";
import Widgets from "../components/Widgets";

export default function Home({ posts, news }) {
  const status = useAuthentication();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white text-black h-screen overflow-y-scroll  md:space-y-6    ">
      <Head>
        <title>LinkeDin Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {/* <button
        onClick={() => {
          signOut();
        }}
      >
        SignOut
      </button> */}
      <main className="flex justify-center gap-x-5 px-4 sm:px-12 ">
        <div className="flex flex-col gap-5 md:flex-row">
          <Sidebar />
          <Feed posts={posts} />
        </div>
        <Widgets news={news} />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  let posts = await Post.find({}).sort({ createdAt: -1 });

  // Get Google News API

  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  );
  const news = await results.json();
  return {
    props: {
      session,
      posts: JSON.parse(JSON.stringify(posts)),
      news: JSON.parse(JSON.stringify(news.articles)),
    },
  };
}
