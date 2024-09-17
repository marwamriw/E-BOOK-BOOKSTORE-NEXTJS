"use client";
import { Button, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { userType } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterComponent = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userType>({});

  const onSubmit: SubmitHandler<userType> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/register",
        data
      );
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 to-blue-200">
      <div className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden bg-white rounded-2xl shadow-md">
        <div className="w-full md:w-1/2 p-8 space-y-8">
          <div className="space-y-4 mt-8">
            <h1 className="text-3xl font-bold text-blue-400 italic">
              REGISTER
            </h1>
            <p className="text-sm text-gray-500 italic">
              Create a new account to get started.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                <Text as="div" size="1" mb="1" weight="bold">
                  Name
                </Text>
                <TextField.Root
                  placeholder="Enter your  Full Name"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 custom-placeholder"
                />
                {errors.name && (
                  <Text className="text-red-500 ml-2 italic">
                    Please fill out this field.
                  </Text>
                )}
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                <Text as="div" size="1" mb="1" weight="bold">
                  Email
                </Text>
                <TextField.Root
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 custom-placeholder"
                />
                {errors.email && (
                  <Text className="text-red-500 ml-2 italic">
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
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 custom-placeholder"
                />
                {errors.password && (
                  <Text className="text-red-500 ml-2 italic">
                    Please fill out this field.
                  </Text>
                )}
              </label>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="px-10 py-3  mt-3 text-white bg-blue-300 rounded-2xl hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
              >
                REGISTER
              </Button>
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href={"/auth/login"}
                className="text-blue-500 hover:underline italic"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden md:block w-full md:w-1/2">
          <img
            src="/register.png"
            alt="Register illustration"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
