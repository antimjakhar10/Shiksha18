import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard(){

const [colleges,setColleges] = useState([]);

useEffect(()=>{
fetchStats();
},[]);

const fetchStats = async ()=>{

const res = await axios.get(
"https://shiksha18.onrender.com/api/colleges"
);

setColleges(res.data);

};

const totalColleges = colleges.length;

const totalStreams = [
...new Set(colleges.map(c => c.stream))
].length;

const totalCourses = colleges.reduce((acc,c)=>{
return acc + (c.courses ? c.courses.length : 0);
},0);

return(

<div className="dashboard">

<h1>Dashboard</h1>

<div className="dashboard-cards">

<div className="card">
<h3>Total Colleges</h3>
<p>{totalColleges}</p>
</div>

<div className="card">
<h3>Total Streams</h3>
<p>{totalStreams}</p>
</div>

<div className="card">
<h3>Total Courses</h3>
<p>{totalCourses}</p>
</div>

</div>

</div>

);

}

export default AdminDashboard;