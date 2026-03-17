import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UniversityCard from "../components/UniversityCard";
import contactBg from "../assets/bgImage.png";

const UniversityList = () => {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [universities, setUniversities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [courses, setCourses] = useState([]);
  const [streams, setStreams] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [filters, setFilters] = useState({
    degree: "",
    stream: "",
    state: "",
    city: "",
    type: "",
  });

  const [page, setPage] = useState(1);
  const perPage = 6;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {

const courseParam = searchParams.get("course");
const streamParam = searchParams.get("stream");
const locationParam = searchParams.get("location");

if(courseParam){
setSelectedCourse(courseParam);
}

if(streamParam){
setSelectedStream(streamParam);
}

if(locationParam){
setSelectedState(locationParam);
}

}, [searchParams]);

  useEffect(() => {
    fetch("https://shiksha18.onrender.com/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));

    fetch("https://shiksha18.onrender.com/api/streams")
      .then((res) => res.json())
      .then((data) => setStreams(data));
  }, []);

  useEffect(() => {
    fetch("https://shiksha18.onrender.com/api/colleges")
      .then((res) => res.json())
      .then((data) => {
        const universities = data.filter(
          (u) => !u.type || u.type === "University",
        );

        setUniversities(universities);
        setFiltered(universities);
        setTotal(universities.length);

        const uniqueStates = [
          ...new Set(
            universities
              .map((u) => {
                const parts = u.location?.split(",");
                return parts.length > 1 ? parts[1].trim() : parts[0]?.trim();
              })
              .filter(Boolean),
          ),
        ];

        setStates(uniqueStates);
      });
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      return;
    }

    const filteredCities = [
      ...new Set(
        universities
          .filter((u) => u.location?.includes(selectedState))
          .map((u) => {
            const parts = u.location?.split(",");
            return parts.length > 1 ? parts[0].trim() : null;
          })
          .filter(Boolean),
      ),
    ];

    setCities(filteredCities);
  }, [selectedState, universities]);

  useEffect(() => {
    let result = universities;

    /* SEARCH */
    if (search) {
      result = result.filter((u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    /* COURSE FILTER */
    if (selectedCourse) {
      result = result.filter((u) =>
        u.courses?.some((c) =>
          String(c).toLowerCase().includes(selectedCourse.toLowerCase()),
        ),
      );
    }

    /* STREAM FILTER */

    if (selectedStream) {
      result = result.filter((u) => u.streams?.includes(selectedStream));
    }

    /* STATE FILTER */

    if (selectedState) {
      result = result.filter((u) => u.location?.includes(selectedState));
    }

    /* CITY FILTER */

    if (selectedCity) {
      result = result.filter((u) => u.location?.includes(selectedCity));
    }

    /* SORT */
    if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "location") {
      result = [...result].sort((a, b) => a.location.localeCompare(b.location));
    }

    setFiltered(result);
  }, [
    search,
    selectedCourse,
    selectedStream,
    selectedState,
    selectedCity,
    sort,
    universities,
  ]);

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="bg-gray-100 pt-[120px]">
      {/* HERO */}

      <div
        className="h-[260px] bg-cover bg-center flex flex-col items-center justify-center  relative px-4 mt-[4px]"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative text-center text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            University Available Now
          </h1>

          <input
            type="text"
            placeholder="Search university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[420px] px-5 py-3 rounded-lg bg-white/80 border border-white/50 shadow-md text-gray-800 placeholder-gray-500 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 py-10 px-4">
        {/* LEFT FILTER */}
        <div className="md:col-span-1 space-y-6 md:sticky md:top-28">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-3">COURSES</h3>

            <input
              type="text"
              placeholder="Search"
              className="border w-full p-2 mb-3"
            />

            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {courses.map((course) => (
                <label key={course._id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="course"
                    value={course.name}
                    onChange={() => setSelectedCourse(course.name)}
                  />

                  <span>{course.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow mt-6">
            <h3 className="font-bold mb-3">STREAM</h3>

            <input
              type="text"
              placeholder="Search"
              className="border w-full p-2 mb-3"
            />

            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {streams.map((stream) => (
                <label key={stream._id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="stream"
                    value={stream.name}
                    onChange={() => setSelectedStream(stream.name)}
                  />

                  <span>{stream.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow mt-6">
            <h3 className="font-bold mb-3">STATE</h3>

            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {states.map((state, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="state"
                    onChange={() => setSelectedState(state)}
                  />

                  <span>{state}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow mt-6">
            <h3 className="font-bold mb-3">CITY</h3>

            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {cities.map((city, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="city"
                    onChange={() => setSelectedCity(city)}
                  />

                  <span>{city}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT LIST */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
            <p className="text-gray-600 text-sm md:text-base">
              Showing {paginated.length} of {total} Institutions
            </p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border px-3 py-2 rounded w-full md:w-auto"
            >
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="location">Location</option>
            </select>
          </div>

          {paginated.map((uni) => (
            <UniversityCard key={uni._id} uni={uni} />
          ))}

          {/* PAGINATION */}

          <div className="flex gap-3 justify-center pt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 border ${
                  page === i + 1 ? "bg-blue-600 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityList;
