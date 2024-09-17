import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Message",
  description: "Admin Message page ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
