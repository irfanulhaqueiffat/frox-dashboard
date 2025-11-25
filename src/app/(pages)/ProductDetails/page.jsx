"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import upgradeimg from "../../../../public/Image/Group 2.png";
import mainWatch from "../../../../public/product images/Rectangle 6321.png"; // 
import selectedImage from "../../../../public/product images/image 159(1).png";

const Page = () => {
  // ------- state for main product -------
  const [productName, setProductName] = useState("Cubit Smart Watch");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );
  const [category, setCategory] = useState("Smart Watches");
  const [brand, setBrand] = useState("Frox");
  const [sku, setSku] = useState("FOX-2983");
  const [stockQty, setStockQty] = useState(1256);
  const [regularPrice, setRegularPrice] = useState("500");
  const [salePrice, setSalePrice] = useState("460");
  const [taxStatus, setTaxStatus] = useState("Taxable");
  const [taxClass, setTaxClass] = useState("Standard");
  const [tags, setTags] = useState([
    "smartwatch",
    "Apple",
    "Watch x",
    "smartphone",
    "iPhone13 max",
  ]);
  const [newTag, setNewTag] = useState("");

  // ------- gallery & preview -------
  const [selectedImage, setSelectedImage] = useState(mainWatch);

  const galleryItems = [
    {
      id: 1,
      name: "Product_thumbnail_1.png",
      progress: 45,
      status: "error",
    },
    {
      id: 2,
      name: "Product_thumbnail_2.png",
      progress: 100,
      status: "done",
    },
    {
      id: 3,
      name: "Product_thumbnail_3.png",
      progress: 100,
      status: "done",
    },
    {
      id: 4,
      name: "Product_thumbnail_4.png",
      progress: 100,
      status: "done",
    },
    {
      id: 5,
      name: "Product_thumbnail_5.png",
      progress: 100,
      status: "done",
    },
  ];

  // Simulate clicking gallery -> change preview (in real app each item would have image src)
const handleGalleryClick = (item) => {
  setSelectedImage(item.image);
};


  // ------- tag helpers -------
const handleAddTag = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const value = newTag.trim();
    if (!value) return;

    if (!tags.includes(value)) {
      setTags([...tags, value]);
    }

    setNewTag("");
  }
};


const handleRemoveTag = (t) => {
  setTags(tags.filter((tag) => tag !== t));
};

  // ------- fake submit -------
  const handleUpdate = () => {
    const payload = {
      productName,
      description,
      category,
      brand,
      sku,
      stockQty,
      regularPrice,
      salePrice,
      taxStatus,
      taxClass,
      tags,
    };
    // replace with API call later
    console.log("UPDATE PRODUCT", payload);
    alert("Product updated (check console for payload)");
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-6">
      {/* main rounded container */}
      <div className="w-full mr-20 bg-white border-b border-gray-200 flex items-start px-6">
        {/* SIDEBAR */}
        <aside className="w-64 mt-[-20px] bg-white border-r border-gray-100 flex flex-col">
          {/* Main nav */}
          <div className="space-y-1">
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
          </div>

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

        {/* MAIN CONTENT */}
        <main className="flex-1 px-8 py-6 bg-[#F6F7FB]">
          {/* Header */}
          <div className="mb-4">
           < h1 className="text-2xl font-semibold text-gray-800">
              Product Details
            </h1>
            
            <p className="text-xs text-gray-400 mb-1">
              Home &gt; Product Details
            </p>
            
          </div>

          {/* Form + Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
              {/* Product name */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Type name here"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3226D9]"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Description
                </label>
                <div className="border border-gray-200 rounded-lg">
                  {/* fake toolbar */}
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 text-[11px] text-gray-400">
                    <span>B</span>
                    <span>I</span>
                    <span>U</span>
                    <span>•</span>
                    <span>1.</span>
                    <span>&lt;/&gt;</span>
                  </div>
                  <textarea
                    className="w-full min-h-[120px] px-3 py-2 text-sm text-gray-600 focus:outline-none"
                    placeholder="Type description here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Category + Brand */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-gray-50 focus:outline-none focus:border-[#3226D9]"
                  >
                    <option>Smart Watches</option>
                    <option>Headphones</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Brand
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-gray-50 focus:outline-none focus:border-[#3226D9]"
                  >
                    <option>Frox</option>
                    <option>Apple</option>
                    <option>Samsung</option>
                  </select>
                </div>
              </div>

              {/* SKU + Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3226D9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Stock quantity
                  </label>
                  <input
                    type="number"
                    value={stockQty}
                    onChange={(e) => setStockQty(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3226D9]"
                  />
                </div>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Regular Price
                  </label>
                  <input
                    type="text"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3226D9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Sale price
                  </label>
                  <input
                    type="text"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3226D9]"
                  />
                </div>
              </div>

              {/* Tax status + class */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Tax status
                  </label>
                  <select
                    value={taxStatus}
                    onChange={(e) => setTaxStatus(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-gray-50 focus:outline-none focus:border-[#3226D9]"
                  >
                    <option>Taxable</option>
                    <option>Shipping only</option>
                    <option>None</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Tax class
                  </label>
                  <select
                    value={taxClass}
                    onChange={(e) => setTaxClass(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-gray-50 focus:outline-none focus:border-[#3226D9]"
                  >
                    <option>Standard</option>
                    <option>Reduced</option>
                    <option>Zero</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Tag
                </label>
                <div className="min-h-[48px] border border-gray-200 rounded-lg px-2 py-2 flex flex-wrap gap-2 bg-gray-50">
                  {tags.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-600 flex items-center gap-1"
                      onClick={() => handleRemoveTag(t)}
                    >
                      <span>{t}</span>
                      <span className="text-gray-400 text-[10px]">✕</span>
                    </button>
                  ))}
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tag & press Enter"
                    className="flex-1 min-w-[120px] bg-transparent text-[11px] outline-none text-gray-600"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={handleUpdate}
                  className="px-5 py-2 rounded-lg bg-[#3226D9] text-white text-xs font-semibold"
                >
                  Update
                </button>
                <button className="px-5 py-2 rounded-lg bg-[#FF4F6E] text-white text-xs font-semibold">
                  Delete
                </button>
                <button className="px-5 py-2 rounded-lg bg-gray-100 text-gray-500 text-xs font-semibold">
                  Cancel
                </button>
              </div>
            </div>

            {/* RIGHT: Preview + Gallery */}
            <div className="space-y-4">
              {/* Product preview */}
              <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center h-64">
                <Image
                  src={selectedImage}
                  alt="Product preview"
                  className="max-h-full object-contain"
                />
              </div>

              {/* Product gallery */}
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <p className="text-xs font-semibold text-gray-700 mb-3">
                  Product Gallery
                </p>

                {/* Drop zone */}
                <div className="border border-dashed border-gray-300 rounded-2xl py-6 flex flex-col items-center justify-center text-[11px] text-gray-400 mb-4">
                  <div className="h-10 w-10 rounded-full bg-[#F3F0FF] flex items-center justify-center mb-2">
                    <span>⬆</span>
                  </div>
                  <p>Drop your image here, or</p>
                  <button className="text-[#3226D9] font-semibold">
                    browse
                  </button>
                  <p className="mt-1 text-[10px]">
                    .JPG, .PNG and .GIF files are allowed
                  </p>
                </div>

                {/* Uploaded items */}
                <div className="space-y-3">
                  {galleryItems.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => handleGalleryClick(item)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center gap-3 bg-[#F8F9FC] rounded-xl px-3 py-2 hover:bg-[#EEF0F8] transition">
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                          <span className="text-xs">img</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] text-gray-700 font-semibold">
                            {item.name}
                          </p>
                          <div className="mt-1 w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${
                                item.status === "error"
                                  ? "bg-rose-400"
                                  : "bg-emerald-400"
                              }`}
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span
                            className={`h-5 w-5 inline-flex items-center justify-center rounded-full text-white text-[10px] ${
                              item.status === "error"
                                ? "bg-rose-400"
                                : "bg-emerald-400"
                            }`}
                          >
                            {item.status === "error" ? "!" : "✓"}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
