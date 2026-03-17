import {useState} from "react";
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";

function UserRegister(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleRegister = async(e)=>{

e.preventDefault();

try{

await axios.post(
"https://shiksha18.onrender.com/api/auth/register",
{name,email,password}
);

alert("Account created successfully");

navigate("/user/login");

}catch(err){

alert("User already exists");

}

};

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

<h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
Create Account
</h2>

<form onSubmit={handleRegister} className="space-y-5">

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border w-full p-3 rounded-md"
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border w-full p-3 rounded-md"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border w-full p-3 rounded-md"
/>

<button
className="bg-blue-700 text-white w-full py-3 rounded-md"
>
Register
</button>

</form>

<p className="text-center text-sm mt-4">
Already have account?{" "}
<Link to="/user/login" className="text-blue-700">
Login
</Link>
</p>

</div>

</div>

);

}

export default UserRegister;