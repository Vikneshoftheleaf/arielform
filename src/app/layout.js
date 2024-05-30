import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import Navbar from "../components/nav";

import { AuthContextProvider } from "@/context/auth-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
        <AuthContextProvider>

          <Navbar></Navbar> 
          {children}
          </AuthContextProvider>

        </body>
    </html>
  );
}
