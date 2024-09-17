"use client";
import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddBook from "@/components/features/AddBook";

const Dashbord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/login");
  };
  return (
    <div className="bg-blue-50 min-h-screen relative">
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={toggleSidebar}
      >
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span>
      <div
        className={`sidebar fixed top-0 bottom-0 p-2 w-[300px] overflow-y-auto text-center bg-slate-600 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <img src="/fav.png" alt="icon" className="w-8 h-8" />
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">
              BookStore
            </h1>
            <i
              className="bi bi-x cursor-pointer ml-28 lg:hidden"
              onClick={toggleSidebar}
            ></i>
          </div>
          <div className="my-2 mx-3 bg-gray-500 h-[1px]"></div>
        </div>

        <Link href="/admin">
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Dashboard
            </span>
          </div>
          {/* <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-cloud-arrow-up-fill"></i>
            <AddBook />
          </div> */}
        </Link>

        <Link href="/">
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-person-video2"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Dashboard User
            </span>
          </div>
        </Link>

        <Link href="/admin/books">
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-book-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              ManageBooks
            </span>
          </div>
        </Link>

        <Link href="/admin/users">
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-people-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Users
            </span>
          </div>
        </Link>
        <Link href="/admin/message">
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-chat-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Message
            </span>
          </div>
        </Link>
        <div className="my-2 mx-3 bg-gray-500 h-[1px]"></div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={toggleDropdown}
        >
          <i className="bi bi-person-fill"></i>
          <div className="flex justify-between w-full items-center">
            <Link href="/admin/profile">
              {" "}
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Profile
              </span>
            </Link>
          </div>
        </div>

        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <i className="bi bi-box-arrow-in-right"></i>
          <button
            className="text-[15px] ml-4 text-gray-200 font-bold"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
