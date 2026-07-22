"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import API_URL from "@/lib/api";
import { useRouter } from "next/navigation";


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
const [filter, setFilter] = useState("");
const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
const router = useRouter();



useEffect(()=>{

loadCustomers();

},[]);
















useEffect(() => {
  const keyword = search.toLowerCase().trim();

  let results = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      customer.phone.includes(keyword) ||
      customer._id.toLowerCase().includes(keyword)
    );
  });

  if (filter === "new") {
    const today = new Date();

    results = results.filter((customer) => {
      const joined = new Date(customer.createdAt);

      const diff =
        (today.getTime() - joined.getTime()) /
        (1000 * 60 * 60 * 24);

      return diff <= 30;
    });
  }

  setFilteredCustomers(results);

}, [search, filter, customers]);





















[search, customers]


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








<div className="mt-4">
  <button
    onClick={() => router.back()}
    className="
      px-5
      py-3
      rounded-xl
      border
      bg-white
      hover:bg-gray-100
      transition
      font-medium
    "
  >
    ← Back
  </button>
</div>








<div className="flex flex-wrap gap-3 mt-5">

  {[
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "frequent", label: "Frequent" },
    { key: "nobookings", label: "No Bookings" },
  ].map((item) => (

    <button
      key={item.key}
      onClick={() => setFilter(item.key)}
      className={`
        px-5
        py-2.5
        rounded-full
        text-sm
        font-semibold
        transition-all
        duration-300
        ${
          filter === item.key
            ? "bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-lg"
            : "bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700"
        }
      `}
    >
      {item.label}
    </button>

  ))}

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
group
relative
overflow-hidden
bg-white
rounded-2xl
border
border-slate-200
shadow-md
p-6
transition-all
duration-500
hover:-translate-y-2
hover:shadow-2xl
hover:border-indigo-300
before:absolute
before:inset-0
before:bg-gradient-to-r
before:from-indigo-600
before:via-violet-600
before:to-cyan-500
before:opacity-0
before:transition-opacity
before:duration-500
hover:before:opacity-10
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
bg-gradient-to-r
from-indigo-600
via-violet-600
to-cyan-500
hover:from-violet-600
hover:to-indigo-700
hover:shadow-lg
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





<Link
href={`/customers/${customer._id}`}
>

<button
className="
mt-6
w-full
bg-gradient-to-br
from-indigo-600
via-violet-600
to-cyan-500
shadow-lg
group-hover:scale-110
group-hover:rotate-6
transition-all
duration-500
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