import { redirect } from "next/navigation";
import LoginComponent from "@/components/login/LoginComponent";
import { getServerSession } from "next-auth";
import { optionAuth } from "@/lib/nextAuth";

export default async function Login() {
  const session = await getServerSession(optionAuth);

  if (session && session.user) {
    redirect("/");
  }

  return (
    <>
      <LoginComponent />
    </>
  );
}
