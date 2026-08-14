import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahrine Estari Ditara — Data Analyst",
  description:
    "Portfolio of Sahrine Estari Ditara, Data Analyst and Information Technology student.",
  other: {
    "codex-preview": "development",
  },
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
