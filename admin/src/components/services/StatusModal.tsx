"use client";

interface Service {
  _id: string;
  name: string;
  isActive: boolean;
}

interface Props {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onSave: (data: { isActive: boolean }) => Promise<void>;
}

export default function StatusModal({
  open,
  service,
  onClose,
  onSave,
}: Props) {

  if (!open || !service) return null;

  async function handleConfirm() {    if (!service) return;
    await onSave({
      isActive: !service .isActive,
    });

    onClose();

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
        bg-white
        rounded-3xl
        shadow-2xl
        max-w-md
        w-full
        overflow-hidden
        animate-in
        fade-in
        zoom-in
        duration-200
        "
      >

        {/* Header */}

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">

            {service.isActive
              ? "Deactivate Service"
              : "Activate Service"}

          </h2>

          <p className="text-gray-500 mt-2">

            {service.isActive
              ? "This service will no longer be visible to customers."
              : "This service will become available to customers."}

          </p>

        </div>

        {/* Icon */}

        <div className="flex justify-center py-8">

          <div
            className={`
              h-24
              w-24
              rounded-full
              flex
              items-center
              justify-center
              text-5xl

              ${
                service.isActive
                  ? "bg-red-100"
                  : "bg-green-100"
              }
            `}
          >

            {service.isActive ? "⛔" : "✅"}

          </div>

        </div>

        {/* Footer */}

        <div className="border-t p-6 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="
            px-6
            py-3
            rounded-xl
            border
            hover:bg-gray-100
            transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className={`
              px-6
              py-3
              rounded-xl
              text-white
              transition

              ${
                service.isActive
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }
            `}
          >

            {service.isActive
              ? "Deactivate"
              : "Activate"}

          </button>

        </div>

      </div>

    </div>

  );

}