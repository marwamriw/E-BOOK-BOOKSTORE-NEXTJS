import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Profile",
  description: "Admin profile page ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
