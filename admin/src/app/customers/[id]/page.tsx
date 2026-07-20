"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import API_URL from "@/lib/api";


interface Customer {

  _id:string;
  name:string;
  email:string;
  phone:string;
  role:string;
  createdAt:string;

}



export default function CustomerProfilePage(){


const params = useParams();

const id = params.id;


const [customer,setCustomer] = useState<Customer | null>(null);





const [stats, setStats] = useState({
  totalBookings: 0,
  completed: 0,
  cancelled: 0,
});



const [loading,setLoading] = useState(true);




useEffect(()=>{

if(id){

loadCustomer();

}

},[id]);





async function loadCustomer(){


try{


const token = Cookies.get("token");


const res = await fetch(
`${API_URL}/auth/users/${id}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const statsRes = await fetch(
  `${API_URL}/bookings/customer/${id}/stats`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

const statsData = await statsRes.json();

if (statsData.success) {
  setStats(statsData.stats);
}



const data = await res.json();



if(data.success){

setCustomer(data.user);

}



}
catch(error){

console.log(
"Customer profile error:",
error
);

}
finally{

setLoading(false);

}


}







if(loading){

return(

<div className="
p-8
text-center
text-gray-500
">

Loading customer profile...

</div>

)

}






if(!customer){

return(

<div className="
p-8
text-center
text-red-500
">

Customer not found

</div>

)

}







return(

<div className="
space-y-8
px-4
sm:px-6
lg:px-10
">



{/* Header */}


<div>


<h1 className="
text-3xl
font-bold
">

Customer Profile

</h1>


<p className="
text-gray-500
mt-2
">

View customer details

</p>


</div>








{/* Profile Card */}


<div className="
rounded-3xl
p-6
shadow-lg
border
border-white/40
bg-gradient-to-br
from-indigo-50
via-white
to-purple-50
">



<div className="
flex
items-center
gap-5
">



<div className="
w-20
h-20
rounded-full
bg-gradient-to-br
from-indigo-500
to-purple-600
flex
items-center
justify-center
text-white
text-3xl
font-bold
shadow-lg
">


{
customer.name
.charAt(0)
.toUpperCase()
}


</div>





<div>


<h2 className="
text-2xl
font-bold
">

{customer.name}

</h2>



<p className="
text-gray-500
">

Customer

</p>



</div>



</div>







<div className="
mt-6
space-y-3
text-gray-700
">


<p>
📧 {customer.email}
</p>


<p>
📞 {customer.phone}
</p>


<p>

📅 Joined:

{" "}

{
new Date(
customer.createdAt
)
.toLocaleDateString()
}

</p>



</div>



</div>








{/* Customer Statistics */}

<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
">

<InfoCard
  title="Total Bookings"
  value={String(stats.totalBookings)}
/>

<InfoCard
  title="Completed"
  value={String(stats.completed)}
/>

<InfoCard
  title="Cancelled"
  value={String(stats.cancelled)}
/>

  <InfoCard
    title="Total Spent"
    value="₹0"
  />

</div>







<div className="
rounded-3xl
bg-white
shadow-lg
p-6
">


<h2 className="
text-xl
font-bold
">

Recent Activity

</h2>


<p className="
text-gray-500
mt-3
">

Booking history will appear here.

</p>


</div>





</div>

)

}







function InfoCard(
{
title,
value
}:{
title:string;
value:string;
}

){


return(

<div className="
rounded-2xl
p-5
shadow-md
bg-gradient-to-br
from-blue-50
to-white
border
border-blue-100
">


<p className="
text-gray-500
text-sm
">

{title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{value}

</h2>


</div>

)


}