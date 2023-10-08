"use client"
import AuthContext from "@/components/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import { createContext, useState } from "react";

export const AppContext = createContext();

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [account, setAccount] = useState();

  return (
    <html lang="en">
      <body>
        <AppContext.Provider value={{ account, setAccount }}>
          <AuthContext>{children}</AuthContext>
        </AppContext.Provider>
      </body>
    </html>
  );
}
