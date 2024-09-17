"use client";

import { bookType } from "@/types/book";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";

interface IUpdateBook {
  id: string;
}

export default function UpdateBook({ id }: IUpdateBook) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<bookType>({});

  const { data } = useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:4000/api/book/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("author", data.author);
      setValue("pages", data.pages);
      setValue("language", data.language);
      setValue("price", data.price);
      setValue("summary", data.summary);
    }
  }, [data, setValue]);

  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<bookType> = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/book/${id}`,
        { ...data }
      );
      queryClient.invalidateQueries({ queryKey: ["book"] });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button className="mt-2 border-none bg-transparent">
            <img src="/update.png" style={{ width: "25px" }} />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="420px" className="flex flex-col">
          <div className="flex flex-col items-center mb-4">
            <img src="/fav.png" alt="Icon" className="w-10 h-10 mx-auto" />
          </div>
          <Dialog.Title className="text-2xl font-semibold mb-2 text-center text-amber-500 italic">
            Update Book
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
                <TextField.Root {...register("title")} />
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
                <TextField.Root {...register("author")} />
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
                <TextField.Root {...register("price")} />
              </label>
              <label>
                <Text
                  as="div"
                  size="2"
                  mb="1"
                  weight="bold"
                  className="text-blue-800 italic"
                >
                  summary
                </Text>
                <TextField.Root {...register("summary")} />
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
                <TextField.Root {...register("language")} />
              </label>
              {/* <label>
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
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                />
              </label>
            </label> */}
              {/* <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                File
              </Text>
              <input onChange={(e) => setFile(e.target.files[0])} type="file" />
            </label> */}
            </Flex>
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>

              <Button type="submit">Save</Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
