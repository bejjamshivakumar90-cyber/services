"use client";

import { useState } from "react";

interface Service {
  _id: string;
  name: string;
}

interface Props {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

export default function DeleteModal({
  open,
  service,
  onClose,
  onDelete,
}: Props) {

  const [loading, setLoading] = useState(false);

  if (!open || !service) return null;

  async function handleDelete() {

    try {

      setLoading(true);

      await onDelete();

      onClose();

    } finally {

      setLoading(false);

    }

  }

  return (

    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
      p-5
      "
    >

      <div
        className="
        w-full
        max-w-lg
        rounded-3xl
        bg-white
        shadow-2xl
        overflow-hidden
        animate-in
        fade-in
        zoom-in
        duration-200
        "
      >

        {/* Header */}

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-red-600">

            Delete Service

          </h2>

          <p className="text-gray-500 mt-2">

            This action cannot be undone.

          </p>

        </div>

        {/* Body */}

        <div className="p-8 text-center">

          <div
            className="
            w-24
            h-24
            mx-auto
            rounded-full
            bg-red-100
            flex
            items-center
            justify-center
            text-5xl
            "
          >

            🗑

          </div>

          <h3 className="text-xl font-bold mt-6">

            Delete

            <span className="text-red-600">

              {" "}
              {service.name}

            </span>

            ?

          </h3>

          <p className="text-gray-500 mt-3">

            Once deleted, this service and its information
            cannot be recovered.

          </p>

        </div>

        {/* Footer */}

        <div
          className="
          border-t
          p-6
          flex
          justify-end
          gap-4
          "
        >

          <button
            onClick={onClose}
            disabled={loading}
            className="
            px-6
            py-3
            rounded-xl
            border
            hover:bg-gray-100
            transition
            disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="
            px-6
            py-3
            rounded-xl
            bg-red-600
            hover:bg-red-700
            text-white
            transition
            disabled:opacity-50
            "
          >

            {loading
              ? "Deleting..."
              : "Delete Service"}

          </button>

        </div>

      </div>

    </div>

  );

}