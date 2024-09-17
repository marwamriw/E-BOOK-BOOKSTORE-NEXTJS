import BarChart from "@/components/admin/BarChart";
import HomeAdmin from "@/components/admin/HomeAdmin";
import PieChart from "@/components/admin/PieChart";
import RecentBooks from "@/components/admin/RecentBooks";
import { optionAuth } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function pageAdmin() {
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
        DASHBOARD
      </h1>
      <HomeAdmin />
      <BarChart />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <PieChart />
        <RecentBooks />
      </div>
    </div>
  );
}
