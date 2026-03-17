import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminEnquiries.css";

function AdminEnquiries() {

const [enquiries,setEnquiries] = useState([]);

useEffect(()=>{
fetchEnquiries();
},[]);

const fetchEnquiries = async () => {

const res = await axios.get(
"https://shiksha18.onrender.com/api/enquiries"
);

setEnquiries(res.data);

};

const deleteEnquiry = async (id) => {

const confirmDelete = window.confirm("Delete this enquiry?");

if(!confirmDelete) return;

await axios.delete(
`https://shiksha18.onrender.com/api/enquiries/${id}`
);

fetchEnquiries();

};

return(

<div className="enquiry-page">

<h1 className="page-title">Student Enquiries</h1>

<div className="table-wrapper">

<table className="enquiry-table">

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Course</th>
<th>College</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{enquiries.length === 0 ? (

<tr>
<td colSpan="6" className="no-data">
No enquiries yet
</td>
</tr>

) : (

enquiries.map((e)=>(
<tr key={e._id}>

<td>{e.name}</td>
<td>{e.email}</td>
<td>{e.phone}</td>
<td>{e.course}</td>
<td>{e.college}</td>

<td>
<button
className="delete-btn"
onClick={() => deleteEnquiry(e._id)}
>
Delete
</button>
</td>

</tr>
))

)}

</tbody>

</table>

</div>

</div>

);

}

export default AdminEnquiries;