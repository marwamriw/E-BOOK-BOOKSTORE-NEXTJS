import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Books",
  description: "Admin Books page ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
