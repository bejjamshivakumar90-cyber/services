"use client";

import { useState } from "react";

interface AddServiceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (service: {
    name: string;
    category: string;
    description: string;
    price: number;
    duration: string;
    image: string;
  }) => Promise<void>;
}

export default function AddServiceModal({
  open,
  onClose,
  onSave,
}: AddServiceModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");

  if (!open) return null;

  async function handleSubmit() {
    if (
      !name ||
      !category ||
      !description ||
      !price ||
      !duration
    ) {
      alert("Please fill all required fields.");
      return;
    }

    await onSave({
      name,
      category,
      description,
      price: Number(price),
      duration,
      image,
    });

    setName("");
    setCategory("");
    setDescription("");
    setPrice("");
    setDuration("");
    setImage("");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5">

      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            Add New Service
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-black"
          >
            ×
          </button>

        </div>

        <div className="space-y-5 p-6">

          <input
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <textarea
            rows={5}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Add Service
          </button>

        </div>

      </div>

    </div>
  );
}