"use client";
import { bookType } from "@/types/book";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingSpinners from "../LoadingSpinners";

const fetchRecentBooks = async () => {
  const response = await axios.get("http://localhost:4000/api/books/recent");
  return response.data.data;
};

const RecentBooks = () => {
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
  if (error) return <div>Error loading recent books</div>;

  return (
    <div>
      <h1
        className="text-xl font-bold mt-20 mb-8 mx-10 text-blue-600 text-center"
        style={{ fontFamily: "Georgia, sans-serif" }}
      >
        LAST UPLOADED BOOKS
      </h1>

      <table className="w-[50%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-auto">
        <thead className="text-ms  uppercase bg-blue-100 dark:bg-cyan-200 dark:text-gray-400  text-gray-600">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Author
            </th> */}
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {recentBooks.map((book: bookType) => (
            <tr
              key={book._id}
              className="bg-transparent border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white italic">
                {book.title}
              </td>
              {/* <td className="px-6 py-4 text-gray-600 dark:text-gray-300 italic">
                {book.author}
              </td> */}
              <td className="px-6 py-4 text-gray-600 dark:text-gray-300 italic">
                {book.price}DT
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBooks;
