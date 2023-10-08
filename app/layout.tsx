"use client";
import "./globals.css";
import { Lexend } from "next/font/google";

const inter = Lexend({ subsets: ["latin"] });

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
