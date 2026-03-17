import {useState,useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import "./EditBlog.css";

function EditBlog(){

const {id} = useParams();
const navigate = useNavigate();

const [title,setTitle] = useState("");
const [slug,setSlug] = useState("");
const [category,setCategory] = useState("");
const [description,setDescription] = useState("");
const [content,setContent] = useState("");
const [image,setImage] = useState("");
const [status,setStatus] = useState("approved");


// slug generator
const generateSlug = (text) => {

return text
.toLowerCase()
.replace(/ /g,"-")
.replace(/[^\w-]+/g,"");

};


// fetch blog data
const fetchBlog = async()=>{

const res = await axios.get(`https://shiksha18.onrender.com/api/blogs/${id}`);

setTitle(res.data.title);
setSlug(res.data.slug);
setCategory(res.data.category);
setDescription(res.data.description);
setContent(res.data.content || "");
setImage(res.data.image);
setStatus(res.data.status);

};


useEffect(()=>{

fetchBlog();

},[]);


// upload image
const uploadImage = async(e)=>{

const file = e.target.files[0];

const formData = new FormData();

formData.append("image",file);

const res = await axios.post("https://shiksha18.onrender.com/upload",formData);

setImage(res.data.image);

};


// update blog
const updateBlog = async(e)=>{

e.preventDefault();

await axios.put(`https://shiksha18.onrender.com/api/blogs/${id}`,{

title,
slug,
category,
description,
content,
image,
status

});

alert("Blog Updated Successfully");

navigate("/admin/blogs");

};


return(

<div className="edit-blog-page">

<h2>Edit Blog</h2>

<div className="edit-blog-card">

<form onSubmit={updateBlog}>


{/* IMAGE */}

<div className="blog-form-group">

<label>Blog Image</label>

<input type="file" onChange={uploadImage}/>

{image && (
<img
src={`https://shiksha18.onrender.com${image}`}
style={{width:"200px",marginTop:"10px"}}
/>
)}

</div>


{/* TITLE */}

<div className="blog-form-group">

<label>Title</label>

<input
value={title}
onChange={(e)=>{
setTitle(e.target.value);
setSlug(generateSlug(e.target.value));
}}
/>

</div>


{/* SLUG */}

<div className="blog-form-group">

<label>Slug</label>

<input
value={slug}
onChange={(e)=>setSlug(e.target.value)}
/>

</div>


{/* CATEGORY */}

<div className="blog-form-group">

<label>Select Category</label>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
>

<option>UG PG</option>
<option>Engineering</option>
<option>MBA</option>

</select>

</div>


{/* STATUS */}

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


{/* DESCRIPTION */}

<div className="blog-form-group">

<label>Description</label>

<textarea
rows="5"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

</div>


{/* CONTENT */}

<div className="blog-form-group">

<label>Blog Content</label>

<textarea
rows="12"
placeholder="Edit full blog article..."
value={content}
onChange={(e)=>setContent(e.target.value)}
/>

</div>


<button className="update-btn">

Update Blog

</button>

</form>

</div>

</div>

);

}

export default EditBlog;