"use client"
import AuthContext from "@/components/AuthContext";
import "./globals.css";
import { createContext, useState } from "react";

export const AppContext = createContext();

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
