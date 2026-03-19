import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserMyColleges(){

const [colleges,setColleges] = useState([]);

useEffect(()=>{
fetchData();
},[]);

const fetchData = async()=>{
const user = JSON.parse(localStorage.getItem("user"));

const res = await axios.get(
  `https://shiksha18.onrender.com/api/colleges/user/${user.id}`
);

setColleges(res.data);
};

return (
  <div style={{ padding: "20px" }}>
    <h2 style={{ marginBottom: "20px" }}>My Colleges</h2>

    {colleges.length === 0 && (
      <p>No colleges added yet 😢</p>
    )}

    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr 1fr 120px 120px",
          padding: "12px 15px",
          background: "#0f172a",
          color: "#fff",
          fontWeight: "600",
        }}
      >
        <div>Logo</div>
        <div>Name</div>
        <div>Location</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {/* ROWS */}
      {colleges.map((c) => (
        <div
          key={c._id}
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 1fr 120px 120px",
            alignItems: "center",
            padding: "12px 15px",
            borderBottom: "1px solid #eee",
          }}
        >
          {/* IMAGE */}
          <img
            src={
              c.image?.startsWith("/uploads")
                ? `https://shiksha18.onrender.com${c.image}`
                : `https://shiksha18.onrender.com/uploads/${c.image}`
            }
            alt={c.name}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />

          {/* NAME */}
          <div style={{ fontWeight: "500" }}>{c.name}</div>

          {/* LOCATION */}
          <div style={{ color: "#555" }}>{c.location}</div>

          {/* STATUS */}
          <div>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                color: "white",
                background:
                  c.status === "approved"
                    ? "#22c55e"
                    : c.status === "pending"
                    ? "#f59e0b"
                    : "#ef4444",
              }}
            >
              {c.status}
            </span>
          </div>

          {/* ACTION */}
          <div>
            <Link to={`/user/edit/${c._id}`}>
              <button
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#2563eb",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default UserMyColleges;