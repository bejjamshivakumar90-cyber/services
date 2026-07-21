"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import API_URL from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
  customers: 0,
  services: 0,
  technicians: 0,
  bookings: 0,
  pending: 0,
  completed: 0,
  cancelled: 0,
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


      const totalCustomers = users.users?.filter((user: any) => user.role === "customer").length || 0;
      const totalServices = services.services?.length || 0;
      const totalTechnicians = technicians.technicians?.length || 0;
      const totalBookings = bookings.bookings?.length || 0;

      const pending = bookings.bookings?.filter((b: any) => b.status === "pending").length || 0;
      const completed = bookings.bookings?.filter((b: any) => b.status === "completed").length || 0;
      const cancelled = bookings.bookings?.filter((b: any) => b.status === "cancelled").length || 0;

      setStats({
        customers: totalCustomers,
        services: totalServices,
        technicians: totalTechnicians,
        bookings: totalBookings,
        pending,
        completed,
        cancelled,
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


     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value={stats.customers}
        />

        <StatCard
          title="Services"
          value={stats.services}
        />

      
        <StatCard
          title="Technicians"
          value={stats.technicians}
        />

        <StatCard
          title="Bookings"
          value={stats.bookings}
        />

        <StatCard
          title="Pending Bookings"
          value={stats.pending}
        />

        <StatCard
          title="Completed Bookings"
          value={stats.completed}
        />

        <StatCard
          title="Cancelled Bookings"
          value={stats.cancelled}
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