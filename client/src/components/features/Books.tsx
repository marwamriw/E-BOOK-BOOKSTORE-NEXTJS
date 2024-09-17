"use client";
import { bookType } from "@/types/book";
import React from "react";
import { useQuery } from "react-query";
import Card from "../Card";
import LoadingSpinners from "../LoadingSpinners";
import { motion } from "framer-motion";

interface IBook {
  allbook: bookType[];
}

// SlideLeft function for Framer Motion animation
const SlideLeft = (delay: number) => ({
  initial: { x: 50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.5, delay: delay, ease: "easeInOut" },
  },
});

const Books = ({ allbook }: IBook) => {
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery<bookType[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/api/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      return data;
    },
    initialData: allbook,
    retry: 1,
  });

  if (isLoading)
    return (
      <div>
        <LoadingSpinners />
      </div>
    );

  if (isError) return <div>Error loading books: {error.message}</div>;

  return (
    <div>
      <h1
        className="text-sm md:text-6xl font-bold text-center mb-12 mt-12 italic"
        style={{ fontFamily: "Georgia, sans-serif" }}
      >
        All Books
      </h1>
      <motion.div
        variants={SlideLeft(0.1)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Card books={books} />
      </motion.div>
    </div>
  );
};

export default Books;
