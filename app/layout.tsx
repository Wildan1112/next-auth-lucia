import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth lucia",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-800`}>{children}
        <Toaster richColors={true} closeButton={true} />
      </body>
    </html>
  );
}
