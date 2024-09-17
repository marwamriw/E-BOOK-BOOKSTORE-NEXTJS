import Dashbord from "@/components/admin/Dashbord";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BOOKSTORE Admin",
  description: "admin dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
    <Dashbord />
    <main className="flex-grow ml-72 bg-gray-100">{children}</main>
  </div>
  );
}
