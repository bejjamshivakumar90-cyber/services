"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import API_URL from "@/lib/api";


interface Customer {

  _id:string;
  name:string;
  email:string;
  phone:string;
  createdAt:string;

}



export default function CustomersPage(){

const [customers,setCustomers]=useState<Customer[]>([]);
const [loading,setLoading]=useState(true);
const [search, setSearch] = useState("");
const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);



useEffect(()=>{

loadCustomers();

},[]);



useEffect(() => {
  const keyword = search.toLowerCase().trim();

  const results = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      customer.phone.includes(keyword) ||
      customer._id.toLowerCase().includes(keyword)
    );
  });

  setFilteredCustomers(results);
}, [search, customers]);



async function loadCustomers(){

try{

const token=Cookies.get("token");


const res=await fetch(
`${API_URL}/auth/users`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


const data=await res.json();


if(data.success){

const customerList = data.users.filter(
  (user: any) => user?.role === "customer"
);

setCustomers(customerList);
setFilteredCustomers(customerList);

}


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


}




if(loading){

return(
<div className="p-8">
Loading customers...
</div>
)

}





return(

<div className="space-y-8 px-3 sm:px-5 lg:px-8">


<div>

<h1 className="
text-3xl
font-bold
">
Customers
</h1>


<p className="
text-gray-500
mt-2
">
Manage your registered customers
</p>

<div className="mt-6">
  <input
    type="text"
    placeholder="🔍 Search by Name, Email, Phone or Customer ID..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      rounded-2xl
      border
      border-gray-200
      bg-white
      px-5
      py-4
      text-sm
      shadow-sm
      focus:outline-none
      focus:ring-2
      focus:ring-indigo-500
      focus:border-indigo-500
      transition
    "
  />
</div>


</div>





<div className="
bg-white
rounded-2xl
shadow
p-6
">

<p className="
text-gray-500
text-sm
">
Total Customers
</p>


<h2 className="
text-4xl
font-bold
mt-2
">

{customers.length}

</h2>


</div>






<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
">



{
filteredCustomers.map((customer) => (


<div
key={customer._id}
className="
bg-white
rounded-2xl
shadow-md
hover:shadow-xl
transition
p-6
"
>



<div className="
flex
items-center
gap-4
">


<div className="
w-14
h-14
rounded-full
bg-black
text-white
flex
items-center
justify-center
font-bold
text-xl
">

{
customer.name
.charAt(0)
.toUpperCase()
}

</div>



<div>

<h2 className="
font-bold
text-lg
">

{customer.name}

</h2>


<p className="
text-sm
text-gray-500
">
Customer
</p>


</div>



</div>





<div className="
mt-5
space-y-2
text-sm
text-gray-600
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
new Date(customer.createdAt)
.toLocaleDateString()
}
</p>







</div>

{filteredCustomers.length === 0 && (
  <div className="text-center py-16">

    <h2 className="text-xl font-semibold text-gray-600">
      No customer found
    </h2>

    <p className="text-gray-400 mt-2">
      Try searching by Name, Email, Phone or Customer ID.
    </p>

  </div>
)}




<Link
href={`/customers/${customer._id}`}
>

<button
className="
mt-6
w-full
bg-black
text-white
py-3
rounded-xl
hover:opacity-90
transition
"
>

View Profile

</button>


</Link>



</div>



))
}



</div>



</div>


)

}