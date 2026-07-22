"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  status: string;
}

interface StatusModalProps {
  open: boolean;
  booking: Booking | null;
  onClose: () => void;
  onSave: (data: Partial<Booking>) => Promise<void> | void;
}

const STATUS_OPTIONS = [
  "Pending",
  "Accepted",
  "On The Way",
  "In Progress",
  "Completed",
  "Cancelled",
];

export default function StatusModal({
  open,
  booking,
  onClose,
  onSave,
}: StatusModalProps) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (booking) {
      setStatus(booking.status);
    }
  }, [booking]);

  if (!open || !booking) return null;

  async function handleSave() {
    await onSave({
      status,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            Change Booking Status
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-gray-400 hover:text-red-500"
          >
            ×
          </button>

        </div>

        <div className="p-6">

          <label className="block text-sm font-medium mb-2">
            Booking Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border p-3"
          >
            {STATUS_OPTIONS.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              px-6
              py-3
              hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              rounded-xl
              bg-black
              px-6
              py-3
              text-white
              hover:bg-gray-800
            "
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}