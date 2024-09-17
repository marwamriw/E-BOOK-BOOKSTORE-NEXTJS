import { bookType } from "@/types/book";
import React, { useEffect } from "react";
import UpdateBook from "../features/UpdateBook";
import { useQueryClient } from "react-query";
import axios from "axios";
import Link from "next/link";

interface ICard {
  books: bookType[];
}
function CardBookAdmin({ books }: ICard) {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("Books passed to component:", books); // Check the data being passed to the component
  }, [books]);
  const Delete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/book/${id}`);
      queryClient.invalidateQueries("books");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 mx-2">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              NUMBER
            </th>
            <th scope="col" className="px-6 py-3">
              BOOK NAME
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">BOOK UPBLOADED BY</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">USER ROLE</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">AUTHOR NAME</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">PRICE</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Delete</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Update</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book, index) => (
            <tr
              key={book.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white italic"
              >
                {index + 1}
              </th>
              
              <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-white italic">
                {book.title}
              </td>
              <td className="px-6 py-4 text-gray-800   italic">
                {book.user?.name || "Unknown"}
              </td>
              <td className="px-6 py-4 text-gray-800   italic">
                {book.user?.role || "Unknown"}
              </td>
              <td className="px-6 py-4 text-gray-800   italic">
                {book.author}
              </td>

              <td className="px-6 py-4 text-gray-800  italic">{book.price}</td>
              <td className="px-6 py-4">
                <button
                  className="text-lg w-16 h-8 flex items-center justify-center font-semibold bg-transparent border-none  "
                  onClick={() => Delete(book._id)}
                >
                  <img src="/delete.png" className="w-7" />
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="text-lg w-20 h-10 block bg-transparent border-none ">
                  <UpdateBook id={book._id} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CardBookAdmin;
