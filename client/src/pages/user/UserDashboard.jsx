import { useEffect, useState } from "react";

function UserDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [myColleges, setMyColleges] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return;

    fetch(`https://shiksha18.onrender.com/api/blogs/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));

    

    // 🔥 NEW API
    fetch(`https://shiksha18.onrender.com/api/colleges/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setMyColleges(data));
  }, []);

  return (
    <div className="space-y-6">

      {/* HEADING */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Dashboard Overview
        </h2>
        <p className="text-sm text-gray-500">
          Track your activity and performance
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* BLOGS */}
        <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500">My Blogs</p>
          <h3 className="text-3xl font-bold mt-2 text-blue-600">
            {blogs.length}
          </h3>
        </div>

        

        {/* 🔥 NEW CARD */}
        <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500">My Colleges</p>
          <h3 className="text-3xl font-bold mt-2 text-orange-600">
            {myColleges.length}
          </h3>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;