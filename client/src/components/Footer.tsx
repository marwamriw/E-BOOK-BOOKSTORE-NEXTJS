import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-gray-800 shadow-md mt-24 relative py-1">
    <div className="absolute inset-x-0 top-[-4px] h-1 bg-gradient-to-b from-transparent to-blue-200 shadow-md"></div>
    <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
      <div className="flex items-center space-x-2">
        <h1
          className="text-3xl md:text-4xl mt-3 font-semibold text-orange-600"
          style={{ fontFamily: "brush script mt" }}
        >
          bookStore
        </h1>
      </div>
      <div className="flex-1 flex justify-center md:justify-end items-center">
        <div className="text-gray-600 text-xs md:text-sm text-center md:text-right">
          © 2024 BookStore - All Rights Reserved.
        </div>
      </div>
    </div>
  </div>
  );
};

export default Footer;
