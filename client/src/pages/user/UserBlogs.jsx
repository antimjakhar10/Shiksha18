import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setLoading(false);
      return;
    }

    fetch(`https://collegechale.onrender.com/api/blogs/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">My Blogs</h2>

      {blogs.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-500">
          No blogs submitted yet
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left">

            {/* HEADER */}
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Blog Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {blogs.map((blog) => {

                const imageUrl = blog.image?.startsWith("/uploads")
                  ? `http://collegechale.onrender.com${blog.image}`
                  : `https://collegechale.onrender.com/uploads/${blog.image}`;

                return (
                  <tr key={blog._id} className="border-t hover:bg-gray-50">

                    {/* IMAGE */}
                    <td className="p-3">
                      <img
                        src={imageUrl}
                        alt={blog.title}
                        className="h-14 w-20 object-cover rounded"
                      />
                    </td>

                    {/* TITLE */}
                    <td className="p-3 font-medium">
                      {blog.title}
                    </td>

                    {/* STATUS */}
                    <td className="p-3">
                      {blog.status === "approved" && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          Approved
                        </span>
                      )}

                      {blog.status === "pending" && (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                          Pending
                        </span>
                      )}

                      {blog.status === "rejected" && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                          Rejected
                        </span>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="p-3 text-sm text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTION */}
                    <td className="p-3">
                      <button
                        onClick={() => navigate(`/blog/${blog.slug}`)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default UserBlogs;