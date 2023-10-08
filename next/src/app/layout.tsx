"use client"
import AuthContext from "@/components/AuthContext";
import "./globals.css";
import { createContext, useState } from "react";
import Web3 from "web3";

export const AppContext = createContext();
const web3 = new Web3(process.env.NEXT_PUBLIC_WEB3_PROVIER);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [account, setAccount] = useState();

  return (
    <html lang="en">
      <body>
        <AppContext.Provider value={{ account, setAccount , web3 }}>
          <AuthContext>{children}</AuthContext>
        </AppContext.Provider>
      </body>
    </html>
  );
}
