import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SavedColleges() {
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  // ✅ GLOBAL API FIX (ek hi jagah define)
  const API =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://collegechale.onrender.com/api";

  // ✅ REMOVE FUNCTION
  const handleRemove = async (id) => {
  try {
    console.log("Deleting ID:", id);

    const res = await fetch(`${API}/saved/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    console.log("Response:", res.status, data);

    if (res.ok) {
      setColleges((prev) => prev.filter((c) => c._id !== id));
    } else {
      alert("Delete failed");
    }

  } catch (error) {
    console.log("Error:", error);
  }
};

  // ✅ FETCH FIX (same API use kar)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch(`${API}/saved/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setColleges(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Saved Colleges</h2>

      {colleges.length === 0 ? (
        <p className="text-gray-500">No saved colleges</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">

            {/* HEADER */}
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">College Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {colleges.map((c) => {
                const imageUrl = c.image?.startsWith("/uploads")
                  ? `${API.replace("/api", "")}${c.image}`
                  : `${API.replace("/api", "")}/uploads/${c.image}`;

                const slug =
                  c.slug || c.collegeName.toLowerCase().replace(/\s+/g, "-");

                return (
                  <tr
                    key={c._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* IMAGE */}
                    <td className="p-4">
                      <img
                        src={imageUrl}
                        alt={c.collegeName}
                        className="h-12 w-16 object-contain rounded"
                      />
                    </td>

                    {/* NAME */}
                    <td className="p-4 font-medium text-blue-700">
                      {c.collegeName}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        Saved
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => navigate(`/colleges/${slug}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleRemove(c._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Remove
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

export default SavedColleges;