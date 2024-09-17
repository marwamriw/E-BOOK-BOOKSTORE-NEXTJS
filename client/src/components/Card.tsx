"use client ";
import { bookType } from "@/types/book";
import Link from "next/link";
import React from "react";

interface ICard {
  books: bookType[];
}

const Card = ({ books }: ICard) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center">
      {books?.map((book) => (
        <Link href={`/allBooks/${book._id}`}>
          <div
            key={book._id}
            className="flex flex-col rounded-lg bg-white shadow-orange-300 text-surface shadow-md dark:bg-surface-dark dark:text-white md:max-w-xl md:flex-row
        transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-amber-50 h-72"
          >
            <img
              className="h-80 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg"
              src={`http://localhost:4000/file/${book.coverImage}`}
              alt=""
            />
            <div className="flex flex-col justify-start p-6">
              <h5
                className="mb-2 text-xl font-medium text-orange-500"
                style={{ fontFamily: "verdana" }}
              >
                {book.title}
              </h5>
              <p className="mb-4 text-xs" style={{ fontFamily: "verdana" }}>
                {book.summary}
              </p>
              <p
                className="text-xs text-surface/75 dark:text-neutral-300"
                style={{ fontFamily: "verdana" }}
              >
                Author: {book.author}
              </p>
              <p className="text-xs text-surface/75 dark:text-neutral-300"
                style={{ fontFamily: "verdana" }}>Category:{book.category}</p>
                 <p
                className="text-xs text-surface/75 dark:text-neutral-300"
                style={{ fontFamily: "verdana" }}
              >
                Price: {book.price} DT
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
