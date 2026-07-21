
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import API_URL from "@/lib/api";


interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  isActive: boolean;
}

export default function ServicesPage() {

 const [services, setServices] = useState<Service[]>([]);
const [filteredServices, setFilteredServices] = useState<Service[]>([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [filter, setFilter] = useState("all");






async function loadServices() {
  try {
    const token = Cookies.get("token");

    const res = await fetch(
      `${API_URL}/services`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      setServices(data.services);
      setFilteredServices(data.services);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}








useEffect(() => {
  loadServices();
}, []);

useEffect(() => {
  let data = [...services];

  if (filter === "active") {
    data = data.filter((s) => s.isActive);
  }

  if (filter === "inactive") {
    data = data.filter((s) => !s.isActive);
  }

  if (search.trim()) {
    const keyword = search.toLowerCase();

    data = data.filter(
      (service) =>
        service.name.toLowerCase().includes(keyword) ||
        service.category.toLowerCase().includes(keyword)
    );
  }

  setFilteredServices(data);
}, [services, search, filter]);




























  return (

<div className="space-y-8 px-4 sm:px-6 lg:px-8 xl:px-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h1 className="text-4xl font-bold">
            Services
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all available services
          </p>

        </div>

        <Link href="/services/add">

          <button
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
            + Add Service
          </button>

        </Link>

      </div>



      {/* Search */}

      <input
        type="text"
        placeholder="Search services..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
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

        {
          ["all","active","inactive"].map((item)=>(

            <button

              key={item}

              onClick={()=>setFilter(item)}

              className={`
              px-5
              py-2
              rounded-full
              transition

              ${
                filter===item
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
              }

              `}
            >

              {item.charAt(0).toUpperCase()+item.slice(1)}

            </button>

          ))
        }

      </div>



      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">
            Total Services
          </p>

          <h2 className="text-4xl font-bold mt-2">
           {services.length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">
            Active
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-600">
            {services.filter(s => s.isActive).length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">
            Inactive
          </p>

          <h2 className="text-4xl font-bold mt-2 text-red-500">
            {services.filter(s => !s.isActive).length}
          </h2>

        </div>

      </div>



      {/* Services Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : filteredServices.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10">
                  No services found
                </td>
              </tr>
            ) : (
              filteredServices.map((service) => (
                <tr
                  key={service._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center">
                        🛠
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-semibold">
                    {service.name}
                  </td>
                  <td className="p-4">
                    {service.category}
                  </td>
                  <td className="p-4">
                    ₹{service.price}
                  </td>
                  <td className="p-4">
                    {service.duration}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${service.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                   <div className="flex justify-center">

  <Link href={`/services/${service._id}`}>
    <button
      className="
      px-5
      py-2
      rounded-lg
      bg-blue-600
      text-white
      hover:bg-blue-700
      transition
      font-medium
      "
    >
      View Details
    </button>
  </Link>

</div>
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