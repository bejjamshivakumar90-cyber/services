"use client";

import { useEffect, useState } from "react";

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

interface Props {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onSave: (data: Partial<Service>) => Promise<void>;
}

export default function EditServiceModal({
  open,
  service,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!service) return;

    setName(service.name);
    setCategory(service.category);
    setPrice(service.price.toString());
    setDuration(service.duration);
    setDescription(service.description);
  }, [service]);

  if (!open || !service) return null;

  async function handleSave() {
    await onSave({
      name,
      category,
      price: Number(price),
      duration,
      description,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-5">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200">

        <div className="flex items-center justify-between p-6 border-b">

          <div>

            <h2 className="text-2xl font-bold">
              Edit Service
            </h2>

            <p className="text-gray-500 mt-1">
              Update service information
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-400 hover:text-black"
          >
            ×
          </button>

        </div>

        <div className="p-6 space-y-5">

          <div>

            <label className="font-medium">
              Service Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-medium">
              Category
            </label>

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full border rounded-xl p-3"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-medium">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-2 w-full border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="font-medium">
                Duration
              </label>

              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-2 w-full border rounded-xl p-3"
              />

            </div>

          </div>

          <div>

            <label className="font-medium">
              Description
            </label>

            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full border rounded-xl p-3 resize-none"
            />

          </div>

        </div>

        <div className="border-t p-6 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}