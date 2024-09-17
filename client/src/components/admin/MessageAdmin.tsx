"use client";
import { contactType } from "@/types/contact";
import axios from "axios";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import LoadingSpinners from "../LoadingSpinners";

const MessageAdmin = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["message"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/api/contact");
      console.log(response.data);
      return response.data.data;
    },
    retry: 1,
  });
  const queryClient = useQueryClient();
  const Delete = async (id: string) => {
    console.log("Delete function called with id:", id);
    try {
      await axios.delete(`http://localhost:4000/api/contact/${id}`);
      queryClient.invalidateQueries({ queryKey: ["message"] });
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) {
    return (
      <div>
        <LoadingSpinners />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 mx-8">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              NUMBER
            </th>
            <th scope="col" className="px-6 py-3">
              NAME
            </th>
            <th scope="col" className="px-6 py-3">
              EMAIL
            </th>
            <th scope="col" className="px-6 py-3">
              MESSAGE
            </th>
            <th scope="col" className="px-6 py-3">
              DELETE
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((message: contactType, index: number) => (
            <tr
              key={message.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white italic"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-blue-100 italic">
                {message.name}
              </td>
              <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-white italic">
                {message.email}
              </td>
              <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-white italic">
                {message.message}
              </td>

              <td className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-white italic">
                <button onClick={() => Delete(message._id)}>
                  <i className="bi bi-trash-fill text-red-700 text-xl"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessageAdmin;
