"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Technician {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  experience?: number;
  city?: string;
  state?: string;
  isVerified: boolean;
  isAvailable: boolean;
}


export default function TechniciansPage() {


const [technicians,setTechnicians] = useState<Technician[]>([]);

const [loading,setLoading] = useState(true);

const [showAddModal,setShowAddModal] = useState(false);



const [form,setForm] = useState({

name:"",
email:"",
phone:"",
password:"",
profession:"",
experience:"",
city:"",
state:""

});

const [photo, setPhoto] = useState<File | null>(null);


const router = useRouter();



useEffect(()=>{

loadTechnicians();

},[]);




const loadTechnicians = async()=>{

try{

const res = await fetch(
"http://localhost:5000/api/technicians"
);


const data = await res.json();


if(data.success){

setTechnicians(data.technicians);

}


}
catch(err){

console.log(err);

}
finally{

setLoading(false);

}

};





const handleChange=(e:any)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};







const addTechnician = async()=>{


try{


const res = await fetch(
"http://localhost:5000/api/technicians",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

}

);



const data = await res.json();



if(data.success){


alert("Technician added successfully");


setShowAddModal(false);
setPhoto(null);


setForm({

name:"",
email:"",
phone:"",
password:"",
profession:"",
experience:"",
city:"",
state:""

});


loadTechnicians();


}


}
catch(err){

console.log(err);

}



};







if(loading){

return <div className="p-8">
Loading...
</div>

}







return (

<div className="p-6">


<div className="flex justify-between items-center mb-6">

  <div>
    <h1 className="text-3xl font-bold">
      Technicians
    </h1>

    <p className="text-gray-500">
      Manage technicians
    </p>
  </div>



  <div className="flex gap-3">

    <button
      onClick={() => router.back()}
      className="border px-5 py-2 rounded-lg hover:bg-gray-100"
    >
      ← Back
    </button>


    <button
      onClick={() => setShowAddModal(true)}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
    >
      + Add Technician
    </button>

  </div>

</div>







<div className="bg-white rounded-xl shadow overflow-hidden">


<table className="w-full">


<thead className="bg-gray-100">

<tr>

<th className="p-4 text-left">
Name
</th>

<th className="p-4 text-left">
Profession
</th>

<th className="p-4 text-left">
Phone
</th>

<th className="p-4 text-left">
Status
</th>


</tr>

</thead>



<tbody>


{
technicians.map((tech)=>(


<tr
key={tech._id}
className="border-b"
>


<td className="p-4">
{tech.name}
</td>


<td className="p-4">
{tech.profession}
</td>


<td className="p-4">
{tech.phone}
</td>


<td className="p-4">

{
tech.isAvailable
?
"Available"
:
"Offline"
}

</td>



</tr>


))

}



</tbody>


</table>


</div>







{/* ADD TECHNICIAN POPUP */}


{

showAddModal &&

<div className="fixed inset-0 bg-black/50 flex items-center justify-center">


<div className="bg-white w-full max-w-lg rounded-xl p-6">


<div className="flex justify-between mb-5">


<h2 className="text-xl font-bold">
Add Technician
</h2>


<button
onClick={()=>setShowAddModal(false)}
>
✕
</button>


</div>





<div className="grid gap-3">


<input
name="name"
placeholder="Name"
value={form.name}
onChange={handleChange}
className="border p-2 rounded"
/>



<input
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
className="border p-2 rounded"
/>



<input
name="phone"
placeholder="Phone"
value={form.phone}
onChange={handleChange}
className="border p-2 rounded"
/>



<input
name="password"
placeholder="Password"
type="password"
value={form.password}
onChange={handleChange}
className="border p-2 rounded"
/>



<input
name="profession"
placeholder="Profession"
value={form.profession}
onChange={handleChange}
className="border p-2 rounded"
/>



<input
name="experience"
placeholder="Experience"
value={form.experience}
onChange={handleChange}
className="border p-2 rounded"
/>



<input
name="city"
placeholder="City"
value={form.city}
onChange={handleChange}
className="border p-2 rounded"
/>



<input
name="state"
placeholder="State"
value={form.state}
onChange={handleChange}
className="border p-2 rounded"
/>

<input
type="file"
accept="image/*"
onChange={(e) =>
  setPhoto(e.target.files?.[0] || null)
}
className="border p-2 rounded"
/>

<button

onClick={addTechnician}

className="bg-blue-600 text-white p-3 rounded-lg mt-3"

>

Save Technician

</button>



</div>


</div>


</div>


}



</div>


);

}