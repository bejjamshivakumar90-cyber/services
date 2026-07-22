"use client";

import { useEffect, useState } from "react";

interface Service {
  _id: string;
  price: number;
}

interface Props {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onSave: (data: { price: number }) => Promise<void>;
}

export default function PriceModal({
  open,
  service,
  onClose,
  onSave,
}: Props) {

  const [price, setPrice] = useState("");

  useEffect(() => {

    if(service){

      setPrice(service.price.toString());

    }

  },[service]);



  if(!open || !service){

    return null;

  }



  async function handleSave(){

    await onSave({
      price:Number(price)
    });

    onClose();

  }



  return(

    <div className="
    fixed
    inset-0
    z-50
    bg-black/60
    backdrop-blur-sm
    flex
    items-center
    justify-center
    p-5
    ">


      <div className="
      bg-white
      rounded-3xl
      shadow-2xl
      w-full
      max-w-lg
      overflow-hidden
      animate-in
      fade-in
      zoom-in
      duration-200
      ">


        <div className="
        flex
        justify-between
        items-center
        border-b
        p-6
        ">

          <div>

            <h2 className="text-2xl font-bold">
              Update Price
            </h2>

            <p className="text-gray-500 mt-1">
              Change service price
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



        <div className="p-6">

          <label className="font-medium">
            Service Price
          </label>

          <input
          type="number"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          className="
          mt-3
          w-full
          border
          rounded-xl
          p-4
          text-lg
          "
          />

        </div>



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
          bg-green-600
          text-white
          hover:bg-green-700
          transition
          "
          >
            Save Price
          </button>

        </div>

      </div>

    </div>

  );

}