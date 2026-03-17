import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const UniversityCard = ({ uni }) => {

const navigate = useNavigate();

const imageUrl = uni.image
? uni.image.startsWith("/uploads")
  ? `https://shiksha18.onrender.com${uni.image}`
  : `https://shiksha18.onrender.com/uploads/${uni.image}`
: "https://via.placeholder.com/80";

const slug = uni.name.toLowerCase().replace(/\s+/g, "-");

const url =
  uni.type === "College"
    ? `/colleges/${slug}`
    : `/universities/${slug}`;

return (

<div
onClick={() => navigate(url)}
className="bg-white border border-blue-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow hover:shadow-lg transition cursor-pointer gap-4 text-center md:text-left"
>

{/* LEFT SIDE */}

<div className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">

<img
src={imageUrl}
alt={uni.name}
className="w-20 h-20 object-contain bg-gray-50 rounded mx-auto md:mx-0"
/>

<div>

<h2 className="text-xl font-semibold text-blue-800">
{uni.name}: Admission, Courses, Fees, Placement
</h2>

<p className="text-gray-500 mt-1">
📍 {uni.location} • {uni.approval || "UGC"}
</p>

{/* BUTTONS */}

<div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">

<button className="bg-blue-700 text-white px-5 py-2 rounded-md">
Apply Now
</button>

<button
onClick={(e)=>{
e.stopPropagation();
navigate(url)
}}
className="bg-gray-200 px-5 py-2 rounded-md"
>
Read More
</button>

<button
className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center justify-center"
>
<FaWhatsapp size={20} />
</button>

<button
className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition"
>
<i className="fa-solid fa-phone"></i>
</button>

{/* ❤️ SAVE BUTTON */}

<button
onClick={async(e)=>{

e.stopPropagation();

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Login first");
return;
}

await fetch("https://shiksha18.onrender.com/api/saved/save",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId:user.id,
collegeId:uni._id,
collegeName:uni.name,
image:uni.image

})

});

alert("College saved ❤️");

}}

className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
>

<i className="fa-solid fa-heart"></i>

</button>

</div>

</div>

</div>

</div>

);

};

export default UniversityCard;