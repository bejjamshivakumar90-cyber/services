"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import API_URL from "@/lib/api";
import StatusModal from "@/components/bookings/StatusModal";
import AssignTechnicianModal from "@/components/bookings/AssignTechnicianModal";
import RescheduleModal from "@/components/bookings/RescheduleModal";
import CancelBookingModal from "@/components/bookings/CancelBookingModal";
import DeleteBookingModal from "@/components/bookings/DeleteBookingModal";

interface Booking {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  serviceName: string;
  description?: string;
  bookingDate: string;
  bookingTime: string;
  status: string;
  totalAmount?: number;
  createdAt?: string;
  technician?: {
    _id: string;
    name: string;
  };
}


export default function BookingDetailsPage(){

  const params = useParams();

  const router = useRouter();


  const [booking,setBooking] = useState<Booking | null>(null);

  const [loading,setLoading] = useState(true);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

 useEffect(() => {
  loadBooking();
  loadTechnicians();
}, []);









async function assignTechnician(technicianId: string) {
  try {
    const token = Cookies.get("token");

    const res = await fetch(
      `${API_URL}/bookings/${booking?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          technician: technicianId,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setBooking(data.booking);

      alert("Technician assigned successfully.");

      await loadBooking();
    } else {
      alert(data.message || "Assignment failed.");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
}














  async function loadBooking(){

    try{

      const token = Cookies.get("token");


      const res = await fetch(
        `${API_URL}/bookings/${params.id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      const data = await res.json();


      if(data.success){

        setBooking(data.booking);

      }


    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  }




















  async function loadTechnicians() {
  try {
    const token = Cookies.get("token");

    const res = await fetch(
      `${API_URL}/technicians`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      setTechnicians(data.technicians);
    }
  } catch (error) {
    console.log(error);
  }
}





























  async function updateBooking(updatedFields: any) {
  try {
    const token = Cookies.get("token");

    const res = await fetch(
      `${API_URL}/bookings/${booking?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      }
    );

    const data = await res.json();

    if (data.success) {
      setBooking(data.booking);

      alert("Booking updated successfully");

      await loadBooking();
    } else {
      alert(data.message || "Update failed");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
}





async function cancelBooking() {

  await updateBooking({

    status: "Cancelled",

  });

}









async function deleteBooking() {

  try {

    const token = Cookies.get("token");

    const res = await fetch(

      `${API_URL}/bookings/${booking?._id}`,

      {

        method: "DELETE",

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }

    );

    const data = await res.json();

    if (data.success) {

      alert("Booking deleted successfully.");

      router.push("/bookings");

    } else {

      alert(data.message || "Delete failed.");

    }

  } catch (error) {

    console.error(error);

    alert("Something went wrong.");

  }

}












  if(loading){

    return(

      <div className="p-10 text-center">

        Loading booking...

      </div>

    );

  }



  if(!booking){

    return(

      <div className="p-10 text-center">

        Booking not found

      </div>

    );

  }



return(

<div className="max-w-6xl mx-auto px-5 py-8 space-y-8">


{/* Header */}

<div className="flex justify-between items-center">


<div>

<h1 className="text-4xl font-bold">

Booking Details

</h1>


<p className="text-gray-500 mt-2">

Manage customer booking

</p>


</div>



<button

onClick={()=>router.back()}

className="
px-5
py-3
rounded-xl
border
hover:bg-gray-100
"

>

← Back

</button>


</div>





{/* Booking Information */}


<div className="bg-white rounded-3xl shadow p-8">


<h2 className="text-2xl font-bold mb-6">

Booking Information

</h2>



<div className="grid md:grid-cols-2 gap-6">


<div>

<p className="text-gray-500">
Customer
</p>

<p className="font-semibold">
{booking.name}
</p>

</div>



<div>

<p className="text-gray-500">
Service
</p>

<p className="font-semibold">
{booking.serviceName}
</p>

</div>



<div>

<p className="text-gray-500">
Date
</p>

<p className="font-semibold">

{new Date(
booking.bookingDate
).toLocaleDateString()}

</p>

</div>



<div>

<p className="text-gray-500">
Time
</p>

<p className="font-semibold">

{booking.bookingTime}

</p>

</div>



<div>

<p className="text-gray-500">
Amount
</p>

<p className="font-semibold">

₹{booking.totalAmount ?? 0}

</p>

</div>



<div>

<p className="text-gray-500">
Status
</p>


<span
className="
inline-block
px-4
py-2
rounded-full
bg-blue-100
text-blue-700
"
>

{booking.status}

</span>


</div>



</div>


</div>





{/* Customer Details */}


<div className="bg-white rounded-3xl shadow p-8">


<h2 className="text-2xl font-bold mb-5">

Customer Details

</h2>


<p>

📧 {booking.email || "-"}

</p>


<p className="mt-2">

📞 {booking.phone || "-"}

</p>


</div>





{/* Description */}


<div className="bg-white rounded-3xl shadow p-8">


<h2 className="text-2xl font-bold">

Problem Description

</h2>


<p className="mt-4 text-gray-600">

{booking.description || "No description"}

</p>


</div>









{/* Booking Management */}

<div className="bg-white rounded-3xl shadow p-8">

  <h2 className="text-2xl font-bold">
    Booking Management
  </h2>

  <p className="text-gray-500 mt-2">
    Manage this booking from one place.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">

    <button
      onClick={() => setShowStatusModal(true)}
      className="
      bg-gradient-to-r
      from-blue-600
      to-indigo-600
      text-white
      rounded-2xl
      py-4
      font-semibold
      hover:opacity-90
      transition
      "
    >
      📌 Change Status
    </button>

    <button
  onClick={() => setShowAssignModal(true)}
  className="
    bg-gradient-to-r
    from-green-500
    to-emerald-600
    hover:from-green-600
    hover:to-emerald-700
    text-white
    rounded-2xl
    py-4
    font-semibold
    shadow-lg
    hover:shadow-xl
    transition-all
    duration-300
  "
>
  👨‍🔧 Assign Technician
</button>

    <button
  onClick={() => setShowRescheduleModal(true)}
  className="
    bg-gradient-to-r
    from-blue-500
    to-indigo-600
    hover:from-blue-600
    hover:to-indigo-700
    text-white
    rounded-2xl
    py-4
    font-semibold
    shadow-lg
    hover:shadow-xl
    transition-all
    duration-300
  "
>
  📅 Reschedule Booking
</button>

    <button
  onClick={() => setShowCancelModal(true)}
  className="
    bg-gradient-to-r
    from-red-500
    to-rose-600
    hover:from-red-600
    hover:to-rose-700
    text-white
    rounded-2xl
    py-4
    font-semibold
    shadow-lg
    hover:shadow-xl
    transition-all
    duration-300
  "
>
  ❌ Cancel Booking
</button>

    <button
  onClick={() => setShowDeleteModal(true)}
  className="
    bg-gradient-to-r
    from-red-700
    to-red-900
    hover:from-red-800
    hover:to-black
    text-white
    rounded-2xl
    py-4
    font-semibold
    shadow-lg
    hover:shadow-xl
    transition-all
    duration-300
  "
>
  🗑 Delete Booking
</button>
  </div>

</div>















<div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

  <h2 className="text-2xl font-bold mb-6">
    Booking Timeline
  </h2>

  <div className="space-y-6">

    <div className="flex gap-4">

      <div className="w-4 h-4 mt-2 rounded-full bg-blue-500"></div>

      <div>

        <p className="font-semibold">
          Booking Created
        </p>

        <p className="text-sm text-gray-500">
          {booking?.createdAt
            ? new Date(booking.createdAt).toLocaleString()
            : "-"}
        </p>

      </div>

    </div>

    <div className="flex gap-4">

      <div
        className={`w-4 h-4 mt-2 rounded-full ${
          booking?.status === "Completed"
            ? "bg-green-500"
            : booking?.status === "Cancelled"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      ></div>

      <div>

        <p className="font-semibold">
          Current Status
        </p>

        <p className="text-sm text-gray-500">
          {booking?.status}
        </p>

      </div>

    </div>

    {booking?.technician && (

      <div className="flex gap-4">

        <div className="w-4 h-4 mt-2 rounded-full bg-indigo-500"></div>

        <div>

          <p className="font-semibold">
            Technician Assigned
          </p>

          <p className="text-sm text-gray-500">
            {booking.technician.name}
          </p>

        </div>

      </div>

    )}

  </div>

</div>














<StatusModal
  open={showStatusModal}
  booking={booking}
  onClose={() => setShowStatusModal(false)}
  onSave={updateBooking}
/>








<AssignTechnicianModal
  open={showAssignModal}
  booking={booking}
  technicians={technicians}
  onClose={() => setShowAssignModal(false)}
  onAssign={assignTechnician}
/>


<RescheduleModal
  open={showRescheduleModal}
  booking={booking}
  onClose={() => setShowRescheduleModal(false)}
  onSave={updateBooking}
/>





<CancelBookingModal
  open={showCancelModal}
  booking={booking}
  onClose={() => setShowCancelModal(false)}
  onSave={cancelBooking}
/>


<DeleteBookingModal
  open={showDeleteModal}
  booking={booking}
  onClose={() => setShowDeleteModal(false)}
  onDelete={deleteBooking}
/>





</div>

);


}