import { useEffect, useState } from "react";
import axios from "axios";

function AdminContact() {

const [contacts,setContacts] = useState([]);

useEffect(()=>{
fetchContacts();
},[]);

const fetchContacts = async()=>{

try{

const res = await axios.get("https://shiksha18.onrender.com/api/contact");

setContacts(res.data);

}catch(err){
console.log(err);
}

};

return(

<div className="p-8 w-full">

<h2 className="text-3xl font-bold text-gray-800 mb-6">
Contact Enquiries
</h2>

<div className="bg-white shadow-lg rounded-xl overflow-hidden">

  {/* RESPONSIVE WRAPPER */}
  <div className="overflow-x-auto">

    <table className="min-w-[700px] w-full text-left border-collapse">

      <thead className="bg-gray-100">

        <tr className="text-gray-700">

          <th className="p-4">Name</th>
          <th className="p-4">Email</th>
          <th className="p-4">Phone</th>
          <th className="p-4">Message</th>
          <th className="p-4">Date</th>

        </tr>

      </thead>

      <tbody>

        {contacts.map((c,index)=>(
          <tr
          key={c._id}
          className={`border-t hover:bg-gray-50 ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
          }`}
          >

            <td className="p-4 font-medium">{c.name}</td>
            <td className="p-4">{c.email}</td>
            <td className="p-4">{c.phone}</td>
            <td className="p-4">{c.message}</td>
            <td className="p-4">
              {new Date(c.createdAt).toLocaleDateString()}
            </td>

          </tr>
        ))}

      </tbody>

    </table>

  </div>

</div>

</div>

);

}

export default AdminContact;