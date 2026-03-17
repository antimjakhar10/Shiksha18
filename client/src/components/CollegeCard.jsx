import { Link } from "react-router-dom";

const CollegeCard = ({ college }) => {
  return (
    <Link
      to={`/colleges/${college.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="block"
    >
      <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
        <img
          src={
            college.image.startsWith("/uploads")
              ? `https://shiksha18.onrender.com${college.image}`
              : `https://shiksha18.onrender.com/uploads/${college.image}`
          }
          alt={college.name}
          className="h-28 object-contain mb-4 mx-auto"
        />

        <h3 className="text-xl font-semibold mb-2">{college.name}</h3>

        <p className="text-sm text-gray-500 mb-2">
          📍 {college.location}
        </p>

        <span className="text-blue-900 font-medium">
          View Details →
        </span>
      </div>
    </Link>
  );
};

export default CollegeCard;