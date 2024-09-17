"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const { data: session, update } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  // State to hold user information
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("uploadedImageUrl");
    if (storedImageUrl) {
      setUploadedImageUrl(storedImageUrl);
    }
  }, []);

  useEffect(() => {
    if (session) {
      setUserData({
        name: session.user.user.name || "",
        email: session.user.user.email || "",
        role: session.user.user.role || "",
        password: "***********",
      });
    }
  }, [session]);

  async function updateSession() {
    await update({
      ...session,
      user: {
        ...session?.user,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    });
  }

  const handleLogSession = (e: any) => {
    e.preventDefault();
    console.log({ session });
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Function to delete the user
  const Delete = async (id: string) => {
    console.log("Delete function called with id:", id);
    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/auth/register");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadImage = async () => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }

    let formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post("http://localhost:4000/img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Full response object:", response.data);

      if (response.data.success) {
        const imageUrl = response.data.image.imageName;
        setUploadedImageUrl(imageUrl);

        localStorage.setItem("uploadedImageUrl", imageUrl);

        await update({
          ...session,
          user: {
            ...session?.user,
            image: imageUrl,
          },
        });

        window.location.reload();
      } else {
        console.error("Failed to upload image:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const selectImageToUpload = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <div className="relative p-6">
        <img
          src="/bg1.jpg"
          alt="background profile"
          className="w-full h-42 md:h-52 "
        />
        <img
          src={uploadedImageUrl || "/1.jpg"}
          alt="circular image"
          className="absolute bottom-[-42px] md:bottom-[-42px] left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full border-2 border-orange-500 bg-contain"
        />
      </div>
      <h1 className="text-center font-semibold text-gray-800 mt-20 text-6xl italic">
        Hi {session?.user.user.name}
      </h1>
      <div>
        <label> Upload Image</label>
        <input type="file" name="avatar" onChange={selectImageToUpload} />
        <button onClick={handleUploadImage}>Upload Image</button>
      </div>
      <div className="flex flex-col items-center justify-center mt-16 md:mt-10">
        <div className="bg-white p-12 md:p-12 rounded-lg shadow-md shadow-orange-300 w-full max-w-2xl">
          <form
            className="space-y-8 md:space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
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
                value={userData.name}
                onChange={handleChange}
                className="mt-1 block w-full py-1 border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 outline-none"
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
                value={userData.email}
                onChange={handleChange}
                className="mt-1 block w-full py-1 border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 outline-none"
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
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter your new password"
                className="mt-1 block w-full py-1 border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-blue-600 italic"
              >
                Role
              </label>
              <input
                id="role"
                type="text"
                value={userData.role}
                onChange={handleChange}
                className="mt-1 block w-full py-1 border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 outline-none"
              />
            </div>

            <div>
              <button type="button" onClick={updateSession}>
                {/* Update session */}
                <i className="bi bi-pencil-fill text-blue-800 text-xl"></i>
              </button>
              <button type="button" onClick={handleLogSession}>
                Log Session
              </button>
              <button
                type="button" // Change from submit to button
                onClick={() => Delete(session.user.user.id)} // Ensure ID is correct
              >
                <i className="bi bi-trash-fill text-red-800 text-xl"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
