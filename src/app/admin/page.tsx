"use client";

import TheAdminNav from "@/components/header/admin-nav/TheAdminNav";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdminDashboard() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col justify-center">
      <h1 className="uppercase text-xl tracking-wider pl-5 py-5 border-b">
        admin page
      </h1>
      <div className="pl-3 pt-5">
        <TheAdminNav />
      </div>
    </div>
  );
}