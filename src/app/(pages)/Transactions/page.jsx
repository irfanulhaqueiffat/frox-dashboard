"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import upgradeimg from "../../../../public/Image/Group 2.png";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import Catagories from "../../components/Catagories";
const pendingTransactionsData = [
  {
    id: 1,
    orderId: "#25413",
    paid: "$2458",
    method: "Credit Card",
    brand: "Visa",
    date: "17 Oct, 2022",
    status: "Pending",
  },
  {
    id: 2,
    orderId: "#25413",
    paid: "$2458",
    method: "American Express",
    brand: "Amex",
    date: "17 Oct, 2022",
    status: "Pending",
  },
  {
    id: 3,
    orderId: "#25413",
    paid: "$2458",
    method: "Paypal",
    brand: "Paypal",
    date: "17 Oct, 2022",
    status: "Pending",
  },
  {
    id: 4,
    orderId: "#25413",
    paid: "$2458",
    method: "Credit Card",
    brand: "Mastercard",
    date: "17 Oct, 2022",
    status: "Pending",
  },
  {
    id: 5,
    orderId: "#25413",
    paid: "$2458",
    method: "American Express",
    brand: "Amex",
    date: "17 Oct, 2022",
    status: "Pending",
  },
  {
    id: 6,
    orderId: "#25413",
    paid: "$2458",
    method: "Paypal",
    brand: "Paypal",
    date: "17 Oct, 2022",
    status: "Pending",
  },
];

const completedTransactionsData = [
  {
    id: 101,
    orderId: "#25413",
    paid: "$2458",
    method: "Credit Card",
    brand: "Visa",
    date: "17 Oct, 2022",
    status: "Completed",
  },
  {
    id: 102,
    orderId: "#25413",
    paid: "$2458",
    method: "American Express",
    brand: "Amex",
    date: "17 Oct, 2022",
    status: "Completed",
  },
  {
    id: 103,
    orderId: "#25413",
    paid: "$2458",
    method: "Paypal",
    brand: "Paypal",
    date: "17 Oct, 2022",
    status: "Completed",
  },
  {
    id: 104,
    orderId: "#25413",
    paid: "$2458",
    method: "Credit Card",
    brand: "Mastercard",
    date: "17 Oct, 2022",
    status: "Completed",
  },
  {
    id: 105,
    orderId: "#25413",
    paid: "$2458",
    method: "Credit Card",
    brand: "Visa",
    date: "17 Oct, 2022",
    status: "Completed",
  },
  {
    id: 106,
    orderId: "#25413",
    paid: "$2458",
    method: "Credit Card",
    brand: "Visa",
    date: "17 Oct, 2022",
    status: "Completed",
  },
];

const perPage = 5;

const statusBadgeColors = {
  Pending: "bg-amber-50 text-amber-500",
  Completed: "bg-emerald-50 text-emerald-500",
};

const brandDotColors = {
  Visa: "bg-blue-500",
  Mastercard: "bg-red-500",
  Amex: "bg-orange-500",
  Paypal: "bg-sky-500",
};

const Page = () => {
  const [statusFilter, setStatusFilter] = useState("All"); // "All" | "Pending" | "Completed"
  const [pendingPage, setPendingPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);
  const [openActionId, setOpenActionId] = useState(null);
  const [openActionSection, setOpenActionSection] = useState(null); // "pending" | "completed" | null
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 🔹 sidebar toggle

  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(e.target)
      ) {
        setOpenActionId(null);
        setOpenActionSection(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // reset pages when filter changes
  useEffect(() => {
    setPendingPage(1);
    setCompletedPage(1);
  }, [statusFilter]);

  const paginate = (list, page) => {
    const totalPages = Math.max(1, Math.ceil(list.length / perPage));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * perPage;
    const end = start + perPage;
    return {
      slice: list.slice(start, end),
      totalPages,
      safePage,
    };
  };

  const pendingPaginated = useMemo(
    () => paginate(pendingTransactionsData, pendingPage),
    [pendingPage]
  );
  const completedPaginated = useMemo(
    () => paginate(completedTransactionsData, completedPage),
    [completedPage]
  );

  const handleActionClick = (id, section) => {
    if (openActionId === id && openActionSection === section) {
      setOpenActionId(null);
      setOpenActionSection(null);
    } else {
      setOpenActionId(id);
      setOpenActionSection(section);
    }
  };

  const handleRowAction = (action, row) => {
    console.log(`Action: ${action}`, row);
    setOpenActionId(null);
    setOpenActionSection(null);
  };

  const renderTableHeader = () => (
    <div className="grid grid-cols-[40px,120px,1fr,1fr,1fr,1fr,60px] text-[11px] text-gray-400 font-semibold border-b border-gray-100 pb-2 mb-1 min-w-[640px]">
      <div>
        <input type="checkbox" className="accent-[#3226D9]" />
      </div>
      <div>Order ID</div>
      <div>Paid</div>
      <div>Payment Method</div>
      <div>Date</div>
      <div>Status</div>
      <div className="text-right pr-4">Actions</div>
    </div>
  );

  const renderRow = (row, section) => (
    <div
      key={row.id}
      className="grid grid-cols-[40px,120px,1fr,1fr,1fr,1fr,60px] items-center py-2 rounded-xl hover:bg-[#F7F7FB] transition min-w-[640px]"
    >
      {/* checkbox */}
      <div>
        <input type="checkbox" className="accent-[#3226D9]" />
      </div>

      {/* order id */}
      <div className="text-gray-500">{row.orderId}</div>

      {/* paid */}
      <div className="text-gray-700 font-semibold">{row.paid}</div>

      {/* payment method */}
      <div className="flex items-center gap-2 text-gray-500">
        <span
          className={`h-5 w-8 rounded-md flex items-center justify-center ${
            brandDotColors[row.brand] || "bg-gray-300"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
        {row.method}
      </div>

      {/* date */}
      <div className="text-gray-500">{row.date}</div>

      {/* status */}
      <div>
        <span
          className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
            statusBadgeColors[row.status] || "bg-gray-100 text-gray-500"
          }`}
        >
          {row.status}
        </span>
      </div>

      {/* actions */}
      <div className="relative flex justify-end pr-2">
        <button
          onClick={() => handleActionClick(row.id, section)}
          className="text-gray-400 text-xl leading-none px-2 py-1 rounded-full hover:bg-gray-100"
        >
          ···
        </button>
        {openActionId === row.id && openActionSection === section && (
          <div
            ref={actionMenuRef}
            className="absolute right-0 top-7 w-36 bg-white border rounded-lg shadow-md text-[11px] text-gray-600 z-20"
          >
            <button
              onClick={() => handleRowAction("view", row)}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              View details
            </button>
            <button
              onClick={() => handleRowAction("edit", row)}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              Edit transaction
            </button>
            {section === "pending" && (
              <button
                onClick={() => handleRowAction("complete", row)}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                Completed
              </button>
            )}
            <button
              onClick={() => handleRowAction("cancel", row)}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-rose-500"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderPagination = (currentPage, totalPages, setPage) => (
    <div className="flex items-center justify-between mt-4 text-[11px] text-gray-500">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(Math.max(1, currentPage - 1))}
          className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40"
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <button
          onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
          className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40"
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`h-7 w-7 rounded-lg text-xs ${
              num === currentPage
                ? "bg-[#3226D9] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
          className="ml-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center items-start py-6 bg-[#F6F7FB]">
      <div className="w-full mr-20 bg-white border-b border-gray-200 flex items-start px-6 relative">
        {/* 🔹 Sidebar reopen button (when hidden) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-2 top-4 z-20 bg-white border border-gray-200 rounded-full px-3 py-1 text-2xl text-gray-600 shadow-sm hover:bg-gray-100 transition"
          >
            <IoMdArrowDroprightCircle/>
          </button>
        )}

        {/* ========== SIDEBAR ========== */}
        <aside
          className={`w-64 mt-[20px] bg-white border-r border-gray-100 flex flex-col transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* header + hide button */}
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

        {/* ========== MAIN CONTENT ========== */}
        <main className="flex-1 px-8 py-6 bg-[#F6F7FB]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Transactions List
              </h1>
              <p className="text-xs text-gray-400">Home &gt; Order list</p>
            </div>

            {/* Right filters */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] justify-end">
              <div className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500 flex items-center gap-2">
                <span>10-02-2021</span>
                <span>▾</span>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500"
              >
                <option value="All">Status: All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>

              <button className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500">
                Filters
              </button>
            </div>
          </div>

          {/* Category row */}
          <div className="flex flex-wrap items-center justify-between mb-4 text-[11px] gap-3">
            <div className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500 flex items-center gap-2">
              <span>All Category</span>
              <span>▾</span>
            </div>
            <p className="text-gray-400 text-xs">
              Feb 15, 2022 - Feb 21, 2022
            </p>
          </div>

          {/* =================== PENDING SECTION =================== */}
          {(statusFilter === "All" || statusFilter === "Pending") && (
            <section className="bg-white rounded-2xl shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700">
                  Pending transactions
                </h2>
                <button className="text-gray-400 text-xl leading-none">
                  ···
                </button>
              </div>

              <div className="overflow-x-auto">
                {renderTableHeader()}
                <div className="space-y-1 text-xs">
                  {pendingPaginated.slice.map((row) =>
                    renderRow(row, "pending")
                  )}
                </div>
              </div>

              {renderPagination(
                pendingPaginated.safePage,
                pendingPaginated.totalPages,
                setPendingPage
              )}
            </section>
          )}

          {/* =================== COMPLETED SECTION =================== */}
          {(statusFilter === "All" || statusFilter === "Completed") && (
            <section className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700">
                  Completed transactions
                </h2>
                <button className="text-gray-400 text-xl leading-none">
                  ···
                </button>
              </div>

              <div className="overflow-x-auto">
                {renderTableHeader()}
                <div className="space-y-1 text-xs">
                  {completedPaginated.slice.map((row) =>
                    renderRow(row, "completed")
                  )}
                </div>
              </div>

              {renderPagination(
                completedPaginated.safePage,
                completedPaginated.totalPages,
                setCompletedPage
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Page;
