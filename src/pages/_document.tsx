import Header from "@/components/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="flex flex-col">
      <Head />
      <body className="flex flex-col h-screen">
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
