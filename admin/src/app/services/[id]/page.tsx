"use client";

import EditServiceModal from "@/components/services/EditServiceModal";
import PriceModal from "@/components/services/PriceModal";
import DurationModal from "@/components/services/DurationModal";
import DescriptionModal from "@/components/services/DescriptionModal";
import ImageModal from "@/components/services/ImageModal";
import StatusModal from "@/components/services/StatusModal";
import DeleteModal from "@/components/services/DeleteModal";
import AddServiceModal from "@/components/services/AddServiceModal";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  createdAt?: string;
  updatedAt?: string;
}

export default function ServiceDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadService();
  }, []);

  async function loadService() {
    try {
      const token = Cookies.get("token");

      const res = await fetch(`${API_URL}/services/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setService(data.service);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }






  async function createService(service: {
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  image: string;
}) {
  try {
    const token = Cookies.get("token");

    const res = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(service),
    });

    const data = await res.json();

    if (data.success) {
      alert("Service added successfully.");

      setShowAddModal(false);

      await loadService();
    } else {
      alert(data.message || "Unable to create service.");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
}






  async function updateService(updatedFields: Partial<Service>) {
    try {
      const token = Cookies.get("token");

      const res = await fetch(`${API_URL}/services/${service?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await res.json();

      if (data.success) {
        setService(data.service);
        alert("Service updated successfully.");
      } else {
        alert(data.message || "Update failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  async function updateImage(payload: any) {
    // delegate to updateService - ImageModal should provide proper fields (e.g. image)
    await updateService(payload);
  }

  async function deleteService() {
    try {
      const token = Cookies.get("token");

      const res = await fetch(`${API_URL}/services/${service?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        alert("Service deleted.");
        router.push("/services");
      } else {
        alert(data.message || "Delete failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!service) {
    return <div className="p-8 text-center">Service not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">{service.name}</h1>
          <p className="text-gray-500 mt-2">Service Details</p>
        </div>

        <Link href="/services">
          <button className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200">
            ← Back
          </button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl shadow p-6">
          {service.image ? (
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-72 object-cover rounded-2xl"
            />
          ) : (
            <div className="h-72 rounded-2xl bg-gray-100 flex items-center justify-center text-7xl">
              🛠
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl shadow p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Category</p>
              <h3 className="text-xl font-semibold">{service.category}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Price</p>
              <h3 className="text-xl font-semibold">₹{service.price}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Duration</p>
              <h3 className="text-xl font-semibold">{service.duration}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <span
                className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                  service.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {service.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl">Description</h3>
            <p className="mt-3 text-gray-600 leading-8">{service.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <p className="text-gray-500 text-sm">Created</p>
              <p>
                {service.createdAt
                  ? new Date(service.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Last Updated</p>
              <p>
                {service.updatedAt
                  ? new Date(service.updatedAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>

          {/* SERVICE MANAGEMENT */}
          <div className="mt-10 border-t pt-8">
            <h2 className="text-2xl font-bold">Service Management</h2>

            <p className="text-gray-500 mt-2">
              Manage the service from one place.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                ✏ Edit Service
              </button>

              <button
                onClick={() => setShowPriceModal(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                💰 Update Price
              </button>

              <button
                onClick={() => setShowDurationModal(true)}
                className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white rounded-2xl py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                ⏱ Update Duration
              </button>

              <button
                onClick={() => setShowDescriptionModal(true)}
                className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-2xl py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                📝 Update Description
              </button>

              <button
                onClick={() => setShowImageModal(true)}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🖼 Change Image
              </button>

              <button
                onClick={() => setShowStatusModal(true)}
                className={`rounded-2xl py-4 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                  service?.isActive
                    ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                }`}
              >
                {service?.isActive ? "🔴 Deactivate Service" : "🟢 Activate Service"}
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="xl:col-span-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-2xl py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🗑 Delete Service
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditServiceModal
        open={showEditModal}
        service={service}
        onClose={() => setShowEditModal(false)}
        onSave={updateService}
      />

      <PriceModal
        open={showPriceModal}
        service={service}
        onClose={() => setShowPriceModal(false)}
        onSave={updateService}
      />

      <DurationModal
        open={showDurationModal}
        service={service}
        onClose={() => setShowDurationModal(false)}
        onSave={updateService}
      />

      <DescriptionModal
        open={showDescriptionModal}
        service={service}
        onClose={() => setShowDescriptionModal(false)}
        onSave={updateService}
      />

      <ImageModal
        open={showImageModal}
        service={service}
        onClose={() => setShowImageModal(false)}
        onSave={updateImage}
      />

      <StatusModal
        open={showStatusModal}
        service={service}
        onClose={() => setShowStatusModal(false)}
        onSave={updateService}
      />

      <DeleteModal
        open={showDeleteModal}
        service={service}
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteService}
      />
    </div>
  );
}