"use client";

import { bookType } from "@/types/book";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import LoadingSpinners from "./LoadingSpinners";
import {
  IoArrowBackCircleOutline,
  IoHeartOutline,
  IoHeart,
} from "react-icons/io5";
import { useSession } from "next-auth/react";

interface IBook {
  data: {
    book?: bookType;
  };
}

const SingleBook = ({ data }: IBook) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const localFavoriteStatus = localStorage.getItem(
      `favorite_${data.book?._id}`
    );
    if (localFavoriteStatus === "true") {
      setIsFavorite(true);
    } else {
      checkFavoriteStatus();
    }
  }, [data.book?._id, session?.user?.user.id]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/favorite/check`,
        {
          params: {
            userId: session?.user?.user.id,
            bookId: data.book?._id,
          },
        }
      );
      setIsFavorite(response.data.isFavorite);
      localStorage.setItem(
        `favorite_${data.book?._id}`,
        response.data.isFavorite
      );
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!data.book) return;

    try {
      if (isFavorite) {
        await axios.delete("http://localhost:4000/api/favorite", {
          data: {
            userId: session?.user?.user.id,
            bookId: data.book._id,
          },
        });
        setIsFavorite(false);
        alert("Book removed from favorites!");
        localStorage.setItem(`favorite_${data.book._id}`, "false");
      } else {
        // Add to favorites
        await axios.post("http://localhost:4000/api/favorite", {
          userId: session?.user?.user.id,
          bookId: data.book._id,
        });
        setIsFavorite(true);
        alert("Book added to favorites!");
        localStorage.setItem(`favorite_${data.book._id}`, "true");
      }

      queryClient.invalidateQueries("favorites");
    } catch (error: any) {
      console.error("Error details:", error.response || error.message || error);

      if (error.response && error.response.status === 400) {
        alert("This book is already in your favorites!");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`An error occurred: ${error.response.data.message}`);
      } else {
        alert("An error occurred while updating favorites.");
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!data.book) {
    return <LoadingSpinners />;
  }

  return (
    <div className="p-6 mt-5">
      <div className="flex justify-end gap-4">
        <button onClick={handleFavoriteToggle}>
          {isFavorite ? (
            <IoHeart className="text-4xl text-red-600" />
          ) : (
            <IoHeartOutline className="text-4xl text-blue-600" />
          )}
        </button>
        <button
          onClick={handleBack}
          className="flex items-center border-none bg-transparent text-blue-600 hover:text-blue-900"
        >
          <IoArrowBackCircleOutline className="text-4xl" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 mt-12">
        {/* Book Details */}
        <div className="flex flex-col justify-start">
          <h1
            className="text-6xl font-bold mb-2 mt-8 tracking-wider text-orange-600 text-center"
            style={{ fontFamily: "brush script mt" }}
          >
            {data.book.title}
          </h1>
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="mt-1 mb-2 w-[calc(40%+10px)] border-b-2 border-orange-500"></div>
          </div>
          <p className="mb-3 text-gray-600 italic">{data.book.summary}</p>
          <p className="text-sm mb-2 tracking-wide text-gray-600">
            <span
              className="text-xl text-gray-700 "
              style={{ fontFamily: "garamond" }}
            >
              TITLE :
            </span>
            {data.book.title}
          </p>
          <p className="text-sm mb-2 tracking-wide text-gray-600">
            <span
              className="text-xl text-gray-700 "
              style={{ fontFamily: "garamond" }}
            >
              AUTHOR :
            </span>
            {data.book.author}
          </p>
          <p className="text-sm mb-2 tracking-wide text-gary-800">
            <span
              className="text-xl text-gray-700 "
              style={{ fontFamily: "garamond" }}
            >
              PRICE :
            </span>
            {data.book.price} DT
          </p>
          <p className="text-sm mb-2 tracking-wide text-gary-600">
            <span
              className="text-xl text-gray-700 "
              style={{ fontFamily: "garamond" }}
            >
              LANGUAGE :
            </span>
            {data.book.language}
          </p>
        </div>

        {/* Book Cover Image */}
        <div className="flex justify-center">
          <img
            className="w-80 max-w-md h-auto"
            src={`http://localhost:4000/file/${data.book.coverImage}`}
            alt="Cover image"
          />
        </div>
      </div>

      {/* PDF Section */}
      <div className="w-full mb-12 mt-24">
        <iframe
          src={`http://localhost:4000/file/${data.book.file}`}
          height="950"
          width="100%"
          className="w-full"
        ></iframe>
      </div>
    </div>
  );
};

export default SingleBook;
