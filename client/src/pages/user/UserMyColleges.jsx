import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserMyColleges(){

const [colleges,setColleges] = useState([]);

useEffect(()=>{
fetchData();
},[]);

const fetchData = async()=>{
const user = JSON.parse(localStorage.getItem("user"));

const res = await axios.get(
  `https://shiksha18.onrender.com/api/colleges/user/${user.id}`
);

setColleges(res.data);
};

return(
<div style={{padding:"20px"}}>

<h2>My Colleges</h2>

{colleges.map(c=>(
<div key={c._id} style={{
border:"1px solid #ddd",
padding:"15px",
marginBottom:"10px",
borderRadius:"8px"
}}>

<h3>{c.name}</h3>
<p>{c.location}</p>

{/* STATUS */}
<p>
Status: 
<span style={{
color:
c.status==="approved"?"green":
c.status==="pending"?"orange":"red"
}}>
 {c.status}
</span>
</p>

{/* EDIT */}
<Link to={`/user/edit/${c._id}`}>
<button>Edit</button>
</Link>

</div>
))}

</div>
);
}

export default UserMyColleges;