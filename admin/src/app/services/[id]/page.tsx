"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import API_URL from "@/lib/api";

interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function ServiceDetailsPage() {
  const params = useParams();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
const [editMode, setEditMode] = useState(false);

const [price, setPrice] = useState("");
const [duration, setDuration] = useState("");
const [description, setDescription] = useState("");

const [showPrice, setShowPrice] = useState(false);
const [showDuration, setShowDuration] = useState(false);
const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    loadService();
  }, []);

  async function loadService() {
    try {
      const token = Cookies.get("token");

      const res = await fetch(
        `${API_URL}/services/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {



        setPrice(data.service.price.toString());
setDuration(data.service.duration);
setDescription(data.service.description);



        setService(data.service);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-8 text-center">
        Service not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            {service.name}
          </h1>

          <p className="text-gray-500 mt-2">
            Service Details
          </p>

        </div>

        <Link href="/services">

          <button className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200">
            ← Back
          </button>

        </Link>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="bg-white rounded-3xl shadow p-6">

          {service.image ? (
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-72 object-cover rounded-2xl"
            />
          ) : (
            <div className="h-72 rounded-2xl bg-gray-100 flex items-center justify-center text-7xl">
              🛠
            </div>
          )}

        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl shadow p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500 text-sm">Category</p>
              <h3 className="text-xl font-semibold">{service.category}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Price</p>
              <h3 className="text-xl font-semibold">₹{service.price}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Duration</p>
              <h3 className="text-xl font-semibold">{service.duration}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Status</p>

              <span
                className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                  service.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {service.isActive ? "Active" : "Inactive"}
              </span>

            </div>

          </div>

          <div className="mt-8">

            <h3 className="font-bold text-xl">
              Description
            </h3>

            <p className="mt-3 text-gray-600 leading-8">
              {service.description}
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div>

              <p className="text-gray-500 text-sm">
                Created
              </p>

              <p>
                {service.createdAt
                  ? new Date(service.createdAt).toLocaleDateString()
                  : "-"}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Last Updated
              </p>













{/* SERVICE MANAGEMENT */}

<div className="mt-10 border-t pt-8">

<h2 className="text-2xl font-bold">
Service Management
</h2>


  <p className="text-gray-500 mt-2">
    Manage this service from one place.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">

    {/* Edit */}

    <button
onClick={()=>setEditMode(!editMode)}
className="
bg-blue-600
text-white
rounded-xl
py-4
font-semibold
hover:bg-blue-700
transition
"
>
✏ Edit Service
</button>
















{
editMode && (

<div className="mt-8 bg-gray-50 rounded-2xl p-6 space-y-4">

<h3 className="text-xl font-bold">
Edit Service
</h3>


<input
className="w-full p-3 rounded-xl border"
placeholder="Service name"
/>


<input
className="w-full p-3 rounded-xl border"
placeholder="Category"
/>


<button
className="
bg-black
text-white
px-6
py-3
rounded-xl
"
>
Save Changes
</button>


</div>

)
}









    <button
onClick={()=>setShowPrice(!showPrice)}
className="
bg-green-600
text-white
rounded-xl
py-4
font-semibold
hover:bg-green-700
transition
"
>
💰 Update Price
</button>
  

  {
showPrice && (

<div className="mt-5 bg-green-50 p-6 rounded-2xl">

<h3 className="font-bold">
Update Price
</h3>


<input
value={price}
onChange={(e)=>setPrice(e.target.value)}
className="mt-3 p-3 rounded-xl border w-full"
/>


<button
className="
mt-4
bg-green-600
text-white
px-5
py-2
rounded-xl
"
>
Save Price
</button>


</div>

)
}

    <button
onClick={()=>setShowDuration(!showDuration)}
className="
bg-purple-600
text-white
rounded-xl
py-4
font-semibold
hover:bg-purple-700
transition
"
>
⏱ Update Duration
</button>


{
showDuration && (

<div className="mt-5 bg-purple-50 p-6 rounded-2xl">

<h3 className="font-bold">
Update Duration
</h3>


<input
value={duration}
onChange={(e)=>setDuration(e.target.value)}
className="mt-3 p-3 rounded-xl border w-full"
/>


<button
className="
mt-4
bg-purple-600
text-white
px-5
py-2
rounded-xl
"
>
Save Duration
</button>


</div>

)
}



<button
onClick={()=>setShowDescription(!showDescription)}
className="
bg-indigo-600
text-white
rounded-xl
py-4
font-semibold
hover:bg-indigo-700
transition
"
>
📝 Update Description
</button>


 <button
className="
bg-orange-500
text-white
rounded-xl
py-4
font-semibold
hover:bg-orange-600
transition
"
>
🖼 Change Image
</button>



{
showDescription && (

<div className="mt-5 bg-indigo-50 p-6 rounded-2xl">

<h3 className="font-bold">
Update Description
</h3>


<textarea
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="
mt-3
p-3
rounded-xl
border
w-full
h-32
"
/>


<button
className="
mt-4
bg-indigo-600
text-white
px-5
py-2
rounded-xl
"
>
Save Description
</button>


</div>

)
}



<button
className="
bg-yellow-500
text-white
rounded-xl
py-4
font-semibold
hover:bg-yellow-600
transition
"
>
{
service.isActive
?
"🔴 Deactivate Service"
:
"🟢 Activate Service"
}
</button>


<button
className="
xl:col-span-3
bg-red-600
text-white
rounded-xl
py-4
font-semibold
hover:bg-red-700
transition
"
>
🗑 Delete Service
</button>

</div>

</div>



















              <p>
                {service.updatedAt
                  ? new Date(service.updatedAt).toLocaleDateString()
                  : "-"}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}