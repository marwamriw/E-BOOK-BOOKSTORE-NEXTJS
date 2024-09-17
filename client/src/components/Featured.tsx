"use client";
import { bookType } from "@/types/book";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import LoadingSpinners from "./LoadingSpinners";
import Link from "next/link";


const fetchFeaturedBooks = async () => {
  const response = await axios.get(
    "http://localhost:4000/api/book/featuredBooks"
  );
  return response.data.data;
};

const Featured = () => {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery<bookType[]>("featuredBooks", fetchFeaturedBooks);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinners />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching featured books</div>;
  }

  return (
    <div className=" p-10 rounded-lg mb-4
     bg-[url('/b1.png')]  bg-no-repeat bg-center bg-cover h-auto">
      <h2 className="text-4xl md:text-6xl font-bold text-center mt-4">
        <span
          className="relative z-10 text-orange-600"
          style={{fontFamily: "Georgia, sans-serif" }}
        >
          FEATURED BOOKS
        </span>
      </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-20 w-24 md:w-[calc(25%+10px)] border-b-2 border-orange-500 "></div>
      </div>
      <div className="p-10 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-10 ">
          {books &&
            books.map((book: bookType) => (
              <Link href={`/allBooks/${book._id}`}>
                <div key={book._id}>
                  <img
                    className="h-96 w-full rounded-t-lg object-cover md:h-72 md:w-48 md:!rounded-none md:!rounded-s-lg pointer-events-none"
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
      </div>
    </div>
  );
};

export default Featured;
