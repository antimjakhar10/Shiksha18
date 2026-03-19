import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [saved, setSaved] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      return <div>Please login again</div>;
    }

    fetch(`https://shiksha18.onrender.com/api/blogs/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));

    fetch(`https://shiksha18.onrender.com/api/enquiries/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setEnquiries(data));

    fetch(`https://shiksha18.onrender.com/api/saved/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setSaved(data));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">My Blogs</h3>

          <p className="text-3xl mt-4 text-blue-600">{blogs.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Saved Colleges</h3>

          <p className="text-3xl mt-4 text-green-600">{saved.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Enquiries</h3>

          <p className="text-3xl mt-4 text-purple-600">{enquiries.length}</p>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;
