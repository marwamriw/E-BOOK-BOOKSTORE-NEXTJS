"use client";

import { useState, useEffect } from "react";
import Books from "@/components/features/Books";
import Search from "@/components/features/Search";
import { bookType } from "@/types/book";
import LoadingSpinners from "@/components/LoadingSpinners";
import Link from "next/link";
import FictionBooks from "@/components/FictionBooks";
import DramaBooks from "@/components/DramaBooks";
import NoFictionBooks from "@/components/NoFictionBook";

export default function AllBooksPage() {
  const [allBooks, setAllBooks] = useState<bookType[]>([]);
  const [searchResults, setSearchResults] = useState<bookType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setAllBooks(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Function to handle search results from Search component
  const handleSearchResults = (results: bookType[]) => {
    setSearchResults(results);
  };

  if (isLoading)
    return (
      <div>
        <LoadingSpinners />
      </div>
    );
  if (isError) return <div>Error loading books</div>;

  // Function to handle category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h1
        className="text-6xl font-bold text-center text-orange-600 mt-14"
        style={{ fontFamily: "brush script mt" }}
      >
        BOOKS
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-1 mb-14 w-[calc(15%+10px)] border-b-2 border-orange-500"></div>
      </div>

      {/* Pass the handleSearchResults function to Search component */}
      <Search onSearch={handleSearchResults} />

      {/* Category Buttons */}
      <div className="flex justify-start space-x-2 mb-6">
        <div className="italic text-gray-700">Filtered by Category :</div>
        <div className="flex space-x-4">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`border-none bg-transparent text-sm text-gray-700 ${
              selectedCategory === null ? "underline decoration-red-800" : ""
            }`}
          >
            All Books
          </button>
          <button
            onClick={() => handleCategorySelect("fiction")}
            className={`border-none bg-transparent text-sm text-gray-700 ${
              selectedCategory === "fiction"
                ? "underline decoration-red-800"
                : ""
            }`}
          >
            Fiction
          </button>
          <button
            onClick={() => handleCategorySelect("non-fiction")}
            className={`border-none bg-transparent text-sm text-gray-700 ${
              selectedCategory === "non-fiction"
                ? "underline decoration-red-800"
                : ""
            }`}
          >
            NonFiction
          </button>
          <button
            onClick={() => handleCategorySelect("drama")}
            className={`border-none bg-transparent text-sm text-gray-700 ${
              selectedCategory === "drama" ? "underline decoration-red-800" : ""
            }`}
          >
            Drama
          </button>
        </div>
      </div>

      {/* Conditionally render based on search results */}
      {searchResults ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center mt-6">
          {searchResults.map((book) => (
            <Link
              key={book._id}
              href={`/allBooks/${book._id}`}
              className="w-full"
            >
              <div
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
      ) : selectedCategory ? (
        // Conditionally render the category-specific component
        selectedCategory === "fiction" ? (
          <FictionBooks />
        ) : selectedCategory === "non-fiction" ? (
          <NoFictionBooks />
        ) : selectedCategory === "drama" ? (
          <DramaBooks />
        ) : (
          <Books allbook={allBooks} />
        )
      ) : (
        <Books allbook={allBooks} />
      )}
    </div>
  );
}
