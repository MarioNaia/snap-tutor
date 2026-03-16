import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnapTutor",
  description: "AI tutor that sees homework and explains it out loud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}