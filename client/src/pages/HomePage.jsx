import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import universityBg from "../assets/iit-varanasi.jpg";
import TopCourses from "../components/TopCourses";
import StreamsSection from "../components/StreamsSection";

const steps = [
  "Register",
  "Select Course",
  "Fill Application",
  "Upload Documents",
  "Make Payment",
  "Admission Confirmed",
];

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [activeStep, setActiveStep] = useState(2);
  const [colleges, setColleges] = useState([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    const college = colleges.find((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (college) {
      const slug = college.name.toLowerCase().replace(/\s+/g, "-");

      const url =
        college.type === "College"
          ? `/colleges/${slug}`
          : `/universities/${slug}`;

      navigate(url);
    } else {
      alert("College not found");
    }
  };

  useEffect(() => {
    fetch("https://shiksha18.onrender.com/api/colleges")
      .then((res) => res.json())
      .then((data) => setColleges(data));
  }, []);

  return (
    <div className="relative">
      {/* HERO SECTION */}
      <div
        className="relative h-[300px] md:h-[360px] pt-[110px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${universityBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 w-full px-4 flex justify-center items-center">
          <div className="flex w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-2xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find your institute here..."
              className="flex-1 px-4 md:px-6 py-3 md:py-4 text-base md:text-lg outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-red-600 px-6 md:px-8 flex items-center justify-center text-white text-lg md:text-xl hover:bg-red-700 transition"
            >
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* PROCESS SECTION */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-7xl xl:max-w-[1400px] mx-auto text-center px-4">
          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Choosing the right college can be confusing
          </h2>

          <p className="text-gray-600 mb-10 md:mb-14 text-sm md:text-lg">
            We're here to guide you at every step of your college journey.
          </p>

          {/* Steps Wrapper */}
          <div className="w-full overflow-x-auto lg:overflow-visible pb-4">
            <div className="flex items-center gap-3 md:gap-4 w-max lg:w-full lg:justify-center px-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center flex-shrink-0">
                  {/* Step Box */}
                  <div
                    onClick={() => setActiveStep(index)}
                    className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg border cursor-pointer whitespace-nowrap transition text-sm md:text-base
  ${
    index <= activeStep
      ? "bg-green-200 border-green-500 text-green-800"
      : "bg-gray-100 border-gray-300 text-gray-600"
  }`}
                  >
                    <span className="text-base md:text-lg">
                      {index <= activeStep ? "✔" : "○"}
                    </span>

                    <span className="font-medium">{step}</span>
                  </div>

                  {/* Connector Line */}
                  {index !== steps.length - 1 && (
                    <div className="w-6 md:w-8 h-[2px] bg-gray-300 flex-shrink-0"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TopCourses
        onCourseSelect={(course) => {
          console.log("Selected Course:", course);
        }}
      />

      <StreamsSection />
    </div>
  );
};

export default HomePage;
