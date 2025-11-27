import Link from "next/link";
import Image from "next/image";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";

const sidebarConfig = {
  navItems: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Products", href: "/products" },
    { label: "Orders", href: "/orders" },
    { label: "Payments", href: "/payments" },
    { label: "Transactions", href: "/transactions" },
    { label: "Clients", href: "/clients" },
  ],

  categories: [
    { label: "Laptops", colorClass: "bg-purple-400" },
    { label: "Mobile phones", colorClass: "bg-pink-400" },
    { label: "Desktops", colorClass: "bg-blue-400" },
    { label: "Accessories", colorClass: "bg-yellow-400" },
    { label: "Portable storage", colorClass: "bg-green-400" },
    { label: "Networking", colorClass: "bg-red-400" },
  ],

  topSellers: [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ],

  themes: [
    { id: "primary", className: "bg-[#3226D9]" },
    { id: "secondary", className: "bg-gray-300" },
  ],

  helpButton: {
    icon: "?",
    ariaLabel: "Help",
  },

  upgrade: {
    wrapperBg: "bg-[#E8EDF2]",
    cardBg: "bg-[#E9E6FF]",
    buttonLabel: "Upgrade Now",
    buttonBg: "bg-[#3226D9]",
  },
};

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  upgradeImg,
  config = sidebarConfig,
}) {
  const { navItems, categories, topSellers, themes, helpButton, upgrade } =
    config;

  return (
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

      {/* Main nav (dynamic) */}
      <div className="space-y-1 px-2">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex items-center rounded-xl px-3 py-2 text-sm w-full text-left mb-1 text-gray-500 hover:bg-blue-800 hover:text-white transition"
          >
            <span className="h-2 w-2 rounded-full bg-gray-300 mr-2" />
            {item.label}
          </Link>
        ))}
      </div>

      {/* Categories (dynamic) */}
      <div className="mt-6 px-6">
        <p className="text-[11px] font-semibold text-gray-400 uppercase mb-3">
          Categories
        </p>
        <ul className="space-y-2 text-sm text-gray-500">
          {categories.map((cat) => (
            <li key={cat.label} className="flex items-center justify-between">
              <span>{cat.label}</span>
              <span className={`h-2 w-2 rounded-full ${cat.colorClass}`} />
            </li>
          ))}
        </ul>

        <button className="mt-4 text-xs text-[#3226D9] font-semibold flex items-center gap-1">
          <span className="h-5 w-5 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-lg leading-none">
            +
          </span>
          Add category
        </button>
      </div>

      {/* Top Sellers (dynamic) */}
      <div className="mt-6 px-6">
        <p className="text-[11px] font-semibold text-gray-400 uppercase mb-3">
          Top Sellers
        </p>
        <div className="flex -space-x-2">
          {topSellers.map((seller) => (
            <div
              key={seller.id}
              className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400"
            />
          ))}
        </div>
      </div>

      {/* Upgrade card (dynamic config) */}
      <div
        className={`w-[206px] ${upgrade.wrapperBg} rounded-2xl mb-20 mt-[74px]`}
      >
        <div
          className={`mt-6 mx-4 mb-5 rounded-2xl ${upgrade.cardBg} p-4 flex flex-col relative overflow-hidden`}
        >
          <div className="h-20 p-20 rounded-xl flex items-center justify-center mb-4 mt-20 relative">
            <Image
              src={upgradeImg}
              alt="Upgrade Image"
              className="absolute top-[-40px] left-[-20px]"
            />
          </div>
          <button
            className={`text-xs font-semibold text-white ${upgrade.buttonBg} rounded-lg py-2`}
          >
            {upgrade.buttonLabel}
          </button>
        </div>
      </div>

      {/* Bottom toggles (dynamic) */}
      <div className="mt-auto px-6 pb-5 flex items-center justify-between">
        <div className="flex gap-2">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`h-6 w-6 rounded-full ${theme.className}`}
            />
          ))}
        </div>
        <button
          className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-500"
          aria-label={helpButton.ariaLabel}
        >
          {helpButton.icon}
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;