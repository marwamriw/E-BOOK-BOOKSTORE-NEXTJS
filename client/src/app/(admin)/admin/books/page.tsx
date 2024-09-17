import { optionAuth } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";
import BookAdmin from "@/components/admin/BookAdmin";

const pagebooks = async () => {
  const session = await getServerSession(optionAuth);

  if (!session || session.user.user?.role !== "admin") {
    return redirect("/auth/login");
  }
  return (
    <div className="p-4">
      <div className="flex items-center justify-between ">
        <h1
          className="text-3xl font-bold mt-4 mx-10 text-indigo-800"
          style={{ fontFamily: "Georgia, sans-serif" }}
        >
          Manager Your Books Inventory!
        </h1>
      </div>
      <BookAdmin />
    </div>
  );
};

export default pagebooks;
