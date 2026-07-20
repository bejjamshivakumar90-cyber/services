// @ts-ignore: allow side-effect css import when no module typings are present
import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Admin",
  description: "Services Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}