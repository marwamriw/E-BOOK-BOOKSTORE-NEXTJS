"use client";
import { contactType } from "@/types/contact";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<contactType>({});

  const onSubmit: SubmitHandler<contactType> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/contact",
        data
      );
    } catch (err) {
      console.log(err);
    }
  };
  const notify = () => toast.success('Message send succesfully!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  return (
    <div className=" min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-28 p-8 bg-white shadow-lg rounded-lg h-[500px]">
        <div className="flex flex-col justify-center">
          <h1 className="text-orange-600 italic text-4xl mb-6">
            We are here to help!
          </h1>
          <Text as="p" size="3" className="text-blue-800 italic">
            We are dedicated to providing you with the best support possible. If
            you have any questions, concerns, or feedback, please don't hesitate
            to reach out to us through the contact form. Your journey is
            important to us, and we are honored to be a part of it. Whether you
            need assistance with your eBook application or have suggestions on
            how we can improve, we are here to help. Thank you for choosing us
            as your partner in this journey.
          </Text>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic mt-12"
              >
                Name
              </Text>
              <TextField.Root
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="mt-2 ml-2 text-xs text-red-500 italic">
                  name is required
                </span>
              )}
            </label>
            <label className="h-1/6">
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                Email
              </Text>
              <TextField.Root
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="w-full "
              />
              {errors.email && (
                <span className="mt-2 ml-2 text-xs text-red-500 italic">
                  email is required
                </span>
              )}
            </label>
            <label className="h-1/3">
              <Text
                as="div"
                size="2"
                mb="1"
                weight="bold"
                className="text-blue-800 italic"
              >
                message
              </Text>
              <TextField.Root
                placeholder="Enter your message"
                {...register("message", { required: true })}
                className="w-full h-24"
              />
              {errors.message && (
                <span className="mt-2 ml-2 text-xs text-red-500 italic">
                  message is required
                </span>
              )}
            </label>
          </Flex>
          <Button
            type="submit"
            onClick={notify}
            className="w-full bg-orange-600 hover:bg-orange-500 active:bg-orange-300 focus:outline-none focus:ring focus:ring-violet-300 text-white py-2 mt-6 cursor-pointer"
          >
            SEND
          </Button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
