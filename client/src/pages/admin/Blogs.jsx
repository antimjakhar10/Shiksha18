import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./Blogs.css";

function Blogs() {

const navigate = useNavigate();

const [blogs,setBlogs] = useState([]);
const [search,setSearch] = useState("");
const [page,setPage] = useState(1);
const [statusFilter,setStatusFilter] = useState("all");

const limit = 5;


// search filter
const filteredBlogs = blogs.filter(blog => {

const matchesSearch =
blog.title?.toLowerCase().includes(search.toLowerCase());

const matchesStatus =
statusFilter === "all" || blog.status === statusFilter;

return matchesSearch && matchesStatus;

});


// pagination logic
const start = (page-1)*limit;

const paginatedBlogs = filteredBlogs.slice(start,start+limit);


// fetch blogs
const fetchBlogs = async ()=>{

const res = await axios.get("https://shiksha18.onrender.com/api/blogs");

setBlogs(res.data);

};


useEffect(()=>{
fetchBlogs();
},[]);


// delete blog
const deleteBlog = async(id)=>{

await axios.delete(`https://shiksha18.onrender.com/api/blogs/${id}`);

fetchBlogs();

};


// approve blog
const approveBlog = async(id)=>{

await axios.put(`https://shiksha18.onrender.com/api/blogs/approve/${id}`);

fetchBlogs();

};


// reject blog
const rejectBlog = async(id)=>{

await axios.put(`https://shiksha18.onrender.com/api/blogs/reject/${id}`);

fetchBlogs();

};


return(

<div className="blogs-page">


<div className="blogs-header">

<h1>Blog List</h1>


<div className="blog-actions">

<input
className="blog-search"
placeholder="Search Name..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<select
value={statusFilter}
onChange={(e)=>setStatusFilter(e.target.value)}
className="blog-status-filter"
>

<option value="all">All Blogs</option>
<option value="pending">Pending</option>
<option value="approved">Approved</option>
<option value="rejected">Rejected</option>

</select>


<button
className="add-blog-btn"
onClick={()=>navigate("/admin/add-blog")}
>

+ Add Blog

</button>

</div>

</div>



<div className="blogs-table">

<table>

<thead>

<tr>

<th>ID</th>
<th>Image</th>
<th>Blog Name</th>
<th>Author</th>
<th>Status</th>
<th>Actions</th>
<th>Edit</th>
<th>Delete</th>

</tr>

</thead>


<tbody>

{paginatedBlogs.map((blog,index)=>(

<tr key={blog._id}>

<td>#{start + index + 1}</td>

<td>

<img
src={`https://shiksha18.onrender.com${blog.image}`}
className="blog-img"
/>

</td>

<td>{blog.title}</td>

<td>{blog.author || "Admin"}</td>

<td>

<span className={`status ${blog.status}`}>
{blog.status || "pending"}
</span>

</td>


<td>

{blog.status === "pending" && (

<>

<button
className="approve-btn"
onClick={()=>approveBlog(blog._id)}
>
Approve
</button>

<button
className="reject-btn"
onClick={()=>rejectBlog(blog._id)}
>
Reject
</button>

</>

)}

</td>


<td>

<button
className="edit-btn"
onClick={()=>navigate(`/admin/edit-blog/${blog._id}`)}
>

<FaEdit/>

</button>

</td>


<td>

<button
className="delete-btn"
onClick={()=>deleteBlog(blog._id)}
>

<FaTrash/>

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>



{/* Pagination */}

<div className="pagination">

<button
onClick={()=>setPage(page-1)}
disabled={page===1}
>

Prev

</button>


<button
onClick={()=>setPage(page+1)}
disabled={start + limit >= filteredBlogs.length}
>

Next

</button>

</div>


</div>

);

}

export default Blogs;