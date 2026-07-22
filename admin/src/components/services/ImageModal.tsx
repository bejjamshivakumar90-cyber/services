"use client";

import { useEffect, useState } from "react";

interface Service {
  _id: string;
  image: string;
}

interface Props {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onSave: (file: File | null) => Promise<void>;
}

export default function ImageModal({
  open,
  service,
  onClose,
  onSave,
}: Props) {

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {

    if (service?.image) {

      setPreview(service.image);

    }

  }, [service]);

  if (!open || !service) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);

    setPreview(URL.createObjectURL(selected));

  }

  async function handleSave() {

    await onSave(file);

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
          justify-between
          items-center
          border-b
          p-6
        ">

          <div>

            <h2 className="text-2xl font-bold">
              Change Service Image
            </h2>

            <p className="text-gray-500 mt-1">
              Upload a new service image
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

        <div className="p-6 space-y-6">

          <div className="flex justify-center">

            <img
              src={
                preview
                  ? preview
                  : "/placeholder-service.png"
              }
              alt="Preview"
              className="
                w-64
                h-64
                object-cover
                rounded-2xl
                border
                shadow
              "
            />

          </div>

          <label
            className="
              flex
              flex-col
              items-center
              justify-center
              border-2
              border-dashed
              border-gray-300
              rounded-2xl
              p-10
              cursor-pointer
              hover:border-blue-500
              hover:bg-blue-50
              transition
            "
          >

            <span className="text-5xl">
              🖼
            </span>

            <p className="mt-4 font-semibold">
              Click to choose image
            </p>

            <p className="text-sm text-gray-500 mt-1">
              JPG • PNG • WEBP
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />

          </label>

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
              bg-orange-500
              hover:bg-orange-600
              text-white
              transition
            "
          >
            Save Image
          </button>

        </div>

      </div>

    </div>

  );

}