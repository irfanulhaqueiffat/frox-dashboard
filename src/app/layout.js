// app/layout.jsx
import "./globals.css";
import React from "react";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "Your App",
  description: "Demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
