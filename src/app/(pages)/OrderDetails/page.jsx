"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import upgradeimg from "../../../../public/Image/Group 2.png";

// ---------- MOCK ORDER DATA (dynamic) ----------
const order = {
  id: "#68543",
  createdAt: "Mon, Jan 28, 2022, 8:40AM",
  initialStatus: "Pending",
  customer: {
    name: "Jane Cooper",
    email: "tim.jennings@example.com",
    phone: "+9989 856 245",
  },
  orderInfo: {
    shipping: "Next express",
    paymentMethod: "Paypal",
    paymentStatus: "Pending",
  },
  delivery: {
    line1: "Santa Ana, Illinois 85486",
    line2: "2972 Westheimer Rd.",
    line3: "Block 9A",
  },
  paymentInfo: {
    card: "Master Card ****6657",
    businessName: "Fox Market LLC",
    phone: "+9985 6578 52",
  },
  notes: "Type some note",
  products: [
    {
      id: 1,
      name: "Bose noise cancelling",
      price: 948.55,
      qty: 2,
    },
    {
      id: 2,
      name: "Philips wireless head phone",
      price: 767.5,
      qty: 3,
    },
    {
      id: 3,
      name: "Cubit smart watch",
      price: 396.84,
      qty: 1,
    },
    {
      id: 4,
      name: "Google Pixel Buds",
      price: 778.35,
      qty: 4,
    },
  ],
};

const Page = () => {
  const [status, setStatus] = useState(order.initialStatus);
  const [note, setNote] = useState(order.notes);

  const totals = useMemo(() => {
    const subtotal = order.products.reduce(
      (sum, p) => sum + p.price * p.qty,
      0
    );
    const tax = subtotal * 0.2; // 20% just as example
    const discount = 293.01;
    const total = subtotal + tax - discount;

    return {
      subtotal,
      tax,
      discount,
      total,
    };
  }, []);

  const handleSave = () => {
    const payload = {
      id: order.id,
      status,
      note,
    };
    console.log("SAVE ORDER", payload);
    alert("Order saved (check console for payload)");
  };

  const statusColors = {
    Pending: "bg-amber-50 text-amber-500",
    Delivered: "bg-emerald-50 text-emerald-500",
    Canceled: "bg-rose-50 text-rose-500",
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-6">
      {/* main rounded container */}
      <div className="w-full mr-20 bg-white border-b border-gray-200 flex items-start px-6">
        {/* ========== SIDEBAR ========== */}
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

        {/* ========== MAIN CONTENT ========== */}
        <main className="flex-1 px-8 py-6 bg-[#F6F7FB]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
                  <h1 className="text-2xl font-semibold text-gray-800">
                Order Details
              </h1>
              <p className="text-xs text-gray-400 mb-1">
                Home &gt; Dashboard
              </p>
            
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                <p>Orders ID: {order.id}</p>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{order.createdAt}</span>
                </div>
                <span
                  className={`inline-flex mt-1 px-3 py-1 rounded-full text-[11px] font-semibold ${statusColors[status]}`}
                >
                  {status}
                </span>
              </div>
            </div>

            {/* Status & actions */}
            <div className="flex items-center gap-2 text-[11px]">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-200 rounded-full px-3 py-1 bg-white text-gray-600"
              >
                <option>Pending</option>
                <option>Delivered</option>
                <option>Canceled</option>
              </select>
              <button
                onClick={handleSave}
                className="px-4 py-1 rounded-full bg-[#3226D9] text-white font-semibold"
              >
                Save
              </button>
              <button className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                ⬇
              </button>
            </div>
          </div>

          {/* Top info cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {/* Customer */}
            <div className="bg-white rounded-2xl shadow-sm p-4 lg:col-span-1">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Customer
              </p>
              <p className="text-sm text-gray-800 font-semibold">
                Full name: {order.customer.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                E-mail: {order.customer.email}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Phone: {order.customer.phone}
              </p>
              <button className="mt-3 px-3 py-1 rounded-full border border-gray-200 text-[11px] text-[#3226D9] font-semibold">
                View Profile
              </button>
            </div>

            {/* Order info */}
            <div className="bg-white rounded-2xl shadow-sm p-4 lg:col-span-1">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Order Info
              </p>
              <p className="text-xs text-gray-500">
                Shipping:{" "}
                <span className="text-gray-800 font-semibold">
                  {order.orderInfo.shipping}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Pay method:{" "}
                <span className="text-gray-800 font-semibold">
                  {order.orderInfo.paymentMethod}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Status:{" "}
                <span className="text-gray-800 font-semibold">
                  {order.orderInfo.paymentStatus}
                </span>
              </p>
              <button className="mt-3 px-3 py-1 rounded-full border border-gray-200 text-[11px] text-[#3226D9] font-semibold">
                Download Info
              </button>
            </div>

            {/* Deliver to */}
            <div className="bg-white rounded-2xl shadow-sm p-4 lg:col-span-1">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Deliver to
              </p>
              <p className="text-xs text-gray-500">
                Address: {order.delivery.line1}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {order.delivery.line2}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {order.delivery.line3}
              </p>
              <button className="mt-3 px-3 py-1 rounded-full border border-gray-200 text-[11px] text-[#3226D9] font-semibold">
                View profile
              </button>
            </div>

            {/* Empty spacer to mimic layout / or you can put something else */}
            <div className="hidden lg:block" />
          </div>

          {/* Payment info + Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Payment info
              </p>
              <p className="text-xs text-gray-500">
                {order.paymentInfo.card}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Business name: {order.paymentInfo.businessName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Phone: {order.paymentInfo.phone}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Notes
              </p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type some note"
                className="w-full min-h-[80px] text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#3226D9] text-gray-600"
              />
            </div>
          </div>

          {/* Products table + totals */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">
              Products
            </h2>

            <div className="grid grid-cols-[40px,1.8fr,1fr,1fr,1fr] text-[11px] text-gray-400 font-semibold border-b border-gray-100 pb-2 mb-1">
              <div>
                <input type="checkbox" className="accent-[#3226D9]" />
              </div>
              <div>Product Name</div>
              <div>Price</div>
              <div>Quantity</div>
              <div className="text-right pr-4">Total</div>
            </div>

            <div className="space-y-2 text-xs">
              {order.products.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-[40px,1.8fr,1fr,1fr,1fr] items-center py-2 rounded-xl hover:bg-[#F7F7FB] transition"
                >
                  <div>
                    <input type="checkbox" className="accent-[#3226D9]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                      {/* Replace with real product image if you have one */}
                      <span className="text-[10px] text-gray-400">img</span>
                    </div>
                    <span className="text-gray-800">{p.name}</span>
                  </div>
                  <div className="text-gray-700">
                    ${p.price.toFixed(2)}
                  </div>
                  <div className="text-gray-700">{p.qty}</div>
                  <div className="text-gray-700 text-right pr-4">
                    ${(p.price * p.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-6 gap-4">
              <Link
                href="/Orders"
                className="text-[11px] text-[#3226D9] flex items-center gap-1"
              >
                ← Back to Orders List
              </Link>

              <div className="text-xs text-gray-500 space-y-1 text-right">
                <p>
                  Subtotal:{" "}
                  <span className="inline-block w-24 text-right text-gray-700">
                    ${totals.subtotal.toFixed(2)}
                  </span>
                </p>
                <p>
                  Tax(20%):{" "}
                  <span className="inline-block w-24 text-right text-gray-700">
                    ${totals.tax.toFixed(2)}
                  </span>
                </p>
                <p>
                  Discount:{" "}
                  <span className="inline-block w-24 text-right text-emerald-500">
                    -${totals.discount.toFixed(2)}
                  </span>
                </p>
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  Total:{" "}
                  <span className="inline-block w-24 text-right">
                    {totals.total.toFixed(2)}
                  </span>
                </p>
                <p className="mt-1">
                  Status:{" "}
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-[11px] font-semibold ${statusColors[status]}`}
                  >
                    {status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="flex justify-between items-center mt-6 text-[10px] text-gray-400">
            <p>© 2022 · Frox Dashboard · Made by AiffThemes</p>
            <div className="space-x-4">
              <button>About</button>
              <button>Careers</button>
              <button>Policy</button>
              <button>Contact</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
