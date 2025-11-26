"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,          // e.g. "emilys"
          password,          // e.g. "emilyspass"
          expiresInMins: 30,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // DummyJSON কখনও `message`, কখনও `error` দেয়
        setError(data.message || data.error || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ DummyJSON থেকে আসে accessToken + refreshToken
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      const expiresInMins = 30;
      const tokenExpiresAt = Date.now() + expiresInMins * 60 * 1000;

      // SAVE TOKENS IN COOKIES
      Cookies.set("token", accessToken, { expires: 1 });
      Cookies.set("refreshToken", refreshToken, { expires: 7 });
      Cookies.set("tokenExpiresAt", String(tokenExpiresAt), { expires: 1 });
      Cookies.set("user", JSON.stringify(data), { expires: 1 });

      // EXTRA: SAVE TO LOCALSTORAGE FOR LOGOUT
      if (typeof window !== "undefined") {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(data));
      }

      // REDIRECT TO DASHBOARD
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
              <Image src={Logo} alt="Logo" width={30} height={30} />
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
            <label className="text-gray-600 text-sm">E-mail or username</label>
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
            <p className="text-red-500 text-xs mt-1">{error}</p>
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

        {/* username & password for testing */}
        <div className="flex gap-3 mt-4">
          <p className="flex-1 border rounded-2xlgit  text-black py-2 flex items-center justify-center gap-2 text-xs">
            Us: <span className="font-mono">emilys</span> |
            Pass: <span className="font-mono">emilyspass</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
