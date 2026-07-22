"use client";

import { useEffect, useState } from "react";

interface Service {
  _id: string;
  description: string;
}

interface Props {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onSave: (data: { description: string }) => Promise<void>;
}

export default function DescriptionModal({
  open,
  service,
  onClose,
  onSave,
}: Props) {

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (service) {
      setDescription(service.description);
    }
  }, [service]);

  if (!open || !service) return null;

  async function handleSave() {

    await onSave({
      description,
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
        max-w-2xl
        bg-white
        rounded-3xl
        shadow-2xl
        overflow-hidden
        animate-in
        fade-in
        zoom-in
        duration-200
      ">

        {/* Header */}

        <div className="
          flex
          items-center
          justify-between
          border-b
          p-6
        ">

          <div>

            <h2 className="text-2xl font-bold">
              Update Description
            </h2>

            <p className="text-gray-500 mt-1">
              Modify the service description
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              text-3xl
              text-gray-400
              hover:text-black
            "
          >
            ×
          </button>

        </div>


        {/* Body */}

        <div className="p-6">

          <label className="font-medium">
            Description
          </label>

          <textarea
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              mt-3
              w-full
              rounded-2xl
              border
              p-4
              resize-none
              focus:ring-2
              focus:ring-indigo-500
              outline-none
            "
          />

          <p className="mt-2 text-sm text-gray-400">
            {description.length} characters
          </p>

        </div>


        {/* Footer */}

        <div className="
          border-t
          p-6
          flex
          justify-end
          gap-4
        ">

          <button
            onClick={onClose}
            className="
              px-6
              py-3
              rounded-xl
              border
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              px-6
              py-3
              rounded-xl
              bg-indigo-600
              text-white
              hover:bg-indigo-700
              transition
            "
          >
            Save Description
          </button>

        </div>

      </div>

    </div>

  );

}