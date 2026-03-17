import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import { useState } from "react";

function UserLayout() {

const [open,setOpen] = useState(false);

return (

<div className="flex min-h-screen bg-gray-100">



{/* SIDEBAR */}
<div className={`
${open ? "translate-x-0" : "-translate-x-full"}
fixed lg:static top-0 left-0 h-full z-40
lg:translate-x-0 transition-transform duration-300
lg:w-64
`}>
<UserSidebar />
</div>

{/* OVERLAY */}
{open && (
<div 
className="fixed inset-0 bg-black/30 lg:hidden"
onClick={()=>setOpen(false)}
></div>
)}

{/* CONTENT */}
<div className="flex-1 p-4 sm:p-6 lg:p-8 w-full">

{/* MOBILE HEADER */}
<div className="flex justify-between items-center mb-4 lg:hidden">
  
  <h1 className="text-2xl font-bold">
    Dashboard
  </h1>

  <button
    onClick={()=>setOpen(!open)}
    className="bg-blue-600 text-white px-3 py-2 rounded"
  >
    ☰
  </button>

</div>

<Outlet />

</div>

</div>

);

}

export default UserLayout;