"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import upgradeimg from "../../../../public/Image/Group 2.png";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import Catagories from "../../components/Catagories";
const customersData = [
  {
    id: 1,
    name: "Raymond Barton",
    email: "tim.jennings@site.com",
    phone: "+098 856 245",
    address: "1128 S San Jose Dr, Abilene, Texas(TX), 79605",
    status: "Online",
    joined: "28 Jan 2022",
  },
  {
    id: 2,
    name: "Gary Simmons",
    email: "josephpw@apex.com",
    phone: "+098 856 245",
    address: "189 Macawer St, Bishop, California(CA), 93514",
    status: "Offline",
    joined: "28 Jan 2022",
  },
  {
    id: 3,
    name: "Doug Bird",
    email: "josephpw@apex.com",
    phone: "+098 856 245",
    address: "718 Boyce St, Madisonville, Kentucky(KY)",
    status: "Online",
    joined: "28 Jan 2022",
  },
  {
    id: 4,
    name: "Georgia Burgess",
    email: "tuobj@mgme.com",
    phone: "+098 856 245",
    address: "7 N Main St, Lowell, North Carolina(NC)",
    status: "Offline",
    joined: "28 Jan 2022",
  },
  {
    id: 5,
    name: "Ray Smart",
    email: "ratioh@mac.com",
    phone: "+098 856 245",
    address: "24675 Highway W, Waynesville, Missouri(MO)",
    status: "Online",
    joined: "28 Jan 2022",
  },
  {
    id: 6,
    name: "Calvin Robinson",
    email: "listauto@sbcglobal.net",
    phone: "+098 856 245",
    address: "5255 N Magnolia Ave #5C, Santee, California(CA)",
    status: "Online",
    joined: "28 Jan 2022",
  },
  {
    id: 7,
    name: "Andrea Elliot",
    email: "daxtel@live.com",
    phone: "+098 856 245",
    address: "2 Court St, Binghamton, New York(NY)",
    status: "Offline",
    joined: "28 Jan 2022",
  },
  {
    id: 8,
    name: "Phoebe Abbott",
    email: "elitza@igott.net",
    phone: "+098 856 245",
    address: "Altobenton, Pennsylvania(PA), 17801",
    status: "Online",
    joined: "28 Jan 2022",
  },
  {
    id: 9,
    name: "Laurel Estrada",
    email: "noath@msn.com",
    phone: "+098 856 245",
    address: "13228 Usase Ave, Robbins, Illinois(IL), 60472",
    status: "Offline",
    joined: "28 Jan 2022",
  },
  {
    id: 10,
    name: "Percy Hawkins",
    email: "clmbikall@cool.com",
    phone: "+098 856 245",
    address: "2716 2008th Hwy, Whitebass, Kentucky(KY)",
    status: "Online",
    joined: "28 Jan 2022",
  },
];

const perPage = 7;

const statusColors = {
  Online: "bg-emerald-50 text-emerald-500",
  Offline: "bg-gray-100 text-gray-500",
};

// 🔹 ডাইনামিক কলাম কনফিগ (pure JS)
const columns = [
  {
    key: "name",
    label: "Name",
    sortable: true,
    headerClassName:
      "flex items-center justify-between pl-3 pr-2 hover:text-gray-600 transition",
    cellClassName: "flex items-center gap-2 pl-3",
    renderCell: (c) => (
      <>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-sm" />
        <span className="text-gray-700 font-semibold">{c.name}</span>
      </>
    ),
  },
  {
    key: "email",
    label: "E-mail",
    sortable: true,
    headerClassName:
      "flex items-center justify-between pl-3 pr-2 hover:text-gray-600 transition",
    cellClassName: "text-gray-500 pl-3",
    renderCell: (c) => c.email,
  },
  {
    key: "phone",
    label: "Phone",
    sortable: true,
    headerClassName:
      "flex items-center justify-between pl-3 pr-2 hover:text-gray-600 transition",
    cellClassName: "text-gray-500 pl-3",
    renderCell: (c) => c.phone,
  },
  {
    key: "address",
    label: "Billing Address",
    sortable: true,
    headerClassName: "flex items-center justify-between pl-3 pr-2",
    cellClassName: "text-gray-500 truncate pl-3",
    renderCell: (c) => c.address,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    headerClassName:
      "flex items-center justify-between pl-3 pr-2 hover:text-gray-600 transition",
    cellClassName: "pl-3",
    renderCell: (c) => (
      <span
        className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
          statusColors[c.status] || "bg-gray-100 text-gray-500"
        }`}
      >
        {c.status}
      </span>
    ),
  },
];

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [openActionId, setOpenActionId] = useState(null);

  // 🔹 ডাইনামিক sort state (JS)
  const [sortField, setSortField] = useState("name"); // columns[].key এর যে কোনোটা
  const [sortDirection, setSortDirection] = useState("asc"); // "asc" | "desc"

  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setOpenActionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setPageIndex(1);
  }, [statusFilter, search]);

  const filteredCustomers = useMemo(() => {
    let list = [...customersData];

    if (statusFilter !== "All") {
      list = list.filter((c) => c.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }

    // 🔹 ডাইনামিক sort section (JS)
    list.sort((a, b) => {
      const col = columns.find((c) => c.key === sortField);
      if (!col || !col.sortable) return 0;

      const valA = a[col.key];
      const valB = b[col.key];

      const va = (valA ?? "").toString().toLowerCase();
      const vb = (valB ?? "").toString().toLowerCase();

      if (va < vb) return sortDirection === "asc" ? -1 : 1;
      if (va > vb) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [statusFilter, search, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / perPage));
  const currentPage = Math.min(pageIndex, totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageCustomers = filteredCustomers.slice(start, end);

  const handleActionClick = (id) => {
    setOpenActionId((prev) => (prev === id ? null : id));
  };

  const handleRowAction = (action, row) => {
    console.log("Action:", action, row);
    setOpenActionId(null);
  };

  const handleSortClick = (fieldKey) => {
    if (sortField === fieldKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(fieldKey);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (fieldKey) => {
    if (sortField !== fieldKey) return null;
    return (
      <span className="ml-1 text-[10px]">
        {sortDirection === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  const renderPagination = () => (
    <div className="flex items-center justify-between mt-6 text-[11px] text-gray-500">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPageIndex(Math.max(1, currentPage - 1))}
          className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40 transition hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <button
          onClick={() =>
            setPageIndex(Math.min(totalPages, currentPage + 1))
          }
          className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40 transition hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPageIndex(num)}
            className={`h-7 w-7 rounded-lg text-xs transition ${
              num === currentPage
                ? "bg-[#3226D9] text-white shadow-sm"
                : "bg-gray-100 text-gray-500 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() =>
            setPageIndex(Math.min(totalPages, currentPage + 1))
          }
          className="ml-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40 transition"
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
         <IoMdArrowDroprightCircle />
          </button>
        )}

        {/* ========== SIDEBAR ========== */}
        <aside
          className={`w-64 mt-[10px] bg-white border-r border-gray-100 flex flex-col transform transition-transform duration-300 ${
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
                className="flex items-center rounded-xl px-3 py-2 text-sm w-full text-left mb-1 transition text-gray-500 hover:bg-blue-800 hover:text-white"
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
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <h1 className="text-2xl font-semibold text-gray-800">
                Customers List
              </h1>
              <p className="text-xs text-gray-400">Home &gt; Order list</p>
            </div>

            {/* Right filters */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] justify-end">
              <div className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500 flex items-center gap-2 shadow-sm">
                <span>10-02-2021</span>
                <span>▾</span>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500 shadow-sm hover:border-[#3226D9] transition"
              >
                <option value="All">Status: All</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>

              <button className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500 hover:bg-gray-100 shadow-sm transition">
                Filters
              </button>
            </div>
          </div>

          {/* Top row: category + search + date label */}
          <div className="flex flex-wrap items-center justify-between mb-4 text-[11px] gap-3">
            <div className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-500 flex items-center gap-2 shadow-sm">
              <span>All Category</span>
              <span>▾</span>
            </div>

            <div className="flex-1 max-w-xs">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer name or email"
                className="w-full border border-gray-200 rounded-full px-3 py-1 text-xs bg-white text-gray-600 focus:outline-none focus:border-[#3226D9] shadow-sm"
              />
            </div>

            <p className="text-gray-400 text-xs">
              Feb 15, 2022 - Feb 21, 2022
            </p>
          </div>

          {/* Table card */}
          <section className="bg-white rounded-2xl shadow-sm p-4 animate-[fadeIn_0.25s_ease-out]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-700">
                Customers List
              </h2>
              <button className="text-gray-400 text-xl leading-none hover:bg-gray-100 rounded-full px-2 transition">
                ···
              </button>
            </div>

            <div className="overflow-x-auto">
              {/* header */}
              <div className="grid grid-cols-[40px,1.1fr,1.4fr,1.1fr,2fr,0.9fr,60px] text-[11px] text-gray-400 font-semibold border-b border-gray-100 pb-2 mb-1 min-w-[720px] divide-x divide-gray-100">
                {/* checkbox col */}
                <div className="pl-0">
                  <input type="checkbox" className="accent-[#3226D9]" />
                </div>

                {/* 🔹 ডাইনামিক header কলাম */}
                {columns.map((col) => (
                  <button
                    key={col.key}
                    type="button"
                    onClick={() => col.sortable && handleSortClick(col.key)}
                    className={col.headerClassName}
                  >
                    <span>{col.label}</span>
                    {col.sortable && renderSortIcon(col.key)}
                  </button>
                ))}

                <div className="text-right pr-4 pl-3">Actions</div>
              </div>

              {/* rows */}
              <div className="space-y-1 text-xs">
                {pageCustomers.map((c) => (
                  <div
                    key={c.id}
                    className="grid grid-cols-[40px,1.1fr,1.4fr,1.1fr,2fr,0.9fr,60px] items-center py-2 rounded-xl hover:bg-[#F7F7FB] transition-all duration-150 min-w-[720px] divide-x divide-gray-100 hover:shadow-sm hover:-translate-y-[1px]"
                  >
                    {/* checkbox col */}
                    <div className="pl-0">
                      <input type="checkbox" className="accent-[#3226D9]" />
                    </div>

                    {/* 🔹 ডাইনামিক cell কলাম */}
                    {columns.map((col) => (
                      <div key={col.key} className={col.cellClassName}>
                        {col.renderCell(c)}
                      </div>
                    ))}

                    {/* actions */}
                    <div className="relative flex justify-end pr-2 pl-3">
                      <button
                        onClick={() => handleActionClick(c.id)}
                        className="text-gray-400 text-xl leading-none px-2 py-1 rounded-full hover:bg-gray-100 transition"
                      >
                        ···
                      </button>
                      {openActionId === c.id && (
                        <div
                          ref={actionMenuRef}
                          className="absolute right-0 top-7 w-36 bg-white border rounded-lg shadow-lg text-[11px] text-gray-600 z-20 origin-top-right transform scale-95 opacity-100 transition-all"
                        >
                          <button
                            onClick={() => handleRowAction("view", c)}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            View details
                          </button>
                          <button
                            onClick={() => handleRowAction("message", c)}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            Send message
                          </button>
                          <button
                            onClick={() => handleRowAction("contact", c)}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            Contact
                          </button>
                          <button
                            onClick={() => handleRowAction("delete", c)}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-rose-500"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {renderPagination()}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
