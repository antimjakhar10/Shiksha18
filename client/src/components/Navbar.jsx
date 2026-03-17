import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/shiksha-Logo.png";

const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://shiksha18.onrender.com/api";

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
  const [mobileStep, setMobileStep] = useState("main");

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
        className={`fixed top-0 left-0 w-full z-30 bg-slate-600 text-white text-sm py-2 px-5 lg:px-12 flex justify-between items-center transition-transform duration-300 ${
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
        className={`fixed left-0 w-full z-50 transition-all duration-300 ${
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
            className={`lg:hidden text-2xl cursor-pointer ml-auto ${
              !isHomePage || scrolled ? "text-black" : "text-white"
            }`}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden fixed inset-0 z-50 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setMenuOpen(false);
              setMobileStep("main");
            }}
          ></div>

          {/* PANEL */}
          <div className="absolute top-0 left-0 w-full h-full bg-white p-5 overflow-y-auto transition-all duration-300">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
              {mobileStep !== "main" && (
                <button
                  onClick={() => {
                    if (mobileStep === "details") setMobileStep("streams");
                    else setMobileStep("main");
                  }}
                  className="text-lg font-semibold"
                >
                  ← Back
                </button>
              )}

              <img src={logo} className="h-10" />

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setMobileStep("main");
                }}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            {/* STEP 1: MAIN */}
            {mobileStep === "main" && (
              <div className="flex flex-col gap-4 text-lg font-semibold">
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

                <button
                  onClick={() => setMobileStep("streams")}
                  className="text-left w-full flex justify-between items-center"
                >
                  <span>Locations</span>
                  <span>→</span>
                </button>
              </div>
            )}

            {/* STEP 2: STREAMS */}
            {mobileStep === "streams" && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Select Stream</h3>

                {streams.map((s) => (
                  <div
                    key={s._id}
                    onClick={() => {
                      setMobileStream(s.name);
                      loadStream(s.name);
                      setMobileStep("details");
                    }}
                    className="p-3 border rounded hover:bg-gray-100 cursor-pointer"
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}

            {/* STEP 3: DETAILS */}
            {mobileStep === "details" && (
              <div className="space-y-6">
                {/* COURSES */}
                <div>
                  <h3 className="font-semibold mb-2">Colleges By Degree</h3>

                  {courses.slice(0, 5).map((course) => (
                    <Link
                      key={course}
                      to={`/universities?course=${course}&stream=${mobileStream}`}
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm text-gray-700 py-1"
                    >
                      {course}
                    </Link>
                  ))}
                </div>

                {/* LOCATIONS */}
                <div>
                  <h3 className="font-semibold mb-2">Colleges By Location</h3>

                  {locations.slice(0, 5).map((loc) => (
                    <Link
                      key={loc}
                      to={`/universities?location=${loc}&stream=${mobileStream}`}
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm text-gray-700 py-1"
                    >
                      {mobileStream} Colleges in {loc}
                    </Link>
                  ))}
                </div>

                {/* POPULAR */}
                <div>
                  <h3 className="font-semibold mb-2">Popular Colleges</h3>

                  {popularColleges.map((c) => (
                    <Link
                      key={c._id}
                      to={
                        c.type === "University"
                          ? `/universities/${c.name.toLowerCase().replace(/\s+/g, "-")}`
                          : `/colleges/${c.name.toLowerCase().replace(/\s+/g, "-")}`
                      }
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm text-gray-700 py-1"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>

                {/* TOP */}
                <div>
                  <h3 className="font-semibold mb-2">Top Colleges</h3>

                  {topColleges.map((c) => (
                    <Link
                      key={c._id}
                      to={
                        c.type === "University"
                          ? `/universities/${c.name.toLowerCase().replace(/\s+/g, "-")}`
                          : `/colleges/${c.name.toLowerCase().replace(/\s+/g, "-")}`
                      }
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm text-gray-700 py-1"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
