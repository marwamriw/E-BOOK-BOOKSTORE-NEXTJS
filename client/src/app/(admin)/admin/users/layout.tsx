import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Users",
  description: "Admin Users page ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
