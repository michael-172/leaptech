import type { Metadata } from "next";
import "./globals.css";
import AntdProvider from "./AntdProvider";
import { Inter } from "next/font/google";
// Metadata for the root layout
export const metadata: Metadata = {
  title: "Leaptech Task - Michael",
  description:
    "Leaptech Task - Michael's solution for the file upload and preview task",
  openGraph: {
    title: "Leaptech Task - Michael",
    description:
      "Leaptech Task - Michael's solution for the file upload and preview task",
    url: "https://leaptech-task-michael.vercel.app/",
    siteName: "Leaptech Task - Michael",
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "auto",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
