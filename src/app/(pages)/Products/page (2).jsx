"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import upgradeimg from "../../../../public/Image/Group 2.png";
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";
import Catagories from "../../components/Catagories";

const Page = () => {
  const [viewMode, setViewMode] = useState("list"); // "list" | "grid"
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest" | "price-asc" | "price-desc"
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // sidebar toggle

  const [products, setProducts] = useState([]);      // 🔹 API theke asha products
  const [loading, setLoading] = useState(true);      // 🔹 loading state
  const [error, setError] = useState(null);          // 🔹 error state

  const itemsPerPage = 5;

  // 🔹 1) API theke data ana
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        console.log("API products:", data);

        // data.products holo real list
        const mapped = data.products.map((item, index) => {
          // ekta fake date generate korchi (latest theke piche)
          const date = new Date();
          date.setDate(date.getDate() - index); // protiti product er jonne ekdin kore piche

          return {
            id: item.id,
            name: item.title,
            sku: `SKU-${String(item.id).padStart(5, "0")}`,
            Description: item.description,
            // price string banacchi, jate tomader sort logic same thake
            price: `$${Number(item.price).toFixed(2)}`,
            status: "Active",
            qty: item.stock,
            rating: Math.round(item.rating || 4),
            sales: `${Math.floor(item.stock / 3)} / ${item.stock + 500}`,
            date: date.toISOString().split("T")[0],
            image: item.thumbnail, // external image URL
          };
        });

        setProducts(mapped);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // search/sort/view change hole page 1 e reset
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, viewMode]);

  // 🔹 2) filter + sort
  const filteredAndSorted = useMemo(() => {
    let list = [...products];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

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
  }, [searchTerm, sortBy, products]);

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
    <div className="min-h-screen flex justify-center items-start py-6 bg-[#F6F7FB]">
      <div className="w-full mr-20 bg-white border-b border-gray-200 flex items-start px-6 relative">
        {/* Sidebar reopen button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-2 top-4 z-20 bg-white border border-gray-200 rounded-full px-3 py-1 text-2xl text-gray-600 shadow-sm hover:bg-gray-100 transition"
          >
            <IoMdArrowDroprightCircle />
          </button>
        )}

        {/* SIDEBAR */}
        <aside
          className={`w-64 mt-[20px] bg-white border-r border-gray-100 flex flex-col transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* sidebar header + hide btn */}
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

        {/* MAIN CONTENT */}
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

          {/* Loading / Error states */}
          {loading && (
            <p className="text-sm text-gray-500 mb-4">Loading products...</p>
          )}
          {error && (
            <p className="text-sm text-red-500 mb-4">
              Failed to load products: {error}
            </p>
          )}

          {/* Search + count */}
          {!loading && !error && (
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
          )}

          {/* VIEW: LIST */}
          {!loading && !error && viewMode === "list" && (
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
                      <Link href={`/ProductDetails`}>
                        <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer">
                          <Image
                            src={p.image}
                            alt={p.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Name + description */}
                    <div className="col-span-2">
                      <Link
                        href={`/ProductDetails`}
                        className="font-semibold text-gray-800 hover:text-[#3226D9]"
                      >
                        {p.name}
                      </Link>
                      <p className="text-[11px] text-gray-400">
                        {p.Description}
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

          {/* VIEW: GRID */}
          {!loading && !error && viewMode === "grid" && (
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-xs">
                {currentProducts.map((p) => (
                  <Link
                    href={`/ProductDetails`}
                    key={p.id}
                    className="border border-gray-100 rounded-2xl p-3 hover:shadow-sm transition flex flex-col cursor-pointer"
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
                  </Link>
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
