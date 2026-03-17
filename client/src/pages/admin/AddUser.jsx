import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./AddUser.css";

function AddUser(){

const navigate = useNavigate();

const [form,setForm] = useState({

name:"",
email:"",
password:"",
mobile:"",

permissions:{
category:false,
subcategory:false,
addCollege:false,
blogs:false,
users:false
}

});

const handleChange = (e)=>{

setForm({

...form,
[e.target.name]:e.target.value

});

};

const handlePermission = (e)=>{

setForm({

...form,

permissions:{
...form.permissions,
[e.target.name]:e.target.checked
}

});

};


const addUser = async(e)=>{

e.preventDefault();

await axios.post("https://shiksha18.onrender.com/api/users/add",form);

alert("User Added Successfully");

navigate("/admin/users");

};


return(

<div className="add-user-page">

<h2>Add User</h2>

<form onSubmit={addUser}>

<div className="form-group">

<label>User Name</label>

<input
type="text"
name="name"
value={form.name}
onChange={handleChange}
/>

</div>


<div className="form-group">

<label>User Email</label>

<input
type="email"
name="email"
value={form.email}
onChange={handleChange}
/>

</div>


<div className="form-group">

<label>Password</label>

<input
type="password"
name="password"
value={form.password}
onChange={handleChange}
/>

</div>


<div className="form-group">

<label>Mobile</label>

<input
type="text"
name="mobile"
value={form.mobile}
onChange={handleChange}
/>

</div>


<h3>Select a Type</h3>

<div className="permissions">

<label>

<input
type="checkbox"
name="category"
onChange={handlePermission}
/>

Category

</label>


<label>

<input
type="checkbox"
name="subcategory"
onChange={handlePermission}
/>

Sub Category

</label>


<label>

<input
type="checkbox"
name="addCollege"
onChange={handlePermission}
/>

Add University/College

</label>


<label>

<input
type="checkbox"
name="blogs"
onChange={handlePermission}
/>

Blogs

</label>


<label>

<input
type="checkbox"
name="users"
onChange={handlePermission}
/>

Users

</label>

</div>


<button className="submit-btn">

+ Add User

</button>

</form>

</div>

);

}

export default AddUser;