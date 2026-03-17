import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import contactBg from "../assets/bgImage.png";

function BlogsPage() {

const [blogs,setBlogs] = useState([]);

const [loading,setLoading] = useState(true);

useEffect(()=>{

axios
.get("https://shiksha18.onrender.com/api/bloguser/approved")
.then(res=>{
setBlogs(res.data);
setLoading(false);
});

},[]);



if(loading){
return(
<div className="text-center py-40 text-lg">
Loading Blogs...
</div>
);
}

return(

<div className="w-full">

{/* HERO SECTION */}

<div
className="h-[260px] bg-cover bg-center flex items-center justify-center mt-[124px] relative"
style={{ backgroundImage: `url(${contactBg})` }}
>

<div className="absolute inset-0 bg-black/40"></div>

<div className="relative text-center text-white">

<h1 className="text-4xl font-bold">
Blogs
</h1>

<p className="mt-2 text-lg">
Latest news, articles and updates
</p>

</div>

</div>

<div className="max-w-7xl mx-auto px-4 pt-16 pb-16">

<div className="flex justify-between items-center mb-12">

<h1 className="text-4xl font-bold">
Latest Blogs
</h1>

<Link
to="/submit-blog"
className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-800"
>
Write Blog
</Link>

</div>

<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

{blogs.map(blog=>(

<Link
key={blog._id}
to={`/blog/${blog.slug}`}
className="bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden block"
>

<img
src={`https://shiksha18.onrender.com${blog.image}`}
alt={blog.title}
onError={(e)=>{
e.target.src="https://via.placeholder.com/400x250";
}}
className="w-full h-48 object-cover"
/>

<div className="p-6">

<p className="text-xs text-gray-400 mb-2">
By {blog.author || "Admin"}
</p>

<h3 className="text-xl font-semibold mb-2">
{blog.title}
</h3>

<p className="text-gray-600 text-sm mb-4 line-clamp-3">
{blog.description}
</p>

<span className="text-blue-900 font-medium">
Read More →
</span>

</div>

</Link>

))}

</div>

</div>

</div>

);

}

export default BlogsPage;