"use client";

import React, { useState } from "react";
import upgradeimg from "../../../../public/Image/Group 2.png";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import Catagories from "../../components/Catagories";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex justify-center items-start py-6">
      {/* main rounded container */}
      <div className="w-full mr-20 bg-white border-b border-gray-200 flex items-center px-6 relative">
        {/* 🔹 Sidebar reopen button (when hidden) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-2 top-4 z-20 bg-white border border-gray-200 rounded-full px-3 py-1 text-2xl text-gray-600 shadow-sm hover:bg-gray-100 transition"
          >
           <IoMdArrowDroprightCircle/>
          </button>
        )}

        {/* SIDEBAR */}
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
              className="text-2xl text-gray-500 border border-gray-200 rounded-full px-2 py-[2px] hover:bg-gray-100 transition"
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
            ].map((item, idx) => (
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
          {/* Top Sellers mini avatars */}
          <div className="mt-6 px-6">
            <p className="text-[11px] font-semibold text-gray-400 uppercase mb-3">
              Top Sellers
            </p>
            <div className="flex -space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400"
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
                           className="absolute top-[-40px] left-[-20px]"
                         />
                       </div>
                       <button className="text-xs font-semibold text-white bg-[#3226D9] rounded-lg py-2">
                         Upgrade Now
                       </button>
                     </div>
                   </div>

          {/* bottom toggles */}
          <div className="mt-auto px-6 pb-5 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="h-6 w-6 rounded-full bg-[#3226D9]" />
              <button className="h-6 w-6 rounded-full bg-gray-300" />
            </div>
            <button className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-500">
              ?
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-8 py-6mt-[-500px] ">
          {/* heading + breadcrumb + date */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Dashboard
              </h1>
              <p className="text-xs text-gray-400 mb-1">Home &gt; Dashboard</p>
            </div>
            <div className="text-xs text-gray-400">
              Feb 15, 2022 – Feb 21, 2022
            </div>
          </div>

          {/* top stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              {
                title: "Total sales",
                amount: "$126,500",
                percent: "34.7%",
              },
              {
                title: "Orders value",
                amount: "$136,800",
                percent: "22.6%",
              },
              {
                title: "Daily orders",
                amount: "$26,200",
                percent: "17.8%",
              },
              {
                title: "Daily Revenue",
                amount: "$12,125",
                percent: "23.9%",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl shadow-sm px-4 py-3 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-gray-400">{card.title}</p>
                  <span className="h-6 w-6 rounded-full bg-gray-100" />
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {card.amount}
                </p>
                <p className="text-[11px] text-emerald-500 font-semibold mt-1">
                  {card.percent}{" "}
                  <span className="text-gray-400 font-normal">
                    Compared to Jan 2022
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* Sales Performance + Best Sellers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Sales Performance */}
            <div className="bg-white rounded-2xl shadow-sm p-4 lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Sales Performance
                  </p>
                  <p className="text-[11px] text-gray-400">
                    Completed, Pending, Unpaid, Delivered
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span>Today&apos;s</span>
                  <button className="px-2 py-1 rounded-full bg-gray-100 text-[#3226D9] font-semibold">
                    Monthly
                  </button>
                </div>
              </div>
              {/* fake area chart */}
              <div className="mt-4 h-48 bg-gradient-to-t from-[#F4EBFF] to-white rounded-2xl relative overflow-hidden">
                <div className="absolute inset-4 flex items-end gap-2">
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((m) => (
                    <div
                      key={m}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div className="w-8 bg-[#E0D3FF] rounded-t-2xl h-20" />
                      <p className="mt-1 text-[10px] text-gray-400">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Best Sellers */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-800">
                  Best Sellers
                </p>
                <span className="h-7 w-7 rounded-full bg-gray-50" />
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  {
                    name: "Esther Howard",
                    role: "Louis Vuitton",
                    value: "$456.01",
                  },
                  {
                    name: "Wade Warren",
                    role: "Skrillatics",
                    value: "$439.22",
                  },
                  {
                    name: "Cameron Williamson",
                    role: "Mastercard",
                    value: "$421.00",
                  },
                  {
                    name: "Jenny Wilson",
                    role: "Paypal",
                    value: "$405.27",
                  },
                  {
                    name: "Leslie Alexander",
                    role: "Apple",
                    value: "$398.84",
                  },
                  {
                    name: "Kristin Watson",
                    role: "Starbucks",
                    value: "$351.02",
                  },
                ].map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-300 to-pink-300" />
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {item.role}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent purchases table */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-800">
                Recent Purchases
              </p>
              <span className="text-[11px] text-gray-400 cursor-pointer">
                View all
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead className="text-gray-400">
                  <tr className="border-b border-gray-100">
                    <th className="py-2 text-left">
                      <input type="checkbox" className="mr-2" />
                      Products
                    </th>
                    <th className="py-2 text-left">Order ID</th>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Customer name</th>
                    <th className="py-2 text-left">Status</th>
                    <th className="py-2 text-left">Amount</th>
                    <th className="py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {[
                    {
                      product: "MacBook Pro",
                      id: "#254135",
                      date: "Aug 5th, 2021",
                      name: "Bessie Cooper",
                      status: "Delivered",
                      amount: "$400.00",
                    },
                    {
                      product: "iPhone 13 Pro",
                      id: "#254135",
                      date: "Aug 5th, 2021",
                      name: "Annette Black",
                      status: "Pending",
                      amount: "$210.00",
                    },
                    {
                      product: "Oppo A20",
                      id: "#254135",
                      date: "Aug 5th, 2021",
                      name: "Bessie Cooper",
                      status: "Delivered",
                      amount: "$250.00",
                    },
                    {
                      product: "MacBook Pro",
                      id: "#254135",
                      date: "Aug 5th, 2021",
                      name: "Kristin Watson",
                      status: "Cancelled",
                      amount: "$160.00",
                    },
                    {
                      product: "MacBook Air",
                      id: "#254135",
                      date: "Aug 5th, 2021",
                      name: "Esther Howard",
                      status: "Delivered",
                      amount: "$700.00",
                    },
                    {
                      product: "Samsung A50",
                      id: "#254135",
                      date: "Aug 5th, 2021",
                      name: "Jerome Bell",
                      status: "Pending",
                      amount: "$210.00",
                    },
                    {
                      product: "MacBook Air",
                      id: "#254135",
                      date: "Aug 5th, 2021",
                      name: "Brooklyn",
                      status: "Cancelled",
                      amount: "$160.00",
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b last:border-0 border-gray-100"
                    >
                      <td className="py-2">
                        <input type="checkbox" className="mr-2" />
                        {row.product}
                      </td>
                      <td className="py-2">{row.id}</td>
                      <td className="py-2">{row.date}</td>
                      <td className="py-2">{row.name}</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                            row.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-500"
                              : row.status === "Pending"
                              ? "bg-amber-50 text-amber-500"
                              : "bg-rose-50 text-rose-500"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2">{row.amount}</td>
                      <td className="py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400 inline-block mr-1" />
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400 inline-block mr-1" />
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400 inline-block" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            {/* Market Overview */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-800">
                  Market Overview
                </p>
                <span className="h-6 w-6 rounded-full bg-gray-50" />
              </div>
              <div className="flex items-end gap-2 h-32">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (d, i) => (
                    <div key={d} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-5 rounded-full bg-[#E0D3FF]"
                        style={{ height: `${40 + i * 5}px` }}
                      />
                      <p className="mt-1 text-[10px] text-gray-400">{d}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Visits by Source */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-800">
                  Visits by Source
                </p>
                <span className="h-6 w-6 rounded-full bg-gray-50" />
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-28 w-28">
                  <div className="absolute inset-0 rounded-full border-[10px] border-purple-400" />
                  <div className="absolute inset-3 rounded-full border-[10px] border-pink-400" />
                  <div className="absolute inset-6 rounded-full bg-white flex items-center justify-center">
                    <p className="text-xs font-semibold text-gray-700">52%</p>
                  </div>
                </div>
                <div className="text-[11px] text-gray-500 space-y-1">
                  <p>
                    <span className="inline-block h-2 w-2 rounded-full bg-purple-400 mr-1" />
                    Direct
                  </p>
                  <p>
                    <span className="inline-block h-2 w-2 rounded-full bg-pink-400 mr-1" />
                    Social
                  </p>
                  <p>
                    <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 mr-1" />
                    Email
                  </p>
                  <p>
                    <span className="inline-block h-2 w-2 rounded-full bg-gray-300 mr-1" />
                    Other
                  </p>
                  <p className="mt-2 text-[10px] text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </p>
                </div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-800">
                  Total Revenue
                </p>
                <span className="h-6 w-6 rounded-full bg-gray-50" />
              </div>
              <div className="h-32 bg-gradient-to-t from-[#FFE6F2] via-white to-[#E5E0FF] rounded-2xl flex items-end gap-1 px-3 pb-3">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#E0D3FF] rounded-t-full"
                    style={{ height: `${30 + (i % 5) * 8}px` }}
                  />
                ))}
              </div>
              <p className="mt-2 text-[10px] text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
