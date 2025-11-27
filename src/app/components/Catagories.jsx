"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // random color dots cycle
  const colorDots = [
    "bg-purple-400",
    "bg-pink-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-red-400",
  ];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://dummyjson.com/products/category-list");
        if (!res.ok) throw new Error("Failed to load categories");

        const data = await res.json(); // [ 'smartphones', 'laptops', ... ]
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <>
      <div className="mt-6 px-6">
        <p className="text-[11px] font-semibold text-gray-400 uppercase mb-3">
          Categories
        </p>

        <div className="space-y-2 text-sm text-gray-500">

          {/* Loading */}
          {loading && (
            <p className="text-[11px] text-gray-400">Loading categories...</p>
          )}

          {/* Error */}
          {error && !loading && (
            <p className="text-[11px] text-red-500">{error}</p>
          )}

          {/* Dynamic categories */}
          {!loading &&
            !error &&
            categories.map((cat, index) => {
              const dotColor = colorDots[index % colorDots.length];

              // Make label pretty
              const pretty =
                cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " ");

              return (
                <Link
                  href="/Products"
                  key={cat}
                  className="flex items-center justify-between hover:text-gray-700 transition"
                >
                  <span>{pretty}</span>
                  <span className={`h-2 w-2 rounded-full ${dotColor}`} />
                </Link>
              );
            })}
        </div>

        <button className="mt-4 text-xs text-[#3226D9] font-semibold flex items-center gap-1">
          <span className="h-5 w-5 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-lg leading-none">
            +
          </span>
          Add category
        </button>
      </div>
    </>
  );
};

export default Categories;
