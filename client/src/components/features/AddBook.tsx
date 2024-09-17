"use client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { bookType } from "@/types/book";
import { useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import {  useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBook() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<bookType>();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);



  const onSubmit: SubmitHandler<bookType> = async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("author", data.author);
      formData.append("summary", data.summary);
      formData.append("featured", data.featured);
      formData.append("user", session?.user.user.id ?? "");
      formData.append("language", data.language);
      formData.append("category", data.category);
      if (file) formData.append("file", file);
      if (image) formData.append("cover", image);

      const response = await axios.post(
        "http://localhost:4000/api/book",
        formData
      );

      // Invalidate the query to refresh the book list
      queryClient.invalidateQueries({ queryKey: ["books"] });

      // Show success toast
      toast.success("Book added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the book.");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="border-orange-500 bg-transparent text-orange-600 cursor-pointer italic underline decoration-orange-500 hover:px-5 mt-8">
          UPLOAD BOOK
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        maxWidth="450px"
        className="flex flex-col items-center p-4"
      >
        <img src="/fav.png" alt="Icon" className="w-10 h-10 mr-3" />
        <Dialog.Title className="text-2xl font-semibold mb-2 text-center text-amber-500 italic">
          Add New Book
        </Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                Title
              </Text>
              <TextField.Root
                placeholder="Enter the title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="mt-2 ml-2 text-xs text-red-500 italic">
                  Title is required
                </span>
              )}
            </label>
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                Author
              </Text>
              <TextField.Root
                placeholder="Enter the author of book"
                {...register("author", { required: true })}
              />
              {errors.author && (
                <span className="mt-2 ml-2 text-xs text-red-500 italic">
                  Author is required
                </span>
              )}
            </label>
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                Price
              </Text>
              <TextField.Root
                placeholder="Enter the price of book"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="mt-2 ml-2 text-xs text-red-500 italic">
                  Price is required
                </span>
              )}
            </label>
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                Summary
              </Text>
              <TextField.Root
                placeholder="Enter the description of book"
                {...register("summary", { required: true })}
              />
              {errors.summary && (
                <span className="mt-2 ml-2 text-xs text-red-500 italic">
                  Summary is required
                </span>
              )}
            </label>
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                Category
              </Text>
              <select
                {...register("category", { required: true })}
                className="border rounded p-2"
              >
                <option value="">Select a category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Drama">Drama</option>
              </select>
              {errors.category && (
                <span className="mt-2 ml-2 text-xs text-red-500 italic">
                  Category is required
                </span>
              )}
            </label>
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                Featured
              </Text>
              <TextField.Root
                placeholder="Enter the featured status"
                {...register("featured", { required: true })}
              />
            </label>
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                Language
              </Text>
              <TextField.Root
                placeholder="Enter the language of book"
                {...register("language", { required: true })}
              />
              {errors.language && (
                <span className="mt-2 ml-2 text-xs text-red-500 italic">
                  Language is required
                </span>
              )}
            </label>
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                Cover
              </Text>
              <input
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                type="file"
                accept="image/*"
              />
            </label>
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                File
              </Text>
              <input
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                type="file"
              />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close asChild>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>

            <Button type="submit">Save</Button>
          </Flex>
        </form>
      </Dialog.Content>

      {/* Toast Container */}
      <ToastContainer />
    </Dialog.Root>
  );
}
