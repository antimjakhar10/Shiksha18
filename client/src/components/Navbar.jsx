import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Shiksha18-logo.jpg";

const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://collegechale.onrender.com/api";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [streams, setStreams] = useState([]);
  const [megaData, setMegaData] = useState({});
  const [activeStream, setActiveStream] = useState("");
  const [showMega, setShowMega] = useState(false);
  const [popularColleges, setPopularColleges] = useState([]);
  const [topColleges, setTopColleges] = useState([]);
  const [showAllState, setShowAllState] = useState(null);
  const [courses, setCourses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [courseTypes, setCourseTypes] = useState({});
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const [mobileStream, setMobileStream] = useState("");

  const location = useLocation();

  useEffect(() => {
    setShowMega(false);
  }, [location]);

  const isUniversityPage = location.pathname === "/universities";
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const loadStream = async (stream) => {
    setActiveStream(stream);

    const menuRes = await fetch(`${API}/megamenu/stream/${stream}`);
    const menuData = await menuRes.json();

    setMegaData(menuData.locations);
    setPopularColleges(menuData.popular);
    setTopColleges(menuData.top);

    const courseRes = await fetch(`${API}/colleges/courses/${stream}`);
    const courseData = await courseRes.json();

    /* courses show karne ke liye */
    setCourses(courseData);

    /* course ka type store karne ke liye */
    const map = {};

    courseData.forEach((c) => {
      map[c] = "University";
    });

    setCourseTypes(map);

    const locationRes = await fetch(`${API}/colleges/locations/${stream}`);
    const locationData = await locationRes.json();

    setLocations(locationData);
  };

  useEffect(() => {
    fetch(`${API}/streams`)
      .then((res) => res.json())
      .then((data) => {
        setStreams(data);

        if (data.length > 0) {
          loadStream(data[0].name);
        }
      });
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div
        className={`fixed top-0 left-0 w-full z-50 bg-slate-600 text-white text-sm py-2 px-5 lg:px-12 flex justify-between items-center transition-transform duration-300 ${
          scrolled ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex gap-4 lg:gap-6">
          <span>📧 info@shiksha18.com</span>
          <span className="hidden lg:block">📞 +91 9857002222</span>
        </div>

        <div className="hidden lg:flex gap-4">
          <span>f</span>
          <span>t</span>
          <span>in</span>
          <span>🌐 English</span>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div
        className={`fixed left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "top-0 bg-black py-4"
            : isHomePage
              ? "top-[40px] bg-transparent py-6"
              : "top-[40px] bg-white py-4 shadow-md"
        }`}
      >
        <div className="relative flex items-center justify-between px-5 md:px-12">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 md:h-12" />

            <span
              className={`text-lg md:text-xl font-bold ${
                scrolled || isHomePage ? "text-white" : "text-black"
              }`}
            >
              Shiksha18
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div
            className={`hidden lg:flex gap-10 text-lg font-semibold tracking-wide absolute left-1/2 -translate-x-1/2 ${
              scrolled || isHomePage ? "text-white" : "text-black"
            }`}
          >
            <Link
              to="/universities"
              className="hover:text-green-500 transition"
            >
              University
            </Link>

            <Link to="/colleges" className="hover:text-green-500 transition">
              College
            </Link>

            <Link to="/blogs" className="hover:text-green-500 transition">
              Blogs
            </Link>

            <Link to="/contact" className="hover:text-green-500 transition">
              Contact Us
            </Link>

            <div
              onMouseEnter={() => setShowMega(true)}
              onMouseLeave={() => setShowMega(false)}
              className="relative cursor-pointer "
            >
              <span>Locations</span>

              {showMega && (
                <div className="absolute left-1/2 -translate-x-1/2 top-[95%] w-[1100px] bg-white shadow-2xl rounded-xl flex text-black border p-2">
                  {/* LEFT STREAMS */}

                  <div className="w-[260px] bg-gray-50 border-r max-h-[450px] overflow-y-auto rounded-l-xl">
                    {streams.map((s) => (
                      <div
                        key={s._id}
                        onMouseEnter={() => loadStream(s.name)}
                        className="px-5 py-3 hover:bg-green-50 hover:text-green-600 cursor-pointer transition-all duration-200 font-medium"
                      >
                        {s.name}
                      </div>
                    ))}
                  </div>

                  {/* RIGHT COLLEGES */}

                  <div className="flex-1 p-8 grid grid-cols-3 gap-12">
                    {/* COLUMN 1 */}

                    <div>
                      <h3 className="font-semibold text-[15px] mb-3">
                        Colleges By Degrees
                      </h3>

                      {courses.slice(0, 5).map((course) => (
                        <Link
                          key={course}
                          to={`${
                            courseTypes[course] === "College"
                              ? "/colleges"
                              : "/universities"
                          }?course=${course}&stream=${activeStream}`}
                          className="block text-[14px] text-gray-600 hover:text-blue-600"
                        >
                          {course} colleges in India
                        </Link>
                      ))}

                      <Link
                        to={`/universities?stream=${activeStream}`}
                        className="block text-blue-600 text-[14px] mt-2"
                      >
                        View All
                      </Link>

                      <div className="mt-6">
                        <h3 className="font-semibold text-[15px] mb-3">
                          Colleges By Location
                        </h3>

                        {locations.slice(0, 5).map((loc) => (
                          <Link
                            key={loc}
                            to={`${
                              courseTypes[courses[0]] === "College"
                                ? "/colleges"
                                : "/universities"
                            }?location=${loc}&stream=${activeStream}`}
                            className="block text-[14px] text-gray-600 hover:text-blue-600"
                          >
                            {activeStream} Colleges in {loc}
                          </Link>
                        ))}

                        <Link
                          to={`${
                            courseTypes[courses[0]] === "College"
                              ? "/colleges"
                              : "/universities"
                          }?stream=${activeStream}`}
                          className="block text-blue-600 text-[14px] mt-2"
                        >
                          View All
                        </Link>
                      </div>
                    </div>

                    {/* COLUMN 2 */}

                    <div>
                      <h3 className="font-semibold text-[15px] mb-3">
                        Popular Colleges
                      </h3>

                      {popularColleges.map((c) => (
                        <Link
                          key={c._id}
                          to={
                            c.type === "University"
                              ? `/universities/${c.name.toLowerCase().replace(/\s+/g, "-")}`
                              : `/colleges/${c.name.toLowerCase().replace(/\s+/g, "-")}`
                          }
                          className="block text-[14px] text-gray-600 hover:text-blue-600"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>

                    {/* COLUMN 3 */}

                    <div>
                      <h3 className="font-semibold text-[15px] mb-3">
                        Top Colleges
                      </h3>

                      {topColleges.map((c) => (
                        <Link
                          key={c._id}
                          to={
                            c.type === "University"
                              ? `/universities/${c.name.toLowerCase().replace(/\s+/g, "-")}`
                              : `/colleges/${c.name.toLowerCase().replace(/\s+/g, "-")}`
                          }
                          className="block text-[14px] text-gray-600 hover:text-blue-600"
                        >
                          {c.name}
                        </Link>
                      ))}

                      <Link
                        to={`/universities?stream=${activeStream}`}
                        onClick={() => setShowMega(false)}
                        className="block text-blue-600 text-[14px] mt-2"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE HAMBURGER */}
          <div
            className={`lg:hidden text-2xl cursor-pointer block ml-auto ${
              !isHomePage || scrolled ? "text-black" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-white shadow-lg px-6 py-4 flex flex-col gap-4 text-black font-semibold overflow-y-auto z-50">
            <Link to="/universities" onClick={() => setMenuOpen(false)}>
              University
            </Link>

            <Link to="/colleges" onClick={() => setMenuOpen(false)}>
              College
            </Link>

            <Link to="/blogs" onClick={() => setMenuOpen(false)}>
              Blogs
            </Link>

            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>

            <div className="border-t pt-4">
              <button
                onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                className="w-full flex justify-between items-center font-semibold text-lg"
              >
                Locations
                <span>{mobileLocationsOpen ? "−" : "+"}</span>
              </button>

              {mobileLocationsOpen && (
                <div className="mt-4 space-y-4">
                  {/* STREAM LIST */}

                  <div className="space-y-2">
                    <p className="font-semibold text-gray-500 text-sm">
                      Streams
                    </p>

                    {streams.map((s) => (
                      <div
                        key={s._id}
                        onClick={() => {
                          setMobileStream(s.name);
                          loadStream(s.name);
                        }}
                        className={`p-2 rounded cursor-pointer ${
                          mobileStream === s.name
                            ? "bg-green-100 text-green-700 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {s.name}
                      </div>
                    ))}
                  </div>

                  {/* COURSES */}

                  {mobileStream && (
                    <div>
                      <p className="font-semibold text-gray-500 text-sm mb-2">
                        Courses
                      </p>

                      <div className="space-y-1">
                        {courses.slice(0, 5).map((course) => (
                          <Link
                            key={course}
                            to={`/universities?course=${course}&stream=${mobileStream}`}
                            onClick={() => setMenuOpen(false)}
                            className="block text-gray-700 text-sm hover:text-blue-600"
                          >
                            {course}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* LOCATIONS */}

                  {mobileStream && (
                    <div>
                      <p className="font-semibold text-gray-500 text-sm mb-2">
                        Locations
                      </p>

                      <div className="space-y-1">
                        {locations.slice(0, 5).map((loc) => (
                          <Link
                            key={loc}
                            to={`/universities?location=${loc}&stream=${mobileStream}`}
                            onClick={() => setMenuOpen(false)}
                            className="block text-gray-700 text-sm hover:text-blue-600"
                          >
                            {loc}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
