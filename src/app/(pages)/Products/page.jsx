"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import upgradeimg from "../../../../public/Image/Group 2.png";
import img1 from "../../../../public/product images/headphone.png";
import img2 from "../../../../public/product images/watch.png";
import img3 from "../../../../public/product images/onLight.png";
import img4 from "../../../../public/product images/keyboard.png";

const products = [
  {
    id: 1,
    name: "Cubit Smart Watch",
    sku: "FROX-19853",
    price: "$576.23",
    status: "Active",
    qty: 556,
    rating: 5,
    sales: "198 / 2056",
    date: "2021-08-05",
    image: img1,
  },
  {
    id: 2,
    name: "Cubit Smart Watch",
    sku: "FROX-19854",
    price: "$512.99",
    status: "Active",
    qty: 410,
    rating: 4,
    sales: "160 / 1900",
    date: "2021-08-04",
    image:img2,
  },
  {
    id: 3,
    name: "Cubit Smart Watch",
    sku: "FROX-19855",
    price: "$620.00",
    status: "Active",
    qty: 320,
    rating: 5,
    sales: "210 / 2200",
    date: "2021-08-03",
    image: img3,
  },
  {
    id: 4,
    name: "Cubit Smart Watch",
    sku: "FROX-19856",
    price: "$430.50",
    status: "Active",
    qty: 600,
    rating: 4,
    sales: "120 / 1800",
    date: "2021-08-02",
    image: img4,
  },
  {
    id: 5,
    name: "Cubit Smart Watch",
    sku: "FROX-19857",
    price: "$489.75",
    status: "Active",
    qty: 444,
    rating: 5,
    sales: "178 / 2000",
    date: "2021-08-01",
    image: img1,
  },
  {
    id: 6,
    name: "Cubit Smart Watch",
    sku: "FROX-19858",
    price: "$540.00",
    status: "Active",
    qty: 390,
    rating: 4,
    sales: "150 / 1900",
    date: "2021-07-31",
    image: img2,
  },
  {
    id: 7,
    name: "Cubit Smart Watch",
    sku: "FROX-19859",
    price: "$599.90",
    status: "Active",
    qty: 288,
    rating: 5,
    sales: "210 / 2100",
    date: "2021-07-30",
    image: img3,
  },
  {
    id: 8,
    name: "Cubit Smart Watch",
    sku: "FROX-19860",
    price: "$450.10",
    status: "Active",
    qty: 520,
    rating: 4,
    sales: "130 / 1800",
    date: "2021-07-29",
    image:img4,
  },
];

const Page = () => {
  // ---- UI state ----
  const [viewMode, setViewMode] = useState("list"); // "list" | "grid"
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest" | "price-asc" | "price-desc"
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, viewMode]);

  // ---- filtering + sorting ----
  const filteredAndSorted = useMemo(() => {
    let list = [...products];

    // search by name or SKU
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      );
    }

    // sort
    list.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "oldest":
          return dateA - dateB;
        case "newest":
        default:
          return dateB - dateA;
      }
    });

    return list;
  }, [searchTerm, sortBy]);

  // ---- pagination ----
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSorted.length / itemsPerPage)
  );
  const safePage = Math.min(currentPage, totalPages);
  const indexOfLastItem = safePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredAndSorted.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-6">
      {/* Main container (no navbar) */}
      <div className="w-full mr-20 bg-white border-b border-gray-200 flex items-start px-6">
        {/* ========== SIDEBAR ========== */}
        <aside className="w-64 mt-[-30px] bg-white border-r border-gray-100 flex flex-col">
          {/* Main nav */}
          <asidelink className="space-y-1">
            {[
              "Dashboard",
              "Products",
              "Orders",
              "Payments",
              "Transactions",
              "Clients",
            ].map((item, idx) => (
               <Link href={`/${item}`}
                key={item}
                className={`flex items-center rounded-xl px-3 py-2 text-sm w-full text-left mb-1 ${
                  idx === 0
                    ? "text-gray-500 hover:bg-blue-800 hover:text-white"
                    : "text-gray-500 hover:bg-blue-800 hover:text-white "
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-gray-300 mr-2" />
                {item}
              </Link>
            ))}
          </asidelink>

          {/* Categories */}
          <div className="mt-6 px-6">
            <p className="text-[11px] font-semibold text-gray-400 uppercase mb-3">
              Categories
            </p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center justify-between">
                <span>Laptops</span>
                <span className="h-2 w-2 rounded-full bg-purple-400" />
              </li>
              <li className="flex items-center justify-between">
                <span>Mobile phones</span>
                <span className="h-2 w-2 rounded-full bg-pink-400" />
              </li>
              <li className="flex items-center justify-between">
                <span>Desktops</span>
                <span className="h-2 w-2 rounded-full bg-blue-400" />
              </li>
              <li className="flex items-center justify-between">
                <span>Accessories</span>
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
              </li>
              <li className="flex items-center justify-between">
                <span>Portable storage</span>
                <span className="h-2 w-2 rounded-full bg-green-400" />
              </li>
              <li className="flex items-center justify-between">
                <span>Networking</span>
                <span className="h-2 w-2 rounded-full bg-red-400" />
              </li>
            </ul>

            <button className="mt-4 text-xs text-[#3226D9] font-semibold flex items-center gap-1">
              <span className="h-5 w-5 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-lg leading-none">
                +
              </span>
              Add category
            </button>
          </div>

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
        <main className="flex-1 px-8 py-6">
          {/* Header + controls */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                All Products
              </h1>
              <p className="text-xs text-gray-400 mb-1">
                Home &gt; All Products
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              {/* View toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-full px-1 py-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1 rounded-full ${
                    viewMode === "list"
                      ? "bg-[#3226D9] text-white"
                      : "text-gray-600"
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-full ${
                    viewMode === "grid"
                      ? "bg-[#3226D9] text-white"
                      : "text-gray-600"
                  }`}
                >
                  Grid
                </button>
              </div>

              {/* Sort select */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[11px] border border-gray-200 rounded-full px-3 py-1 text-gray-600 bg-gray-50"
              >
                <option value="newest">Date: Newest</option>
                <option value="oldest">Date: Oldest</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>

          {/* Search + count */}
          <div className="flex items-center justify-between mb-3 text-[11px]">
            <p className="text-gray-500">
              Showing {currentProducts.length} of {filteredAndSorted.length}{" "}
              products
            </p>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or SKU..."
                className="border border-gray-200 rounded-full px-3 py-1 pl-4 text-xs text-gray-600 bg-gray-50 focus:outline-none focus:border-[#3226D9]"
              />
            </div>
          </div>

          {/* ================= VIEW: LIST ================= */}
          {viewMode === "list" && (
            <div className="bg-white rounded-2xl shadow-sm p-4">
              {/* Table header row */}
              <div className="grid grid-cols-9 text-[11px] text-gray-400 font-semibold border-b border-gray-100 pb-3 mb-2">
                <div>Image</div>
                <div className="col-span-2">Name</div>
                <div>SKU</div>
                <div>Price</div>
                <div>Status</div>
                <div>QTY</div>
                <div>Rating</div>
                <div>Sales</div>
              </div>

              {/* Rows */}
              <div className="space-y-3 text-xs">
                {currentProducts.map((p) => (
                  <div
                    key={p.id}
                    className="grid grid-cols-9 items-center py-2 rounded-xl hover:bg-[#F7F7FB] transition"
                  >
                    {/* Image */}
                    <div>
                      <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Name + description */}
                    <div className="col-span-2">
                      <p className="font-semibold text-gray-800">{p.name}</p>
                      <p className="text-[11px] text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>

                    {/* SKU */}
                    <div className="text-gray-400">{p.sku}</div>

                    {/* Price */}
                    <div className="font-semibold text-gray-800">
                      {p.price}
                    </div>

                    {/* Status */}
                    <div>
                      <span className="px-2 py-1 rounded-full text-[11px] bg-emerald-50 text-emerald-500 font-semibold">
                        {p.status}
                      </span>
                    </div>

                    {/* QTY */}
                    <div className="text-gray-500">{p.qty}</div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-[#FFB800]">
                      {"★".repeat(p.rating)}
                    </div>

                    {/* Sales */}
                    <div className="text-gray-700 font-semibold">
                      {p.sales}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 text-[11px] text-gray-500">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40"
                    disabled={currentPage === 1}
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40"
                    disabled={currentPage === totalPages}
                  >
                    {">"}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (num) => (
                      <button
                        key={num}
                        onClick={() => goToPage(num)}
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
                    onClick={() => goToPage(currentPage + 1)}
                    className="ml-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW: GRID ================= */}
          {viewMode === "grid" && (
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-xs">
                {currentProducts.map((p) => (
                  <div
                    key={p.id}
                    className="border border-gray-100 rounded-2xl p-3 hover:shadow-sm transition flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-14 w-14 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          width={56}
                          height={56}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-gray-400">{p.sku}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-gray-800">
                        {p.price}
                      </p>
                      <span className="px-2 py-1 rounded-full text-[10px] bg-emerald-50 text-emerald-500 font-semibold">
                        {p.status}
                      </span>
                    </div>

                    <div className="flex justify-between text-[11px] text-gray-500 mb-2">
                      <span>QTY: {p.qty}</span>
                      <span>Sales: {p.sales}</span>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                      <span className="flex items-center gap-1 text-[#FFB800]">
                        {"★".repeat(p.rating)}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(p.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* pagination under grid */}
              <div className="flex items-center justify-between mt-6 text-[11px] text-gray-500">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40"
                    disabled={currentPage === 1}
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40"
                    disabled={currentPage === totalPages}
                  >
                    {">"}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (num) => (
                      <button
                        key={num}
                        onClick={() => goToPage(num)}
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
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Page;
