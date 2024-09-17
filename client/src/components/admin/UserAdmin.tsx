"use client";
import { userType } from "@/types/user";
import axios from "axios";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import LoadingSpinners from "../LoadingSpinners";

const UserAdmin = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/api/users");
      return response.data;
    },
    retry: 1,
  });

  const queryClient = useQueryClient();
  const Delete = async (id: string) => {
    console.log("Delete function called with id:", id);
    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
              ROLE
            </th>
            <th scope="col" className="px-6 py-3">
              DELETE
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user: userType, index: number) => (
              <tr
                key={user.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white italic"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4 italic">{user.name}</td>
                <td className="px-6 py-4 italic">{user.email}</td>
                <td className="px-6 py-4 italic">{user.role}</td>
                <td className="px-6 py-4">
                  <button onClick={() => Delete(user._id)}>
                    <i className="bi bi-trash-fill text-red-800 text-xl"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAdmin;
