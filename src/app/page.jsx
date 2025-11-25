"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image"; 
import Logo from "../../public/Image/Landing Success 1.png";

const Page = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,          // e.g. "emilys"
          password,          // e.g. "emilyspass"
          expiresInMins: 30, // access token lifetime
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // --- Save tokens in cookies ---
      const expiresInMins = 30; // we know what we sent
      const tokenExpiresAt = Date.now() + expiresInMins * 60 * 1000;

      Cookies.set("token", data.token, { expires: 1 }); // 1 day
      Cookies.set("refreshToken", data.refreshToken, { expires: 7 }); // 7 days
      Cookies.set("tokenExpiresAt", String(tokenExpiresAt), { expires: 1 });
      Cookies.set("user", JSON.stringify(data), { expires: 1 });

      // --- Navigate to Dashboard after successful login ---
      router.push("/Dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E7EBF3] flex items-center justify-center px-3">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg border">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-purple-200 rounded-full flex items-center justify-center">
            <span className="text-purple-600 text-2xl">
                <Image
                src={Logo}
                alt="Logo"
                width={30}
                height={30}
              />
            </span>
          </div>
        </div>

        <h1 className="text-center text-xl font-semibold">Welcome Back!</h1>
        <p className="text-center text-gray-400 text-sm mb-6">
          Let's build something great
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username / email */}
          <div>
            <label className="text-gray-600 text-sm">
              E-mail or phone number
            </label>
            <input
              type="text"
              placeholder="Email / username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:border-purple-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:border-purple-600"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-1">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#6552F4] text-white rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-end mt-2">
          <button className="text-xs text-gray-500">Forgot password?</button>
        </div>

        {/* Social buttons (dummy) */}
        <div className="flex gap-3 mt-4">
          <button className="flex-1 border rounded-lg py-2 flex items-center justify-center gap-4 text-xs">
            <FaGoogle /><span>Google account</span>
          </button>
          <button className="flex-1 border text-blue-700 rounded-lg py-2 flex items-center justify-center gap-4 text-xs">
           <FaFacebookSquare /><span>Facebook account</span>
          </button>
        </div>

        
        
      </div>
    </div>
  );
};

export default Page;
