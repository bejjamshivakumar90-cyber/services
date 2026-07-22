"use client";

import { useEffect, useState } from "react";

interface Booking {
  bookingDate?: string;
  bookingTime?: string;
}

interface Props {
  open: boolean;
  booking: Booking | null;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

export default function RescheduleModal({
  open,
  booking,
  onClose,
  onSave,
}: Props) {

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  useEffect(() => {
    if (booking) {
      setBookingDate(
        booking.bookingDate
          ? new Date(booking.bookingDate).toISOString().split("T")[0]
          : ""
      );

      setBookingTime(booking.bookingTime || "");
    }
  }, [booking]);

  if (!open || !booking) return null;

  async function handleSave() {
    await onSave({
      bookingDate,
      bookingTime,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            Reschedule Booking
          </h2>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-500"
          >
            ×
          </button>

        </div>

        <div className="space-y-5 p-6">

          <div>

            <label className="mb-2 block font-medium">
              Booking Date
            </label>

            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Booking Time
            </label>

            <input
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}