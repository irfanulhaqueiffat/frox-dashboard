// lib/authClient.js
"use client";

import Cookies from "js-cookie";

const API_BASE = "https://dummyjson.com";

export async function getValidAccessToken() {
  const token = Cookies.get("token");
  const refreshToken = Cookies.get("refreshToken");
  const tokenExpiresAt = Cookies.get("tokenExpiresAt");

  // token still valid → just return it
  if (token && tokenExpiresAt && Date.now() < Number(tokenExpiresAt)) {
    return token;
  }

  // no refresh token → user must log in again
  if (!refreshToken) {
    return null;
  }

  // try to refresh
  try {
    const res = await fetch(`${API_BASE}/user/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 30,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Refresh failed");
    }

    const expiresInMins = 30;
    const newExpiresAt = Date.now() + expiresInMins * 60 * 1000;

    Cookies.set("token", data.token, { expires: 1 });
    Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
    Cookies.set("tokenExpiresAt", String(newExpiresAt), { expires: 1 });

    return data.token;
  } catch (err) {
    console.error("Error refreshing token:", err);
    // clear cookies on failure
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("tokenExpiresAt");
    Cookies.remove("user");
    return null;
  }
}
