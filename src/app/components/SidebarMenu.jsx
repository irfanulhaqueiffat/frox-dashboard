"use client";

import React, { useState } from "react";
import Link from "next/link";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(true); // menu visible by default

  const menuItems = [
    "Dashboard",
    "Products",
    "Orders",
    "Payments",
    "Transactions",
    "Clients",
  ];

  return (
    <div>
      {/* Dropdown Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-3 py-2 mb-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
      >
        {isOpen ? "Hide Menu ▲" : "Show Menu ▼"}
      </button>

      {/* Menu List */}
      {isOpen && (
        <div className="space-y-1">
          {menuItems.map((item, idx) => (
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
      )}
    </div>
  );
};

export default SidebarMenu;
