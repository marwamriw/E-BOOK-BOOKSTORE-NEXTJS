import MessageAdmin from "@/components/admin/MessageAdmin";
import React from "react";
import { optionAuth } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async() => {
  const session = await getServerSession(optionAuth);

 
  if (!session || session.user.user?.role !== "admin") {
    
    return redirect("/auth/login");
  }
  return (
    <div className="p-4">
      <h1
        className="text-3xl font-bold mt-4 mb-8 mx-10 text-indigo-800"
        style={{ fontFamily: "Georgia, sans-serif" }}
      >
        YOUR MESSAGES HISTORY!
      </h1>
      <MessageAdmin />
    </div>
  );
};

export default page;
