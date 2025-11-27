"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import upgradeimg from "../../../../public/Image/Group 2.png";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import Catagories from "../../components/Catagories";

const ordersData = [
  {
    id: "#25413",
    customer: "Jerome Bell",
    method: "American Express",
    date: "17 Oct, 2022",
    status: "Delivered",
    total: 106.58,
  },
  {
    id: "#25413",
    customer: "Cody Fisher",
    method: "PayPal",
    date: "1 Feb, 2022",
    status: "Pending",
    total: 710.68,
  },
  {
    id: "#25413",
    customer: "Wade Warren",
    method: "Check",
    date: "8 Sep, 2022",
    status: "Delivered",
    total: 406.27,
  },
  {
    id: "#25413",
    customer: "Savannah Nguyen",
    method: "PayPal",
    date: "17 Oct, 2022",
    status: "Canceled",
    total: 943.65,
  },
  {
    id: "#25413",
    customer: "Savannah Nguyen",
    method: "Visa",
    date: "21 Sep, 2022",
    status: "Canceled",
    total: 943.65,
  },
  {
    id: "#25413",
    customer: "Savannah Nguyen",
    method: "Cash",
    date: "22 Oct, 2022",
    status: "Canceled",
    total: 943.65,
  },
  {
    id: "#25413",
    customer: "Kathryn Murphy",
    method: "Visa",
    date: "22 Oct, 2022",
    status: "Delivered",
    total: 450.54,
  },
  {
    id: "#25413",
    customer: "Kathryn Murphy",
    method: "MasterCard",
    date: "21 Sep, 2022",
    status: "Delivered",
    total: 450.54,
  },
  {
    id: "#25413",
    customer: "Kathryn Murphy",
    method: "American Express",
    date: "21 Sep, 2022",
    status: "Delivered",
    total: 450.54,
  },
  {
    id: "#25413",
    customer: "Eleanor Pena",
    method: "PayPal",
    date: "17 Oct, 2022",
    status: "Pending",
    total: 219.78,
  },
  {
    id: "#25413",
    customer: "Ronald Richards",
    method: "Visa",
    date: "24 May, 2022",
    status: "Pending",
    total: 219.78,
  },
  {
    id: "#25413",
    customer: "Jerome Bell",
    method: "Visa",
    date: "24 May, 2022",
    status: "Canceled",
    total: 576.28,
  },
  {
    id: "#25413",
    customer: "Floyd Miles",
    method: "Cash",
    date: "24 May, 2022",
    status: "Canceled",
    total: 576.28,
  },
  {
    id: "#25413",
    customer: "Ralph Edwards",
    method: "American Express",
    date: "24 May, 2022",
    status: "Canceled",
    total: 576.28,
  },
  {
    id: "#25413",
    customer: "Guy Hawkins",
    method: "American Express",
    date: "17 Oct, 2022",
    status: "Canceled",
    total: 576.28,
  },
];

const Page = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-newest"); // date-newest | date-oldest | total-high | total-low
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const perPage = 8;

  // 🔹 sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ===== filter + sort =====
  const filteredOrders = useMemo(() => {
    let list = [...ordersData];

    // status
    if (statusFilter !== "All") {
      list = list.filter((o) => o.status === statusFilter);
    }

    // search (order id, customer, payment method)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.method.toLowerCase().includes(q)
      );
    }

    // sort
    list.sort((a, b) => {
      const parseDate = (d) => new Date(d).getTime();
      switch (sortBy) {
        case "date-oldest":
          return parseDate(a.date) - parseDate(b.date);
        case "total-high":
          return b.total - a.total;
        case "total-low":
          return a.total - b.total;
        case "date-newest":
        default:
          return parseDate(b.date) - parseDate(a.date);
      }
    });

    return list;
  }, [statusFilter, sortBy, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / perPage));
  const currentPage = Math.min(pageIndex, totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageOrders = filteredOrders.slice(start, end);

  const statusColors = {
    Delivered: "bg-emerald-50 text-emerald-500",
    Pending: "bg-amber-50 text-amber-500",
    Canceled: "bg-rose-50 text-rose-500",
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-6">
      {/* main container */}
      <div className="w-full mr-20 bg-white border-b border-gray-200 flex items-start px-6 relative">
        {/* 🔹 Sidebar reopen button (when hidden) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-2 top-4 z-20 bg-white border border-gray-200 rounded-full px-3 py-1 text-2xl text-gray-600 shadow-sm hover:bg-gray-100 transition"
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
              className="text-2xl text-gray-500 border border-gray-200 rounded-full px-2 py-[2px] hover:bg-gray-100 transition"
            >
            <IoMdArrowDropleftCircle />
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

        {/* ========== MAIN CONTENT (NO NAVBAR) ========== */}
        <main className="flex-1 px-8 py-6 bg-[#F6F7FB]">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Orders List
              </h1>
              <p className="text-xs text-gray-400">Home &gt; Order List</p>
            </div>

            {/* Right: Date range / status / sort / filters */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] justify-end">
              <div className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500 flex items-center gap-2">
                <span>10-02-2021</span>
                <span>▾</span>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPageIndex(1);
                }}
                className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500"
              >
                <option value="All">Status: All</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Canceled">Canceled</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPageIndex(1);
                }}
                className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500"
              >
                <option value="date-newest">Date: Newest</option>
                <option value="date-oldest">Date: Oldest</option>
                <option value="total-high">Total: High → Low</option>
                <option value="total-low">Total: Low → High</option>
              </select>

              <button className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500">
                Filters
              </button>
            </div>
          </div>

          {/* Category selector + search */}
          <div className="flex flex-wrap items-center justify-between mb-4 text-[11px] gap-3">
            <div className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500 flex items-center gap-2">
              <span>All Category</span>
              <span>▾</span>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-gray-400 text-xs hidden sm:block">
                Feb 15, 2022 - Feb 21, 2022
              </p>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPageIndex(1);
                  }}
                  placeholder="Search by order, customer, method..."
                  className="border border-gray-200 rounded-full px-3 py-1 pl-4 text-xs text-gray-600 bg-white focus:outline-none focus:border-[#3226D9] min-w-[220px]"
                />
              </div>
            </div>
          </div>

          {/* Orders table card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Title row inside card */}
            <div className="flex items-center justify-between mb-3 text-[11px]">
              <h2 className="text-sm font-semibold text-gray-700">
                Recent Orders
              </h2>
              <p className="text-gray-400">
                Showing {pageOrders.length} of {filteredOrders.length} orders
              </p>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[40px,120px,1.5fr,1.5fr,1fr,1fr,80px] text-[11px] text-gray-400 font-semibold border-b border-gray-100 pb-2 mb-1">
              <div>
                <input type="checkbox" className="accent-[#3226D9]" />
              </div>
              <div>Order ID</div>
              <div>Customer name</div>
              <div>Payment Method</div>
              <div>Date</div>
              <div>Status</div>
              <div className="text-right pr-4">Total</div>
            </div>

            {/* Table rows */}
            <div className="space-y-1 text-xs">
              {pageOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[40px,120px,1.5fr,1.5fr,1fr,1fr,80px] items-center py-2 rounded-xl hover:bg-[#F7F7FB] transition"
                >
                  {/* checkbox */}
                  <div>
                    <input type="checkbox" className="accent-[#3226D9]" />
                  </div>

                  {/* order id */}
                  <div className="text-gray-500">{order.id}</div>

                  {/* customer + avatar */}
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                    <span className="text-gray-700">{order.customer}</span>
                  </div>

                  {/* payment method */}
                  <div className="text-gray-500">{order.method}</div>

                  {/* date */}
                  <div className="text-gray-500">{order.date}</div>

                  {/* status */}
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* total + actions */}
                  <div className="flex items-center justify-between pr-1">
                    <span className="text-gray-700 font-semibold">
                      ${order.total.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href="/OrderDetails"
                        className="text-[#3226D9] text-[11px] hover:underline"
                      >
                        View
                      </Link>
                      <button className="text-gray-400 text-xl leading-none">
                        ···
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {pageOrders.length === 0 && (
                <div className="py-6 text-center text-xs text-gray-400">
                  No orders found for this filter/search.
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 text-[11px] text-gray-500">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPageIndex((p) => Math.max(1, p - 1))}
                  className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40"
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                <button
                  onClick={() =>
                    setPageIndex((p) => Math.min(totalPages, p + 1))
                  }
                  className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40"
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => setPageIndex(num)}
                      className={`h-7 w-7 rounded-lg text-xs ${
                        num === currentPage
                          ? "bg-[#3226D9] text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-300"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setPageIndex((p) => Math.min(totalPages, p + 1))
                  }
                  className="ml-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
