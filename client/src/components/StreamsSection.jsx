import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const streams = [
  "View All",
  "Engineering",
  "Management",
  "Skill Developments",
  "Law",
  "Education",
  "Design",
];

const StreamsSection = () => {
  const [colleges, setColleges] = useState([]);

  const [activeStream, setActiveStream] = useState("View All");
  const [visibleCount, setVisibleCount] = useState(6);

 const filteredUniversities =
  activeStream === "View All"
    ? colleges
    : colleges.filter((uni) =>
        uni.streams?.includes(activeStream)
      );

  useEffect(() => {
    fetch("https://shiksha18.onrender.com/api/colleges")
      .then((res) => res.json())
      .then((data) => setColleges(data));
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeStream]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Most Selected Streams By Students
        </h2>

        <p className="text-center text-gray-600 mb-10">
          We offer you a brighter future
        </p>

        {/* Streams Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {streams.map((stream) => (
            <button
              key={stream}
              onClick={() => setActiveStream(stream)}
              className={`px-6 py-2 rounded-md border transition
                ${
                  activeStream === stream
                    ? "bg-blue-900 text-white border-blue-900"
                    : "border-gray-300 hover:bg-blue-100"
                }`}
            >
              {stream}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniversities.slice(0, visibleCount).map((uni) => (
            <Link
              key={uni._id}
              to={
                uni.type === "College"
                  ? `/colleges/${uni.name.toLowerCase().replace(/\s+/g, "-")}`
                  : `/universities/${uni.name.toLowerCase().replace(/\s+/g, "-")}`
              }
              className="block"
            >
              <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6">
                <img
                  src={
                    uni.image.startsWith("/uploads")
                      ? `https://shiksha18.onrender.com${uni.image}`
                      : `https://shiksha18.onrender.com/uploads/${uni.image}`
                  }
                  alt={uni.name}
                  className="h-28 object-contain mb-4 mx-auto"
                />

                <h3 className="text-xl font-semibold mb-2">{uni.name}</h3>

                <p className="text-sm text-gray-500 mb-2">📍 {uni.location}</p>

                <p className="text-gray-600 text-sm mb-4 h-[44px] overflow-hidden leading-5">
                  {uni.description}
                </p>

                <span className="text-blue-900 font-medium">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {visibleCount < filteredUniversities.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount(visibleCount + 6)}
              className="px-8 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StreamsSection;
