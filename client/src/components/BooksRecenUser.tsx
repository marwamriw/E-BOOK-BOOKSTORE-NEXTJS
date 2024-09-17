"use client";
import { bookType } from "@/types/book";
import axios from "axios";
import { useQuery } from "react-query";
import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import LoadingSpinners from "./LoadingSpinners";

const fetchRecentBooks = async () => {
  const response = await axios.get("http://localhost:4000/api/books/recent");
  return response.data.data;
};

const BooksRecenUser = () => {
  const {
    data: recentBooks,
    isLoading,
    error,
  } = useQuery("recentBooks", fetchRecentBooks);

  if (isLoading)
    return (
      <div>
        <LoadingSpinners />
      </div>
    );
  if (error) return <div>Error loading last recent books</div>;
  return (
    <div>
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 mt-4">
        <span
          className="relative z-10 text-orange-600"
          style={{ fontFamily: "Georgia, sans-serif" }}
        >
          LATEST BOOKS
        </span>
      </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-1 mb-20 w-24 md:w-[calc(25%+10px)] border-b-2 border-orange-500 "></div>
      </div>
      {/* card of latest books */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-10">
        {recentBooks.map((book: bookType) => (
          <Link href={`/allBooks/${book._id}`}>
            <div key={book._id}>
              <img
                className="h-96 w-full rounded-t-lg object-cover md:h-72 md:w-48 md:!rounded-none md:!rounded-s-lg"
                src={`http://localhost:4000/file/${book.coverImage}`}
                alt=""
              />
              <h6 className="text-sm mt-3 text-center text-gray-600">
                {book.title}
              </h6>
              <h6 className="text-xs mt-1 text-center text-gray-400">
                {book.author}
              </h6>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link href={"/allBooks"}>
          <Button className="mt-4 mb-12 md:mt-8 rounded-full bg-orange-500 text-white border-2 border-orange-500 px-12 py-4 transition-colors duration-300 hover:bg-white hover:text-orange-500 cursor-pointer">
            ALL BOOKS
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BooksRecenUser;
