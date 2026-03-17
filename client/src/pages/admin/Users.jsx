import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaEye } from "react-icons/fa";
import "./Users.css";

function Users() {

const navigate = useNavigate();

const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");


// FETCH USERS
const fetchUsers = async () => {

try{

const res = await axios.get("https://shiksha18.onrender.com/api/users");

setUsers(res.data);

}catch(err){

console.log("Error fetching users",err);

}

};


useEffect(()=>{

fetchUsers();

},[]);


// DELETE USER
const deleteUser = async(id)=>{

if(!window.confirm("Are you sure you want to delete this user?")) return;

try{

await axios.delete(`https://shiksha18.onrender.com/api/users/${id}`);

fetchUsers();

}catch(err){

console.log("Delete error",err);

}

};


// USER WORK PERMISSIONS
const getUserWork = (permissions)=>{

if(!permissions) return "None";

let work = [];

if(permissions.category) work.push("Category");

if(permissions.subcategory) work.push("Sub Category");

if(permissions.addCollege) work.push("Add College");

if(permissions.blogs) work.push("Blogs");

if(permissions.users) work.push("Users");

return work.length ? work.join(", ") : "None";

};


return(

<div className="users-page">

{/* HEADER */}

<div className="users-header">

<h1>Users List</h1>

<div className="users-actions">

<input
type="text"
placeholder="Search user..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<button
className="add-user-btn"
onClick={()=>navigate("/admin/add-user")}
>
+ Add New Users
</button>

</div>

</div>


{/* TABLE */}

<div className="users-table-card">

<table>

<thead>

<tr>
<th>ID</th>
<th>User Name</th>
<th>Email</th>
<th>Mobile</th>
<th>User Work</th>
<th>Report</th>
<th>Delete</th>
</tr>

</thead>


<tbody>

{users
.filter(user =>
user.name.toLowerCase().includes(search.toLowerCase())
)
.map((user,index)=>(

<tr key={user._id}>

<td>#{index+1}</td>

<td>{user.name}</td>

<td>{user.email}</td>

<td>{user.mobile || "-"}</td>

<td>{getUserWork(user.permissions)}</td>

<td>
<button className="report-btn">
<FaEye/> Report
</button>
</td>

<td>
<button
className="delete-btn"
onClick={()=>deleteUser(user._id)}
>
<FaTrash/>
</button>
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

}

export default Users;