import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { cookies, headers } from "next/headers";
import AntdProvider from "./AntdProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  if (!cookieStore.get("user")) {
  }

  return (
    <html lang="en">
      <body className={` antialiased`}>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
