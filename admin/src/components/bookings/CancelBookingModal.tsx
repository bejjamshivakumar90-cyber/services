"use client";

interface Props {
  open: boolean;
  booking: any;
  onClose: () => void;
  onSave: () => Promise<void>;
}

export default function CancelBookingModal({
  open,
  booking,
  onClose,
  onSave,
}: Props) {

  if (!open || !booking) return null;

  async function handleCancel() {
    await onSave();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-red-600">
            Cancel Booking
          </h2>

        </div>

        <div className="p-6">

          <div className="flex justify-center text-6xl mb-5">
            ⚠️
          </div>

          <p className="text-center text-gray-700 leading-7">

            Are you sure you want to cancel this booking?

          </p>

          <p className="text-center text-sm text-gray-500 mt-4">

            Customer:
            <br />

            <strong>{booking.name}</strong>

          </p>

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3 hover:bg-gray-100"
          >
            No
          </button>

          <button
            onClick={handleCancel}
            className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"
          >
            Yes, Cancel Booking
          </button>

        </div>

      </div>

    </div>
  );
}