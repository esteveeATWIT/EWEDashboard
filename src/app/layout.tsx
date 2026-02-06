import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Browser Dashboard",
  description: "A modern browser home dashboard for sports, tasks, and curated news."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
