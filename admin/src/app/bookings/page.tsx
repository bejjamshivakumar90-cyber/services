"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import API_URL from "@/lib/api";
import Link from "next/link";


interface Booking {
  _id: string;

  name: string;
  email: string;
  phone: string;

  serviceName: string;

  technician?: {
    _id: string;
    name: string;
    profession: string;
    phone: string;
  };

  bookingDate: string;
  bookingTime: string;
  totalAmount?: number;
  status: string;
}




export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");














async function loadBookings() {
  try {
    const token = Cookies.get("token");

    const res = await fetch(`${API_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      setBookings(data.bookings);
      setFilteredBookings(data.bookings);
    }
  } catch (error) {
    console.error(error);
  }
}




useEffect(() => {
  loadBookings();
}, []);





useEffect(() => {
  let data = [...bookings];

  // Status Filter
  if (filter !== "All") {
    data = data.filter(
      (booking) => booking.status === filter
    );
  }

  // Search
  if (search.trim()) {
    const keyword = search.toLowerCase();

data = data.filter((booking) =>
  booking.name?.toLowerCase().includes(keyword) ||
  booking.email?.toLowerCase().includes(keyword) ||
  booking.phone?.includes(keyword) ||
  booking.serviceName?.toLowerCase().includes(keyword) ||
  booking.technician?.name?.toLowerCase().includes(keyword)
);
  }

  setFilteredBookings(data);
}, [bookings, search, filter]);






  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold">
            Bookings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all customer bookings
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => router.back()}
            className="
              px-5
              py-3
              rounded-xl
              border
              bg-white
              hover:bg-gray-100
              transition
            "
          >
            ← Back
          </button>

          <button
  onClick={loadBookings}
  className="
    bg-black
    text-white
    px-6
    py-3
    rounded-xl
    hover:bg-gray-800
    transition
  "
>
  Refresh
</button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-4xl font-bold mt-2">{bookings.length}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-4xl font-bold mt-2 text-yellow-600">{
bookings.filter(
b=>b.status==="Pending"
).length
}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">In Progress</p>
          <h2 className="text-4xl font-bold mt-2 text-blue-600">{
bookings.filter(
b=>b.status==="In Progress"
).length
}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-4xl font-bold mt-2 text-green-600">{
bookings.filter(
b=>b.status==="Completed"
).length
}</h2>
        </div>



<div className="bg-white rounded-2xl shadow p-6">

  <p className="text-gray-500">
    Cancelled
  </p>

  <h2 className="text-4xl font-bold mt-2 text-red-600">
    {
      bookings.filter(
        b => b.status === "Cancelled"
      ).length
    }
  </h2>

</div>








      </div>

      {/* Search */}

      <input
  type="text"
  placeholder="Search bookings..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="
    w-full
    border
    rounded-xl
    px-5
    py-3
    outline-none
    focus:ring-2
    focus:ring-black
  "
/>

     {/* Filters */}

<div className="flex flex-wrap gap-3">

  {[
    "All",
    "Pending",
    "Accepted",
    "On The Way",
    "In Progress",
    "Completed",
    "Cancelled",
  ].map((status) => (

    <button
      key={status}
      onClick={() => setFilter(status)}
      className={`
        px-5
        py-2
        rounded-full
        font-medium
        transition-all
        duration-200

        ${
          filter === status
            ? status === "Pending"
              ? "bg-yellow-500 text-white"
              : status === "Accepted"
              ? "bg-blue-500 text-white"
              : status === "On The Way"
              ? "bg-indigo-500 text-white"
              : status === "In Progress"
              ? "bg-purple-500 text-white"
              : status === "Completed"
              ? "bg-green-500 text-white"
              : status === "Cancelled"
              ? "bg-red-500 text-white"
              : "bg-black text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
      `}
    >
      {status}
    </button>

  ))}

</div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

  <th className="text-left p-4">Customer</th>

  <th className="text-left p-4">
    Contact
  </th>

  <th className="text-left p-4">Service</th>

  <th className="text-left p-4">Technician</th>

  <th className="text-left p-4">Date</th>

  <th className="text-left p-4">Amount</th>

  <th className="text-left p-4">Status</th>

  <th className="text-center p-4">Actions</th>

</tr>

          </thead>

          <tbody>

  {filteredBookings.length === 0 ? (

    <tr>

     <td
  colSpan={8}
  className="text-center py-16 text-gray-500"
>
  No bookings found
</td>
    </tr>

  ) : (

    filteredBookings.map((booking) => (

      <tr
        key={booking._id}
        className="border-t hover:bg-gray-50"
      >



<td className="p-4">

  <p className="font-semibold">
    {booking.name}
  </p>

  <p className="text-xs text-gray-500">
    Customer
  </p>

</td>

<td className="p-4">

  <p>
    {booking.email || "-"}
  </p>

  <p className="text-sm text-gray-500">
    {booking.phone || "-"}
  </p>

</td>

<td className="p-4">
  {booking.serviceName}
</td>







<td className="p-4">

  {booking.technician ? (

    <div>

      <p className="font-semibold">
        {booking.technician.name}
      </p>

      <p className="text-xs text-gray-500">
        {booking.technician.profession}
      </p>

    </div>

  ) : (

    <span className="text-red-500">
      Not Assigned
    </span>

  )}

</td>





















        <td className="p-4">
          {new Date(
            booking.bookingDate
          ).toLocaleDateString()}
        </td>

        <td className="p-4">
          ₹{booking.totalAmount ?? 0}
        </td>

        <td className="p-4">

          <span
  className={`
    px-3
    py-1
    rounded-full
    text-sm
    font-semibold

    ${
      booking.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"

        : booking.status === "Accepted"
        ? "bg-blue-100 text-blue-700"

        : booking.status === "On The Way"
        ? "bg-indigo-100 text-indigo-700"

        : booking.status === "In Progress"
        ? "bg-purple-100 text-purple-700"

        : booking.status === "Completed"
        ? "bg-green-100 text-green-700"

        : "bg-red-100 text-red-700"
    }
  `}
>
  {booking.status}
</span>

        </td>

        <td className="p-4 text-center">

          <Link href={`/bookings/${booking._id}`}>

            <button
              className="
              px-5
              py-2
              rounded-lg
              bg-blue-600
              text-white
              hover:bg-blue-700
              transition
              "
            >
              View
            </button>

          </Link>

        </td>

      </tr>

    ))

  )}

</tbody>
        </table>

      </div>

    </div>
  );
}