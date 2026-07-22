"use client";

import { useEffect, useState } from "react";

interface Technician {
  _id: string;
  name: string;
  profession?: string;
}

interface Props {
  open: boolean;
  technicians: Technician[];
  booking: any;
  onClose: () => void;
  onAssign: (technicianId: string) => Promise<void>;
}

export default function AssignTechnicianModal({
  open,
  technicians,
  booking,
  onClose,
  onAssign,
}: Props) {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (booking?.technician?._id) {
      setSelected(booking.technician._id);
    }
  }, [booking]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            Assign Technician
          </h2>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-500"
          >
            ×
          </button>

        </div>

        <div className="p-6">

          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full rounded-xl border p-3"
          >
            <option value="">
              Select Technician
            </option>

            {technicians.map((tech) => (

              <option
                key={tech._id}
                value={tech._id}
              >
                {tech.name}
                {tech.profession ? ` • ${tech.profession}` : ""}
              </option>

            ))}

          </select>

        </div>

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              await onAssign(selected);
              onClose();
            }}
            className="rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Assign
          </button>

        </div>

      </div>

    </div>
  );
}