"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";


interface Technician {

  _id: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  experience?: number;
  services?: string[];
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isVerified: boolean;
  isAvailable: boolean;
  rating?: number;

}


export default function TechnicianDetailsPage() {

  const params = useParams();

  const id = params.id as string;


  const [technician, setTechnician] = useState<Technician | null>(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    if(id){
      loadTechnician();
    }

  },[id]);



  const loadTechnician = async()=>{

    try{

      const response = await fetch(
        `http://localhost:5000/api/technicians/${id}`
      );


      const data = await response.json();


      if(data.success){

        setTechnician(data.technician);

      }


    }
    catch(error){

      console.log(
        "Error loading technician",
        error
      );

    }
    finally{

      setLoading(false);

    }

  };




  if(loading){

    return (

      <div className="p-8 text-center">
        Loading technician details...
      </div>

    );

  }




  if(!technician){

    return (

      <div className="p-8 text-center">

        Technician not found

      </div>

    );

  }





  return (

    <div className="p-6">


      {/* Header */}

      <div className="flex justify-between items-center mb-6">


        <div>

          <h1 className="text-3xl font-bold">
            Technician Details
          </h1>

          <p className="text-gray-500">
            View and manage technician information
          </p>

        </div>



        <Link
          href="/technicians"
          className="border px-4 py-2 rounded-lg hover:bg-gray-100"
        >

          Back

        </Link>


      </div>





      {/* Profile Card */}

      <div className="bg-white rounded-xl shadow p-6">


        <div className="grid md:grid-cols-2 gap-6">


          <div>

            <h2 className="text-xl font-semibold mb-4">
              Personal Information
            </h2>


            <p>
              <b>Name:</b> {technician.name}
            </p>


            <p>
              <b>Email:</b> {technician.email}
            </p>


            <p>
              <b>Phone:</b> {technician.phone}
            </p>


            <p>
              <b>Profession:</b> {technician.profession}
            </p>


            <p>
              <b>Experience:</b>{" "}
              {technician.experience || 0} years
            </p>


          </div>






          <div>


            <h2 className="text-xl font-semibold mb-4">
              Location
            </h2>


            <p>
              <b>Address:</b>{" "}
              {technician.address || "-"}
            </p>


            <p>
              <b>City:</b>{" "}
              {technician.city || "-"}
            </p>


            <p>
              <b>State:</b>{" "}
              {technician.state || "-"}
            </p>


            <p>
              <b>Pincode:</b>{" "}
              {technician.pincode || "-"}
            </p>


          </div>



        </div>






        {/* Status */}


        <div className="mt-8 border-t pt-6">


          <h2 className="text-xl font-semibold mb-4">
            Status
          </h2>



          <div className="flex gap-4 flex-wrap">


            <span
              className={`px-4 py-2 rounded-full ${
                technician.isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
            >

              {
                technician.isAvailable
                ? "Available"
                : "Offline"
              }

            </span>



            <span
              className={`px-4 py-2 rounded-full ${
                technician.isVerified
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
              }`}
            >

              {
                technician.isVerified
                ? "Verified"
                : "Not Verified"
              }

            </span>



            <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700">

              ⭐ {technician.rating || 0}

            </span>



          </div>


        </div>







        {/* Services */}


        <div className="mt-8 border-t pt-6">


          <h2 className="text-xl font-semibold mb-4">
            Services Offered
          </h2>



          {

            technician.services &&
            technician.services.length > 0

            ?

            (

              <div className="flex gap-2 flex-wrap">


                {
                  technician.services.map(
                    (service,index)=>(

                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-lg"
                    >

                      {service}

                    </span>

                    )
                  )
                }


              </div>

            )

            :

            <p className="text-gray-500">
              No services added
            </p>


          }



        </div>




      </div>





      {/* Actions */}

      <div className="mt-6 flex gap-4">


        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Edit Technician
        </button>



        <button
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
        >
          Delete Technician
        </button>


      </div>



    </div>

  );

}