"use client";

interface Props {
  open: boolean;
  booking: any;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

export default function DeleteBookingModal({
  open,
  booking,
  onClose,
  onDelete,
}: Props) {

  if (!open || !booking) return null;

  async function handleDelete() {
    await onDelete();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-red-700">
            Delete Booking
          </h2>

        </div>

        <div className="p-6">

          <div className="flex justify-center text-6xl mb-5">
            🗑
          </div>

          <p className="text-center text-gray-700 leading-7">

            This action cannot be undone.

          </p>

          <p className="text-center mt-4">

            Delete booking for

            <br />

            <strong>

              {booking.name}

            </strong>

          </p>

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
            onClick={handleDelete}
            className="
            rounded-xl
            bg-red-700
            px-6
            py-3
            text-white
            hover:bg-red-800
            "
          >
            Delete Booking
          </button>

        </div>

      </div>

    </div>
  );

}