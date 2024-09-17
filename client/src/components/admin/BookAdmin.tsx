"use client";
import { bookType } from "@/types/book";
import React from "react";
import { useQuery } from "react-query";
import CardBookAdmin from "./CardBookAdmin";
import LoadingSpinners from "../LoadingSpinners";
import AddBook from "../features/AddBook";

interface IBook {
  allbook: bookType[];
}
function BookAdmin() {
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
        throw new Error("response was not ok");
      }
      const data = await response.json();
      return data;
    },
    // initialData: allbook,
    retry: 1,
  });

  if (isLoading)
    return (
      <div>
        <LoadingSpinners />
      </div>
    );
  if (isError) return <div>Error loading books.</div>;

  return (
    <div>
       <AddBook />
      <CardBookAdmin books={books} />
    </div>
  );
}

export default BookAdmin;
