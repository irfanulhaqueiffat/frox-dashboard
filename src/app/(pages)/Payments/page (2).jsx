"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import upgradeimg from "../../../../public/Image/Group 2.png";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import Catagories from "../../components/Catagories";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex justify-center items-start py-6 bg-[#F6F7FB]">
      <div className="w-full mr-20 bg-white border-b border-gray-200 flex items-start px-6 relative">
        {/* 🔹 Sidebar reopen button (when hidden) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-2 top-4 z-20 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 shadow-sm hover:bg-gray-100 transition"
          >
           <IoMdArrowDroprightCircle />
          </button>
        )}

        {/* ========== SIDEBAR ========== */}
        <aside
          className={`w-64 mt-[20px] bg-white border-r border-gray-100 flex flex-col transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar header + hide button */}
          <div className="px-4 pt-3 pb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-400 uppercase">
              Menu
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-[11px] text-gray-500 border border-gray-200 rounded-full px-2 py-[2px] hover:bg-gray-100 transition"
            >
             <IoMdArrowDropleftCircle/>
            </button>
          </div>

          {/* Main nav */}
          <div className="space-y-1 px-2">
            {[
              "Dashboard",
              "Products",
              "Orders",
              "Payments",
              "Transactions",
              "Clients",
            ].map((item) => (
              <Link
                href={`/${item}`}
                key={item}
                className="flex items-center rounded-xl px-3 py-2 text-sm w-full text-left mb-1 text-gray-500 hover:bg-blue-800 hover:text-white transition"
              >
                <span className="h-2 w-2 rounded-full bg-gray-300 mr-2" />
                {item}
              </Link>
            ))}
          </div>

          {/* Categories */}
        <Catagories />

          {/* Top Sellers */}
          <div className="mt-6 px-6">
            <p className="text-[11px] font-semibold text-gray-400 uppercase mb-3">
              Top Sellers
            </p>
            <div className="flex -space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400 shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* Upgrade card */}
          <div className="w-[206px] bg-[#E8EDF2] rounded-2xl mb-20 mt-[74px]">
            <div className="mt-6 mx-4 mb-5 rounded-2xl bg-[#E9E6FF] p-4 flex flex-col relative overflow-hidden">
              <div className="h-20 p-20 rounded-xl flex items-center justify-center mb-4 mt-20 relative">
                <Image
                  src={upgradeimg}
                  alt="Upgrade Image"
                  className="absolute top-[-40px] left-[-20px] transition-transform duration-300 hover:scale-105"
                />
              </div>
              <button className="text-xs font-semibold text-white bg-[#3226D9] rounded-lg py-2 hover:bg-[#2419a8] transition">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* bottom toggles */}
          <div className="mt-auto px-6 pb-5 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="h-6 w-6 rounded-full bg-[#3226D9] shadow-inner" />
              <button className="h-6 w-6 rounded-full bg-gray-300" />
            </div>
            <button className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-500 hover:bg-gray-100 transition">
              ?
            </button>
          </div>
        </aside>

        {/* ========== MAIN CONTENT ========== */}
        <main className="flex-1 px-8 py-6 bg-[#F6F7FB]">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Simple Page
          </h1>
          <p className="text-xs text-gray-400 mb-6">Home &gt; Page</p>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700 text-sm">
        {/* mAIN PAGE CONTENT */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
