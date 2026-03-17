import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./FormLayout.css";
import "./EditCollege.css";

function EditCollege() {
  const [streams, setStreams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [placements, setPlacements] = useState([]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedPlacements, setSelectedPlacements] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

 const [college, setCollege] = useState({
name: "",
type: "",
url: "",
location: "",
streams: [],
description: "",
courses: [],
facilities: [],
placements: [],
fees: [{ course: "", duration: "", amount: "" }],
image: "",
images: [],
isPopular:false,
isTop:false
});

  useEffect(() => {
    fetchCollege();
    fetchStreams();
    fetchCourses();
    fetchFacilities();
    fetchPlacements();
  }, []);

  const fetchStreams = async () => {
    const res = await axios.get("https://shiksha18.onrender.com/api/streams");
    setStreams(res.data);
  };

  const fetchCourses = async () => {
    const res = await axios.get("https://shiksha18.onrender.com/api/courses");
    setCourses(res.data);
  };

  const fetchFacilities = async () => {
    const res = await axios.get("https://shiksha18.onrender.com/api/facilities");
    setFacilities(res.data);
  };

  const fetchPlacements = async () => {
    const res = await axios.get("https://shiksha18.onrender.com/api/placements");
    setPlacements(res.data);
  };

  const handleCourseSelect = (course)=>{

if(selectedCourses.includes(course)){
setSelectedCourses(selectedCourses.filter(c=>c!==course));
}else{
setSelectedCourses([...selectedCourses,course]);
}

};

const handleFacilitySelect = (facility)=>{

if(selectedFacilities.includes(facility)){
setSelectedFacilities(
selectedFacilities.filter(f=>f!==facility)
);
}else{
setSelectedFacilities([...selectedFacilities,facility]);
}

};

const handlePlacementSelect = (placementName) => {

setSelectedPlacements((prev)=>{

if(prev.includes(placementName)){
return prev.filter(p=>p!==placementName);
}

return [...prev, placementName];

});

};

const handleStreamSelect = (stream) => {

if(college.streams.includes(stream)){
setCollege({
...college,
streams: college.streams.filter(s => s !== stream)
});
}else{
setCollege({
...college,
streams: [...college.streams, stream]
});
}

};

  const fetchCollege = async () => {
    try {
      const res = await axios.get(`https://shiksha18.onrender.com/api/colleges/${id}`);

      const found = res.data;

    setCollege({
name: found.name || "",
type: found.type || "",
url: found.url || "",
location: found.location || "",
streams: found.streams || [],
description: found.description || "",
placements: found.placements || [],
fees: found.fees?.length
? found.fees
: [{ course: "", duration: "", amount: "" }],
image: found.image || "",
images: found.images || [],
isPopular: found.isPopular || false,
isTop: found.isTop || false
});

      setSelectedCourses(found.courses || []);
setSelectedFacilities(found.facilities || []);
setSelectedPlacements(
(found.placements || []).map(p => p?.name)
);

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCollege({
      ...college,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const res = await axios.post("https://shiksha18.onrender.com/upload", formData);

    setCollege({
      ...college,
      image: res.data.image,
    });
  };

  const handleFeeChange = (index, field, value) => {

const updatedFees = [...college.fees];
updatedFees[index][field] = value;

setCollege({
...college,
fees: updatedFees
});

};

const addFeeRow = () => {
setCollege({
...college,
fees: [...college.fees, { course: "", duration: "", amount: "" }]
});
};

const removeFeeRow = (index) => {

const updatedFees = college.fees.filter((_, i) => i !== index);

setCollege({
...college,
fees: updatedFees
});

};

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);

    const uploadedImages = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post("https://shiksha18.onrender.com/upload", formData);

      uploadedImages.push(res.data.image);
    }

    setCollege({
      ...college,
      images: [...college.images, ...uploadedImages],
    });
  };

 const handleSubmit = async (e) => {

e.preventDefault();

try{

console.log("Selected Placements:", selectedPlacements);

const formattedData = {
name: college.name,
type: college.type,
url: college.url,
location: college.location,
streams: college.streams,
description: college.description,
courses: selectedCourses,
facilities: selectedFacilities,
placements: placements
.filter(p => selectedPlacements.includes(p.name))
.map(p => ({
name: p.name,
logo: p.logo
})),
fees: college.fees,
image: college.image,
images: college.images,

isPopular: college.isPopular,
isTop: college.isTop
};

console.log("DATA SENT:", formattedData);

await axios.put(`https://shiksha18.onrender.com/api/colleges/${id}`, formattedData);

alert("University updated successfully");

navigate("/admin/colleges");

}catch(err){

console.log("UPDATE ERROR:", err);

alert("Update failed. Check console.");

}

};

  return (
    <div className="admin-form-page">
      <h1 className="admin-page-title">Edit University</h1>

      <div className="admin-form-card">
        <form className="admin-form" onSubmit={handleSubmit}>

{/* TOP GRID */}

<div className="college-top-grid">

{/* LEFT COLUMN */}

<div className="college-left">

<div className="admin-form-group">
<label>University/College Name</label>
<input
name="name"
value={college.name}
onChange={handleChange}
/>
</div>

<div className="admin-form-group">
<label>University/College URL</label>
<input
name="url"
value={college.url || ""}
onChange={handleChange}
/>
</div>

<div className="admin-form-group">
<label>University/College Logo</label>
<input type="file" onChange={handleImageUpload}/>
</div>

{college.image && (
  <div className="logo-box">
    <img
      src={
college.image?.startsWith("/uploads")
? `https://shiksha18.onrender.com${college.image}`
: `https://shiksha18.onrender.com/uploads/${college.image}`
}
      className="logo-preview"
    />

    <button
      type="button"
      className="remove-logo"
      onClick={() =>
        setCollege({
          ...college,
          image: ""
        })
      }
    >
      Remove Logo
    </button>
  </div>
)}

<div className="admin-form-group">
<label>Type</label>
<select name="type" value={college.type} onChange={handleChange}>
<option value="University">University</option>
<option value="College">College</option>
</select>
</div>

<div className="admin-form-group">
<label>Popular College</label>
<input
type="checkbox"
checked={college.isPopular}
onChange={(e)=>
setCollege({...college,isPopular:e.target.checked})
}
/>
</div>

<div className="admin-form-group">
<label>Top College</label>
<input
type="checkbox"
checked={college.isTop}
onChange={(e)=>
setCollege({...college,isTop:e.target.checked})
}
/>
</div>

<div className="admin-form-group">
<label>Location</label>
<input
name="location"
value={college.location || ""}
onChange={handleChange}
/>
</div>

</div>


{/* RIGHT COLUMN */}

<div className="college-right">

<div className="admin-form-group">
<label>University/College Description</label>
<textarea
name="description"
rows="12"
value={college.description}
onChange={handleChange}
/>
</div>


{/* GALLERY */}

<div className="admin-form-group">
<label>Gallery Images</label>
<input type="file" multiple onChange={handleGalleryUpload}/>
</div>

<div className="gallery-preview">

{college.images &&
college.images.map((img,index)=>(
<div key={index} className="gallery-item">

<img
src={
img.startsWith("/uploads")
? `https://shiksha18.onrender.com${img}`
: `https://shiksha18.onrender.com/uploads/${img}`
}
className="gallery-img"
/>

<button
type="button"
className="remove-img"
onClick={()=>{

const updatedImages = college.images.filter((_,i)=>i!==index);

setCollege({
...college,
images: updatedImages
});

}}
>
✖
</button>

</div>
))}

</div>

</div>

</div>

{/* STREAMS */}

<div className="full-width-section">

<div className="stream-header">

<h3>Select Streams</h3>

<div className="stream-controls">

<input
type="text"
placeholder="Search"
className="stream-search"
/>

<button
type="button"
className="add-stream-btn"
onClick={async()=>{

const name = prompt("Enter Stream Name");

if(!name) return;

await axios.post("https://shiksha18.onrender.com/api/streams/add",{name});

fetchStreams();

}}
>
Add New Stream
</button>

</div>

</div>

<div className="streams-grid">

{streams.map((stream)=>(
<div key={stream._id} className="stream-row">

<div className="stream-left">

<input
type="checkbox"
value={stream.name}
checked={college.streams.includes(stream.name)}
onChange={()=>handleStreamSelect(stream.name)}
/>

<span>{stream.name}</span>

</div>

<div className="stream-actions">

<button
className="edit-btn"
type="button"
onClick={async()=>{

const newName = prompt("Edit Stream",stream.name);

if(!newName) return;

await axios.put(`https://shiksha18.onrender.com/api/streams/${stream._id}`,{
name:newName
});

fetchStreams();

}}
>
✏
</button>

<button
className="delete-btn"
type="button"
onClick={async()=>{

if(!window.confirm("Delete Stream?")) return;

await axios.delete(`https://shiksha18.onrender.com/api/streams/${stream._id}`);

fetchStreams();

}}
>
🗑
</button>

</div>

</div>
))}

</div>

</div>


{/* COURSES */}

<div className="full-width-section">

<div className="stream-header">

<h3>Select Courses</h3>

<div className="stream-controls">

<input
type="text"
placeholder="Search"
className="stream-search"
/>

<button
type="button"
className="add-stream-btn"
onClick={async()=>{

const name = prompt("Enter Course Name");

if(!name) return;

await axios.post("https://shiksha18.onrender.com/api/courses/add",{name});

fetchCourses();

}}
>
Add New Course
</button>

</div>

</div>

<div className="streams-grid">

{courses.map((course)=>(

<div key={course._id} className="stream-row">

<div className="stream-left">

<input
type="checkbox"
checked={selectedCourses.includes(course.name)}
onChange={()=>handleCourseSelect(course.name)}
/>

<span>{course.name}</span>

</div>

<div className="stream-actions">

<button
className="edit-btn"
type="button"
onClick={async()=>{

const newName = prompt("Edit Course",course.name);

if(!newName) return;

await axios.put(`https://shiksha18.onrender.com/api/courses/${course._id}`,{
name:newName
});

fetchCourses();

}}
>
✏
</button>

<button
className="delete-btn"
type="button"
onClick={async()=>{

if(!window.confirm("Delete Course?")) return;

await axios.delete(`https://shiksha18.onrender.com/api/courses/${course._id}`);

fetchCourses();

}}
>
🗑
</button>

</div>

</div>

))}

</div>

</div>


{/* FACILITIES */}

<div className="full-width-section">

<div className="stream-header">

<h3>Select Facilities</h3>

<div className="stream-controls">

<input
type="text"
placeholder="Search"
className="stream-search"
/>

<button
type="button"
className="add-stream-btn"
onClick={async()=>{

const name = prompt("Enter Facility Name");

if(!name) return;

await axios.post("https://shiksha18.onrender.com/api/facilities/add",{name});

fetchFacilities();

}}
>
Add New Facility
</button>

</div>

</div>

<div className="streams-grid">

{facilities.map((facility)=>(

<div key={facility._id} className="stream-row">

<div className="stream-left">

<input
type="checkbox"
checked={selectedFacilities.includes(facility.name)}
onChange={()=>handleFacilitySelect(facility.name)}
/>

<span>{facility.name}</span>

</div>

<div className="stream-actions">

<button
className="edit-btn"
type="button"
onClick={async()=>{

const newName = prompt("Edit Facility",facility.name);

if(!newName) return;

await axios.put(`https://shiksha18.onrender.com/api/facilities/${facility._id}`,{
name:newName
});

fetchFacilities();

}}
>
✏
</button>

<button
className="delete-btn"
type="button"
onClick={async()=>{

if(!window.confirm("Delete Facility?")) return;

await axios.delete(`https://shiksha18.onrender.com/api/facilities/${facility._id}`);

fetchFacilities();

}}
>
🗑
</button>

</div>

</div>

))}

</div>

</div>


{/* PLACEMENTS */}

<div className="full-width-section">

<div className="stream-header">

<h3>Select Placements</h3>

<div className="stream-controls">

<input
type="text"
placeholder="Search"
className="stream-search"
/>

<button
type="button"
className="add-stream-btn"
onClick={async()=>{

const name = prompt("Company Name");
if(!name) return;

const avgPackage = prompt("Average Package (LPA)");
const highestPackage = prompt("Highest Package (LPA)");

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/*";

fileInput.onchange = async (e)=>{

const file = e.target.files[0];
if(!file) return;

const formData = new FormData();
formData.append("image", file);

const uploadRes = await axios.post("https://shiksha18.onrender.com/upload", formData);

const logo = uploadRes.data.image;

await axios.post("https://shiksha18.onrender.com/api/placements/add",{
name,
avgPackage,
highestPackage,
logo
});

fetchPlacements();

};

fileInput.click();

}}
>
Add Company
</button>

</div>

</div>

<div className="streams-grid">

{placements.map((placement)=>(

<div key={placement._id} className="stream-row">

<div className="stream-left">

<input
type="checkbox"
checked={selectedPlacements.includes(placement.name)}
onChange={()=>handlePlacementSelect(placement.name)}
/>

<div style={{display:"flex",alignItems:"center",gap:"10px"}}>
<img
src={`https://shiksha18.onrender.com${placement.logo}`}
style={{width:"28px",height:"28px",objectFit:"contain"}}
/>
<span>{placement.name}</span>
</div>

</div>

<div className="stream-actions">

<button
className="edit-btn"
type="button"
onClick={async()=>{

const name = prompt("Edit Placement Name",placement.name);
if(!name) return;

const avgPackage = prompt("Average Package",placement.avgPackage || "");
const highestPackage = prompt("Highest Package",placement.highestPackage || "");
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/*";

fileInput.onchange = async (e)=>{

const file = e.target.files[0];

let logo = placement.logo;

if(file){

const formData = new FormData();
formData.append("image", file);

const uploadRes = await axios.post("https://shiksha18.onrender.com/upload", formData);

logo = uploadRes.data.image;

}

await axios.put(`https://shiksha18.onrender.com/api/placements/${placement._id}`,{
name,
avgPackage,
highestPackage,
logo
});

fetchPlacements();

};

fileInput.click();

}}
>
✏
</button>

<button
className="delete-btn"
type="button"
onClick={async()=>{

if(!window.confirm("Delete Company?")) return;

await axios.delete(`https://shiksha18.onrender.com/api/placements/${placement._id}`);

fetchPlacements();

}}
>
🗑
</button>

</div>

</div>

))}

</div>

</div>


{/* FEES */}

<div className="fees-section">

<h3>Fees Structure</h3>

{college.fees.map((fee,index)=>(

<div key={index} className="fee-row">

<input
placeholder="Course"
value={fee.course}
onChange={(e)=>handleFeeChange(index,"course",e.target.value)}
/>

<input
placeholder="Duration"
value={fee.duration}
onChange={(e)=>handleFeeChange(index,"duration",e.target.value)}
/>

<input
placeholder="Fees"
value={fee.amount}
onChange={(e)=>handleFeeChange(index,"amount",e.target.value)}
/>

<button
type="button"
onClick={()=>removeFeeRow(index)}
className="remove-fee"
>
Remove
</button>

</div>

))}

<button type="button" onClick={addFeeRow} className="add-fee">
+ Add Fee Row
</button>

</div>


<button type="submit" className="admin-submit-btn">
Update University
</button>

</form>
      </div>
    </div>
  );
}

export default EditCollege;
