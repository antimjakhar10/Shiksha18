import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BlogDetail(){

const {slug} = useParams();

const [blog,setBlog] = useState(null);

useEffect(()=>{

axios
.get("https://shiksha18.onrender.com/api/blogs")
.then(res=>{

const found = res.data.find(b => b.slug === slug);

if(found){
setBlog(found);
}

})
.catch(err=>console.log(err));

},[slug]);


if(!blog){

return(
<div className="text-center py-32 text-lg">
Loading...
</div>
);

}

return(

<div className="max-w-4xl mx-auto px-4 pt-38 pb-20">

<h1 className="text-4xl font-bold mb-6 text-center">
{blog.title}
</h1>

<p className="text-sm text-gray-500 mb-6">
Written by {blog.author || "Admin"} • {new Date(blog.createdAt).toDateString()}
</p>

<img
src={`https://shiksha18.onrender.com${blog.image}`}
alt={blog.title}
className="w-full h-[420px] object-cover rounded-xl mb-10"
/>

<p className="text-gray-600 text-lg mb-6">
{blog.description}
</p>

<div className="text-gray-700 leading-8 text-lg whitespace-pre-line">
{blog.content}
</div>

</div>

);

}

export default BlogDetail;