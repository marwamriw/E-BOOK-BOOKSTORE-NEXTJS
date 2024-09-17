import axios from "axios";
import React from "react";

const HomeAdmin = async () => {
  const response = await axios.get("http://localhost:4000/api/users");
  const data = await response.data;

  const res = await axios.get("http://localhost:4000/api/books");
  const databooks = await res.data;

  const ress = await axios.get("http://localhost:4000/api/contact");
  const datamessage = await ress.data;

  const favoriteResponse = await axios.get(`http://localhost:4000/api/total-favorites`)
  const favoriteData = await favoriteResponse.data;

  
  return (
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 md:mx-8 lg:mx-12">
      <div className="block p-6 bg-pink-500 border border-gray-200 rounded-lg shadow hover:bg-pink-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-normal text-white text-2xl dark:text-gray-400">
              {data.length}
            </p>
            <h6 className="mb-2 text-sm font-bold tracking-tight text-white dark:text-white">
              Users
            </h6>
          </div>
          <i className="bi bi-people text-white text-6xl"></i>
        </div>
      </div>

      <div className="block p-6 bg-lime-500 border border-gray-200 rounded-lg shadow hover:bg-lime-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-normal text-white text-2xl dark:text-gray-400">
              {databooks.length}
            </p>
            <h6 className="mb-2 text-sm font-bold tracking-tight text-white dark:text-white">
              Books
            </h6>
          </div>
          <i className="bi bi-book-half text-white text-6xl"></i>
        </div>
      </div>

      <div className="block p-6 bg-purple-500 border border-gray-200 rounded-lg shadow hover:bg-purple-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-normal text-white text-2xl dark:text-gray-400">
              {datamessage.data.length}
            </p>
            <h6 className="mb-2 text-sm font-bold tracking-tight text-white dark:text-white">
              Messages
            </h6>
          </div>

          <i className="bi bi-chat-dots text-white text-6xl"></i>
        </div>
      </div>
      <div className="block p-6 bg-cyan-500 border border-gray-200 rounded-lg shadow hover:bg-cyan-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-normal text-white text-2xl dark:text-gray-400">
              {favoriteData.data.length}
            </p>
            <h6 className="mb-2 text-sm font-bold tracking-tight text-white dark:text-white">
              favorites
            </h6>
          </div>
          <i className="bi bi-bookmark-heart text-white text-6xl"></i>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
