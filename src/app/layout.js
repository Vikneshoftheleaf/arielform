import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/sessionwrapper";

const inter = Inter({ subsets: ["latin"] });

import Navbar from "./components/nav";


export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        {children}
        </body>
    </html>
    </SessionWrapper>
  );
}
