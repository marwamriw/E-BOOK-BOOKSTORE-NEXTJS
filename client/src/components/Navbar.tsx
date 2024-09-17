"use client";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AiOutlineLogout, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);


  useEffect(() => {
    // Retrieve uploaded image URL from localStorage
    const storedImageUrl = localStorage.getItem("uploadedImageUrl");
    if (storedImageUrl) {
      setUploadedImageUrl(storedImageUrl);
    }
  }, []);
  return (
    <nav className="bg-gray-50 text-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between relative">
        <div className="flex items-center space-x-2">
          <img src="/fav.png" alt="icon" className="w-8 h-8" />
          <Link href="/">
            <h1
              className="text-4xl mt-3 font-semibold text-blue-800"
              style={{ fontFamily: "brush script mt" }}
            >
              bookStore
            </h1>
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-blue-800">
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:space-x-6 absolute md:relative top-full left-0 w-full md:w-auto bg-gray-50 md:bg-transparent md:flex-row flex-col space-y-4 md:space-y-0 px-4 md:px-0 transition-transform duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              href="/allBooks"
              className="block text-gray-700 hover:text-pink-100 hover:bg-blue-800 px-3 py-3 rounded transition-colors duration-300"
              style={{ fontFamily: "verdana" }}
              onClick={toggleMenu}
            >
              All Books
            </Link>
          </li>

          <li className="flex items-center mt-3 md:mt-0">
            {session?.user?.user && (
              <Link
                href="/myBooks"
                className="block text-gray-700 hover:text-pink-100 hover:bg-blue-800 px-3 py-3 rounded transition-colors duration-300"
                style={{ fontFamily: "verdana" }}
                onClick={toggleMenu}
              >
                My Books
              </Link>
            )}
          </li>
          {session?.user?.user?.role === "admin" && (
            <li>
              <Link
                href="/admin"
                className="block text-gray-700 hover:text-pink-100 hover:bg-blue-800 px-3 py-3 rounded transition-colors duration-300"
                style={{ fontFamily: "verdana" }}
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            </li>
          )}

          <li className="flex items-center mt-3 md:mt-0">
            <Link
              href="/favoris"
              className="block text-gray-700 hint--bottom hover:text-white hover:bg-blue-800 px-3 py-3 rounded transition-colors duration-300"
              style={{ fontFamily: "verdana" }}
              onClick={toggleMenu}
              aria-label="Favorites Books"
            >
              Favorites
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-pink-100 hover:bg-blue-800 px-3 py-3 rounded transition-colors duration-300"
              style={{ fontFamily: "verdana" }}
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </li>

          {/* User Profile Dropdown */}
          {session?.user?.user && (
            <li className="relative">
              <div
                className="flex items-center cursor-pointer space-x-3"
                onClick={toggleDropdown}
              >
                <img
                  src={uploadedImageUrl || "/1.jpg"}
                  alt="User Image"
                  className="w-10 h-10 rounded-full object-cover mt-1"
                />
                <span className="mt-2">{session.user.user.name}</span>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-700 hover:text-white"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      closeDropdown();
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-700 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
