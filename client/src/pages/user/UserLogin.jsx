import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function UserLogin(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async(e)=>{

e.preventDefault();

try{

const res = await axios.post(
"https://shiksha18.onrender.com/api/auth/login",
{email,password}
);

localStorage.setItem("userToken",res.data.token);
localStorage.setItem("user",JSON.stringify(res.data.user));

navigate("/user/dashboard");

}catch(err){
alert("Invalid login");
}

};

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

<div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

<h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
User Login
</h2>

<form onSubmit={handleLogin} className="space-y-5">

<div>
<label className="block text-sm text-gray-600 mb-1">
Email
</label>

<input
type="email"
placeholder="Enter your email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
</div>

<div>
<label className="block text-sm text-gray-600 mb-1">
Password
</label>

<input
type="password"
placeholder="Enter your password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
</div>

<button
className="bg-blue-700 hover:bg-blue-800 transition text-white w-full py-3 rounded-md font-medium"
>
Login
</button>

</form>

<p className="text-center text-sm text-gray-500 mt-6">
Don't have an account?{" "}
<Link to="/user/register" className="text-blue-700 font-medium">
Register
</Link>
</p>

</div>

</div>

);

}

export default UserLogin;