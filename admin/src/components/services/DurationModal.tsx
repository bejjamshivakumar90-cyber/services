"use client";

import { useEffect, useState } from "react";

interface Service {
  _id: string;
  duration: string;
}

interface Props {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onSave: (data: { duration: string }) => Promise<void>;
}

export default function DurationModal({
  open,
  service,
  onClose,
  onSave,
}: Props) {

  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (service) {
      setDuration(service.duration);
    }
  }, [service]);

  if (!open || !service) return null;

  async function handleSave() {
    await onSave({
      duration,
    });

    onClose();
  }

  return (
    <div className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
      p-5
    ">

      <div className="
        w-full
        max-w-lg
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-2xl
        animate-in
        fade-in
        zoom-in
        duration-200
      ">

        <div className="
          flex
          items-center
          justify-between
          border-b
          p-6
        ">

          <div>
            <h2 className="text-2xl font-bold">
              Update Duration
            </h2>

            <p className="mt-1 text-gray-500">
              Change estimated service duration
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-400 hover:text-black"
          >
            ×
          </button>

        </div>

        <div className="p-6">

          <label className="font-medium">
            Duration
          </label>

          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Example: 45 Minutes"
            className="
              mt-3
              w-full
              rounded-xl
              border
              p-4
              text-lg
            "
          />

        </div>

        <div className="
          flex
          justify-end
          gap-4
          border-t
          p-6
        ">

          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              px-6
              py-3
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              rounded-xl
              bg-purple-600
              px-6
              py-3
              text-white
              transition
              hover:bg-purple-700
            "
          >
            Save Duration
          </button>

        </div>

      </div>

    </div>
  );
}