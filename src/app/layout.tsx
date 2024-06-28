import Header from "@/components/Header";
import { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: 'Image Processing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="flex flex-col">
      <body className="flex flex-col min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  )
}