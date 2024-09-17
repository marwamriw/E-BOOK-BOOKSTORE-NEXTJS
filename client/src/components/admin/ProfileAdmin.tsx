import React from "react";

const ProfileAdmin = () => {
  return (
    <div>
      <div className="relative p-6">
        {/* <div className="relative w-full h-48 mt-10 bg-gradient-to-b from-blue-500 to-blue-700"></div> */}
        <img
          src="/bg2.jpg"
          alt="background profile"
          className="w-full h-32 md:h-48 "
        />
        <img
          src="/profile.jpeg"
          alt="circular image"
          className="absolute bottom-[-33px] md:bottom-[-33px]  left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full border-4 border-orange-500 "
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-16 md:mt-10">
        <div className="bg-white p-12 md:p-12 rounded-lg shadow-md shadow-orange-300 w-full max-w-2xl">
          <form className="space-y-8 md:space-y-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-blue-600 italic"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder=""
                className="mt-1 block w-full py-1 border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500  outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-blue-600 italic"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder=""
                className="mt-1 block w-full py-1 border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500  outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-blue-600 italic"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder=""
                className="mt-1 block w-full py-1 border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500  outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-blue-600 italic"
              >
                Role
              </label>
              <select
                id="role"
                className="mt-1 block w-full py-1 border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="bg-red-800 p-2 text-white border-none">
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
