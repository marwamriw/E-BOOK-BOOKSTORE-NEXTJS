import ProfileAdmin from "@/components/admin/ProfileAdmin";
import React from "react";
import { optionAuth } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(optionAuth);

  if (!session || session.user.user?.role !== "admin") {
    return redirect("/auth/login");
  }
  return (
    <div>
      <ProfileAdmin />
    </div>
  );
};

export default page;
