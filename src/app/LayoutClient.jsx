// app/LayoutClient.jsx (new file)
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  // jei route e navbar lagbena, oigula ekhane mention kor
  const hideNavbarRoutes = ["/", "/login"]; // চাইলে শুধু "/login" রাখো

  const hideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      <Footer />
    </>
  );
}
