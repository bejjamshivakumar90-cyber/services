"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import API_URL from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    bookings: 0,
    technicians: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const token = Cookies.get("token");

      const [
  usersRes,
  servicesRes,
  techniciansRes,
  bookingsRes,
] = await Promise.all([
  fetch(`${API_URL}/auth/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),

  fetch(`${API_URL}/services`),

  fetch(`${API_URL}/technicians`),

  fetch(`${API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
]);
      const users = await usersRes.json();
      const services = await servicesRes.json();
      const technicians = await techniciansRes.json();
      const bookings = await bookingsRes.json();


      setStats({
    users: users.users?.filter(
  (user:any) => user.role === "customer"
).length || 0,
     services: services.services?.length || 0,
     technicians: technicians.technicians?.length || 0,
     bookings: bookings.bookings?.length || 0,
});
    } catch (error) {
      console.log("Dashboard loading error:", error);
    }
  }


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Welcome back, Admin
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total Users"
          value={stats.users}
        />

        <StatCard
          title="Services"
          value={stats.services}
        />

        <StatCard
          title="Bookings"
          value={stats.bookings}
        />

        <StatCard
          title="Technicians"
          value={stats.technicians}
        />

      </div>

    </div>
  );
}



function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {

  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}