import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BOOKSTORE",
  description: "application ebook nextjs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Container>
      {children}
      </Container>
      <Footer />
    </>
  );
}
