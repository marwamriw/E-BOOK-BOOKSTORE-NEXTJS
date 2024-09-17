"use client";

import { userType } from "@/types/user";
import { Button, Text, TextField } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect } from "react";

export default function LoginComponent() {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<userType>({});

  const onSubmit: SubmitHandler<userType> = async (data) => {
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("this is a response:", response);
      if (!response.ok || response?.error === "error login") {
        alert(response?.error);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-pink-300">
      <div className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden bg-white rounded-3xl shadow-md">
        <div className="md:w-1/2 p-8 space-y-8">
          <div className="space-y-4 mt-8">
            <h1 className="text-3xl font-bold text-pink-500 italic">LOGIN</h1>
            <p className="text-sm text-gray-500 italic">
              Welcome back! Please log in to your account.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                <Text as="div" size="1" mb="1" weight="bold">
                  Email
                </Text>
                <TextField.Root
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.email && (
                  <Text className="mt-2 ml-2 text-sm text-red-500 italic">
                    Please fill out this field.
                  </Text>
                )}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                <Text as="div" size="1" mb="1" weight="bold">
                  Password
                </Text>
                <TextField.Root
                  placeholder="Enter your password"
                  type="password"
                  {...register("password", { required: true })}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.password && (
                  <Text className="mt-2 ml-2 text-sm text-red-500 italic">
                    Please fill out this field.
                  </Text>
                )}
              </label>
            </div>

            <div>
              <Button
                type="submit"
                className="px-10 py-3 ml-28 mt-3 text-white bg-pink-300 rounded-2xl hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              >
                LOGIN
              </Button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <Link
                href={"/auth/register"}
                className="text-pink-500 hover:underline italic"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 hidden md:block">
          <img
            src="/login.png"
            alt="Login illustration"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
