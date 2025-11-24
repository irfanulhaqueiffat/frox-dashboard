import React from "react";
import { Search, ChevronDown, Bell, MessageSquare } from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/Image/navlogo.png";
import Browse from "../../../public/Image/export.png"; 
import Togglee from "../../../public/Image/Toogle.png";
import UserAvatar from "../../../public/Image/Avatar.png";

const Navbar = () => {
  return (
   <section>
    <div className="">
         <nav className="w-full  bg-white border-b border-gray-200 flex items-center px-6">
      
      {/* LEFT: Logo */}
      <div className="flex items-center gap-2 mr-6">
        <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-xl">
            <Image
            src={Logo}
            alt="Logo"
            width={20}
            height={20}
          />    
          </span>
        </div>
        <h1 className="text-lg font-semibold text-gray-400">Frox</h1>
      </div>


      <div className="toggle-theme-button justify-center items-center mr-6">
        <button>
            <Image
            src={Togglee}
            alt="Toggle Theme"
            width={50}
            height={50}
          />
        </button>

      </div>

      {/* CENTER: Search + Browse */}
      <div className="flex items-center gap-4 flex-1">

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
          <Search className="text-gray-400 h-4 w-4 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-gray-600 w-full"
          />
        </div>

        {/* Browse */}
        <button className="flex items-center text-gray-400 text-sm gap-1 hover:text-gray-900">
            <span><Image
            src={Browse}
            alt="Browse"
            width={12}
            height={12}
          />
            </span>
          Browse
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* RIGHT: Icons + Avatar */}
      <div className="flex items-center gap-6">

        {/* Icons */}
        <MessageSquare className="text-gray-500 hover:text-gray-800 cursor-pointer h-5 w-5" />
        <Bell className="text-gray-500 hover:text-gray-800 cursor-pointer h-5 w-5" />
       

        {/* Avatar */}
        <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={UserAvatar}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
    </div>
   </section>
  );
};

export default Navbar;
