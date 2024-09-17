"use client";
import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "react-query";
import LoadingSpinners from "../LoadingSpinners";
import { bookType } from "@/types/book";
import UpdateBook from "./UpdateBook";
import UpdateBookUser from "./UpdateBooksUser";

const GetUserBooks = () => {
  const { data: session } = useSession();
  const userId = session?.user?.user.id;

  const {
    data: books,
    isLoading,
    error,
  } = useQuery<bookType[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:4000/api/books/user/${userId}`
      );
      return response.data.books;
    },
    retry: 1,
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div>
        <LoadingSpinners />
      </div>
    );
  }
  const queryClient = useQueryClient();

  const Delete = async (id: string) => {
    queryClient.setQueryData<bookType[] | undefined>("books", (oldBooks) =>
      oldBooks ? oldBooks.filter((book) => book._id !== id) : []
    );

    try {
      await axios.delete(`http://localhost:4000/api/book/${id}`);
      queryClient.invalidateQueries("books");
    } catch (err) {
      console.log(err);
      queryClient.invalidateQueries("books");
    }
  };

  return (
    <div>
      {books && books.length > 0 && (
        <div className="text-center mb-8 mt-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span
              className="relative z-10 text-blue-600"
              style={{ fontFamily: "Georgia, sans-serif"}}
            >
              MY BOOKS
            </span>
          </h2>
          <div className="flex justify-center">
            <div className="w-20 md:w-[calc(15%+10px)] border-b-2 border-bleu-800 mb-10"></div>
          </div>
        </div>
      )}
      {books && books?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {books?.map((book) => (
            <div key={book._id} className="p-4  rounded-lg shadow-lg">
              <h3 className="text-ms font-semibold mb-1 text-center italic text-orange-600">
                {book.title}
              </h3>

              <img
                src={`http://localhost:4000/file/${book.coverImage}`}
                alt={book.title}
                className="w-full h-80 object-cover mb-1"
              />

              {/* Author and Price */}
              <div className="mt-2">
                <p className="text-gray-700 italic text-sm">
                  Author: {book.author}
                </p>
                <p className="text-gray-700 italic text-xs">
                  Price: {book.price} DT
                </p>
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <button className="bg-transparent text-white px-1 rounded ">
                  {/* <UpdateBook id={book._id}/> */}
                  <UpdateBookUser id={book._id} />
                </button>
                <button
                  className="bg-transparent text-white py-1 px-4 rounded mt-2" 
                  onClick={() => Delete(book._id)}
                >
                  <i className="bi bi-x-circle text-orange-700 text-xl mt-2"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <img src="/nobook-.png" alt="no book found" className="w-2/4" />
        </div>
      )}
    </div>
  );
};

export default GetUserBooks;
