import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM Admin",
  description: "Multi-tenant AI Chatbot CRM Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
