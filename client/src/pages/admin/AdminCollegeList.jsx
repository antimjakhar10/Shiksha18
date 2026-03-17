import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./AdminCollegeList.css";

function AdminCollegeList() {
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    const res = await axios.get("https://shiksha18.onrender.com/api/colleges");
    setColleges(res.data);
  };

  const deleteCollege = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this college?",
    );

    if (!confirmDelete) return;

    await axios.delete(`https://shiksha18.onrender.com/api/colleges/${id}`);

    fetchColleges();
  };

  return (
    <div className="admin-college-list">
      <h1>All Universities/Colleges</h1>
      <input
        className="search-input"
        placeholder="Search college..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-wrapper">
        <table className="college-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Stream</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {colleges
            .filter((college) =>
              college.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((college) => (
              <tr key={college._id}>
                <td>
                  <img
                    src={
                      college.image.startsWith("/uploads")
                        ? `https://shiksha18.onrender.com${college.image}`
                        : `https://shiksha18.onrender.com/uploads/${college.image}`
                    }
                    className="college-img"
                  />
                </td>

                <td>{college.name}</td>
                <td>{college.location}</td>
                <td>{college.stream}</td>

                <td>
                  <div className="action-buttons">
                    <Link to={`/admin/edit/${college._id}`}>
                      <button className="edit-btn">
                        <FaEdit />
                      </button>
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => deleteCollege(college._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default AdminCollegeList;
