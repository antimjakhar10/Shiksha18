import { Link, useNavigate } from "react-router-dom";

function UserSidebar(){

const navigate = useNavigate();

const handleLogout = () => {

localStorage.removeItem("user");

navigate("/user/login");

};

return(

<div className="w-64 min-h-screen bg-white border-r p-6 flex flex-col justify-between">

<div>

<h2 className="text-2xl font-bold mb-8">
User Panel
</h2>

<nav className="flex flex-col gap-4 text-gray-700">

<Link to="/user/dashboard" className="hover:text-blue-600">
Dashboard
</Link>

<Link to="/user/blogs" className="hover:text-blue-600">
My Blogs
</Link>

<Link to="/user/enquiries" className="hover:text-blue-600">
Enquiries
</Link>

<Link to="/user/saved" className="hover:text-blue-600">
Saved Colleges
</Link>

</nav>

</div>

<button
onClick={handleLogout}
className="mt-10 bg-red-500 text-white py-2 rounded hover:bg-red-600"
>
Logout
</button>

</div>

);

}

export default UserSidebar;