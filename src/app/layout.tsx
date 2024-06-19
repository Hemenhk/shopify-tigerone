import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/tanstack-provider";
import TheHeader from "@/components/header/TheHeader";
import { Toaster } from "@/components/ui/toaster";
import TheAnnouncement from "@/components/announcement/TheAnnouncement";
import TheFooter from "@/components/footer/TheFooter";
import { CheckoutProvider } from "@/context/checkoutContext";
import NextAuthProvider from "@/context/nextAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tigerone",
  description: "A ecommerce store selling football gear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col min-h-screen"}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <CheckoutProvider>
              <TheAnnouncement />
              <TheHeader />
              <main className="flex-grow">{children}</main>
              <TheFooter />
              <Toaster />
            </CheckoutProvider>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
