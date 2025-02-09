"use client"
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import SessionWrapper from "./components/SessionWrapper";
import { useState } from "react";
import { serverContext } from "./context/serverContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({ children }) {
  const [serverUpdate, setServerUpdate] = useState("update")

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <serverContext.Provider value={{serverUpdate, setServerUpdate}}>
          <SessionWrapper>
          {children}
          </SessionWrapper>
        </serverContext.Provider>
      </body>
    </html>
  );
}
