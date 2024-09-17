"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";
import { bookType } from "@/types/book";
import Link from "next/link";
import LoadingSpinners from "./LoadingSpinners";

const Favoris = () => {
  const { data: session } = useSession();
  const userId = session?.user?.user.id;

  const {
    data: favorites,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:4000/api/favorite?userId=${userId}`
      );
      return response.data;
    },
    enabled: !!userId,
    retry: 1,
  });

  if (isLoading)
    return (
      <div>
        <LoadingSpinners />
      </div>
    );
  if (error) return <div>{error.message || "Failed to fetch favorites."}</div>;

  return (
    <div className="p-6">
      {favorites.length > 0 && (
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 mt-12">
            <span
              className="relative z-10 text-blue-600"
              style={{ fontFamily: "Georgia, sans-serif"}}
            >
              FAVORITES BOOKS
            </span>
          </h2>
          <div className="flex justify-center">
            <div className="w-28 md:w-[calc(25%+10px)] border-b-2 border-bleu-800"></div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {favorites.length > 0 ? (
          favorites.map((favorite: any) =>
            favorite.bookId ? (
              <Link
                key={favorite._id}
                href={`/allBooks/${favorite.bookId._id}`}
              >
                <div className="rounded-lg p-4 shadow-lg h-full flex flex-col">
                  <h2 className="text-lg font-semibold mb-1 text-center italic text-orange-600">
                    {favorite.bookId.title}
                  </h2>
                  <img
                    src={`http://localhost:4000/file/${favorite.bookId.coverImage}`}
                    alt={favorite.bookId.title}
                    className="w-full h-80 object-cover mb-1"
                  />
                  <p className="text-gray-700 italic text-sm">
                    Author: {favorite.bookId.author}
                  </p>
                  <p className="text-xs italic">
                    Price: {favorite.bookId.price} DT
                  </p>
                </div>
              </Link>
            ) : null
          )
        ) : (
          <div className="flex justify-center items-center mt-40 h-80 w-full col-span-full">
            <img src="/no.png" alt="No Favorites" className="object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoris;
