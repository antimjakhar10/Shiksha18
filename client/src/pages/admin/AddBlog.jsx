import {useState} from "react";
import axios from "axios";
import "./AddBlog.css";

function AddBlog(){

const [title,setTitle] = useState("");
const [slug,setSlug] = useState("");
const [category,setCategory] = useState("");
const [description,setDescription] = useState("");
const [image,setImage] = useState("");
const [status,setStatus] = useState("approved");
const [content,setContent] = useState("");


const generateSlug = (text) => {

return text
.toLowerCase()
.replace(/ /g,"-")
.replace(/[^\w-]+/g,"");

};


// upload image
const uploadImage = async(e)=>{

const file = e.target.files[0];

const formData = new FormData();

formData.append("image",file);

const res = await axios.post("https://shiksha18.onrender.com/upload",formData);

setImage(res.data.image);

};


// add blog
const addBlog = async(e)=>{

e.preventDefault();

await axios.post("https://shiksha18.onrender.com/api/blogs/add",{

title,
slug,
category,
description,
content,
image,
status

});

alert("Blog Added Successfully");

};


return(

<div className="add-blog-page">

<h2 className="blog-title">Add Blogs</h2>

<div className="blog-card">

<form className="blog-form" onSubmit={addBlog}>

<div className="blog-form-group">

<label>Blog Image</label>

<input
className="blog-input"
type="file"
onChange={uploadImage}
/>

</div>


<div className="blog-form-group">

<label>Title</label>

<input
className="blog-input"
type="text"
placeholder="Enter Your Title"
value={title}
onChange={(e)=>{
setTitle(e.target.value);
setSlug(generateSlug(e.target.value));
}}
/>

</div>


<div className="blog-form-group">

<label>URL</label>

<input
className="blog-input"
type="text"
value={slug}
readOnly
/>

</div>


<div className="blog-form-group">

<label>Select Category</label>

<select
className="blog-input"
value={category}
onChange={(e)=>setCategory(e.target.value)}
>

<option>UG PG</option>
<option>Engineering</option>
<option>MBA</option>

</select>

</div>


<div className="blog-form-group">

<label>Status</label>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option value="approved">Approved</option>
<option value="pending">Pending</option>
<option value="rejected">Rejected</option>

</select>

</div>


<div className="blog-form-group">

<label>Description</label>

<textarea
className="blog-textarea"
rows="8"
placeholder="Enter blog description..."
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

</div>

<div className="blog-form-group">

<label>Blog Content</label>

<textarea
className="blog-textarea"
rows="12"
placeholder="Write full blog article..."
value={content}
onChange={(e)=>setContent(e.target.value)}
/>

</div>


<button
className="add-blog-btn"
type="submit">

Add New Blogs

</button>

</form>

</div>
</div>
);

}

export default AddBlog;