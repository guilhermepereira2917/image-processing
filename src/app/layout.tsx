import { Metadata } from "next"
import './globals.css';
import Header from "@/components/Header";

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
      <body className="flex flex-col h-screen">
        <Header />
        {children}
      </body>
    </html>
  )
}