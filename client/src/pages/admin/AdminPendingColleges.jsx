import { useEffect, useState } from "react";
import axios from "axios";

function AdminPendingColleges(){

const [colleges,setColleges] = useState([]);

useEffect(()=>{
fetchData();
},[]);

const fetchData = async()=>{
const res = await axios.get("https://shiksha18.onrender.com/api/colleges/pending/all");
setColleges(res.data);
};

const approve = async(id)=>{
await axios.put(`https://shiksha18.onrender.com/api/colleges/approve/${id}`);
fetchData();
};

const reject = async(id)=>{
await axios.put(`https://shiksha18.onrender.com/api/colleges/reject/${id}`);
fetchData();
};

return(
<div style={{padding:"20px"}}>

<h2>Pending Colleges</h2>

{colleges.map(c=>(
<div key={c._id} style={{border:"1px solid #ddd",padding:"10px",marginBottom:"10px"}}>

<h3>{c.name}</h3>
<p>{c.location}</p>

<button onClick={()=>approve(c._id)}>✅ Approve</button>
<button onClick={()=>reject(c._id)}>❌ Reject</button>

</div>
))}

</div>
);

}

export default AdminPendingColleges;