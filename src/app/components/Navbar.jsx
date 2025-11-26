"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, Bell, MessageSquare, Sun, Moon } from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/Image/navlogo.png";
import Browse from "../../../public/Image/export.png";
import Togglee from "../../../public/Image/Toogle.png";
import UserAvatar from "../../../public/Image/Avatar.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = ({ user }) => {
  const router = useRouter();

  // dynamic theme toggle
  const [isDark, setIsDark] = useState(false);

  // avatar dropdown open/close
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const avatarMenuRef = useRef(null);

  // document level dark class
  // set theme on html via data-theme and persist to localStorage
  useEffect(() => {
    if (typeof document === "undefined") return;

    const saved = localStorage.getItem("theme");
    if (saved) {
      const isDarkSaved = saved === "dark";
      setIsDark(isDarkSaved);
      document.documentElement.setAttribute("data-theme", isDarkSaved ? "dark" : "light");
      return;
    }

    // default to prefers-color-scheme
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }, []);

  // avatar dropdown এর বাইরে ক্লিক করলে close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
        setIsAvatarMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileToggle = () => setIsMobileMenuOpen((s) => !s);

  // props না দিলেও default user
  const currentUser = {
    name: user?.name || "Dipjol",
    email: user?.email || "Dipjol@example.com",
    avatar: user?.avatar || UserAvatar,
  };

  const handleThemeToggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch (e) {}
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      return next;
    });
  };

  const handleAvatarClick = () => {
    setIsAvatarMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // 🔹 localStorage clear
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    // 🔹 cookies clear (login page এ যেগুলো set করেছো)
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("tokenExpiresAt");
    Cookies.remove("user");

    // 🔹 login page এ পাঠিয়ে দাও
    router.push("/");
  };

  return (
    <section>
      <div>
        <header className="w-full bg-white border-b border-gray-200 flex items-center px-4 md:px-6">
          {/* LEFT: Logo */}
          <div className="flex items-center gap-2 mr-4">
            <Link
              href="/"
              className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">
                <Image src={Logo} alt="Logo" width={20} height={20} />
              </span>
            </Link>
            <h1 className="text-lg font-semibold text-gray-400">Frox</h1>
          </div>

          {/* Mobile hamburger (visible on small screens) */}
          <div className="md:hidden mr-2">
            <button onClick={handleMobileToggle} className="p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Toggle theme button (dynamic) */}
          {/* <div className="hidden md:flex justify-center items-center mr-6">
            <button
              onClick={handleThemeToggle}
              className="relative flex items-center justify-center focus:outline-none"
            >
              <Image
                src={Togglee}
                alt="Toggle Theme"
                width={50}
                height={50}
                className={`transition-transform duration-300 ${
                  isDark ? "rotate-180" : "rotate-0"
                }`}
              />
              <span className="sr-only">Toggle theme</span>
            </button>
          </div> */}

          {/* CENTER: Search + Browse (hidden on small screens) */}
          <div className="hidden md:flex items-center gap-4 flex-1 ml-40">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 max-w-md w-full">
              <Search className="text-gray-400 h-4 w-4 mr-8" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm text-gray-600 w-full"
              />
            </div>

            {/* Browse */}
            <button className="flex items-center text-gray-400 text-sm gap-1 hover:text-gray-900">
              <span>
                <Image src={Browse} alt="Browse" width={12} height={12} />
              </span>
              Browse
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* RIGHT: Icons + Avatar (with dropdown) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Icons */}
            <MessageSquare className="text-gray-500 hover:text-gray-800 cursor-pointer h-5 w-5" />
            <Bell className="text-gray-500 hover:text-gray-800 cursor-pointer h-5 w-5" />

            {/* Theme toggle (desktop) */}
            <button onClick={handleThemeToggle} aria-label="Toggle theme" className="p-1 rounded-md bg-transparent">
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* Avatar + dropdown */}
            <div className="relative" ref={avatarMenuRef}>
              <button
                onClick={handleAvatarClick}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300">
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isAvatarMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg text-sm text-gray-700 z-30">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="font-semibold">{currentUser.name}</p>
                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                  </div>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
                    Profile
                  </button>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
                    Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-100">
                    Billing
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
            <div className="space-y-3">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
                <Search className="text-gray-400 h-4 w-4 mr-2" />
                <input type="text" placeholder="Search" className="bg-transparent outline-none text-sm text-gray-600 w-full" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="text-gray-500 cursor-pointer h-5 w-5" />
                  <Bell className="text-gray-500 cursor-pointer h-5 w-5" />
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile theme toggle */}
                  <button onClick={handleThemeToggle} aria-label="Toggle theme" className="p-1 rounded-md">
                    {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
                  </button>
                  <button onClick={handleAvatarClick} className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-300">
                      <Image src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
