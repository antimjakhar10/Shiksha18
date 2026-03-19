import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const CollegeDetails = () => {
  const { id } = useParams();

  const [college, setCollege] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    await fetch("https://shiksha18.onrender.com/api/enquiries/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        college: college.name,
        userId: user?.id,
      }),
    });

    alert("Application submitted successfully");
  };

  useEffect(() => {
    fetch("https://shiksha18.onrender.com/api/colleges")
      .then((res) => res.json())
      .then((data) => {
        const foundCollege = data.find((item) => {
          const slug = item.name.toLowerCase().replace(/\s+/g, "-");
          return slug === id;
        });

        setCollege(foundCollege);
        setCurrentIndex(0);

        // ✅ IMPORTANT FIX
        setActiveImage(foundCollege?.images?.[0] || foundCollege?.image);
      });
  }, [id]);

  const getImageUrl = (img) => {
    if (!img) return "";
    return img.startsWith("/uploads")
      ? `https://shiksha18.onrender.com${img}`
      : `https://shiksha18.onrender.com/uploads/${img}`;
  };

  const nextImage = () => {
    if (!college?.images?.length) return;
    setCurrentIndex((prev) =>
      prev === college.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    if (!college?.images?.length) return;
    setCurrentIndex((prev) =>
      prev === 0 ? college.images.length - 1 : prev - 1,
    );
  };

  if (!college) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 w-full">
<Helmet>
  <title>
  {college?.seoTitle?.trim()
    ? college.seoTitle
    : `${college?.name} in ${college?.location} | Shiksha18`}
</title>

  <meta
  name="description"
  content={
    college?.seoDescription?.trim()
      ? college.seoDescription
      : `Explore ${college?.name} in ${college?.location}. Check courses, fees, placements and admission details on Shiksha18.`
  }
/>

 <meta
  name="keywords"
  content={
    Array.isArray(college?.seoTags)
      ? college.seoTags.join(",")
      : college?.seoTags || `${college?.name}, ${college?.location}, colleges`
  }
/>
</Helmet>

      {/* HERO SECTION */}
      <div
        className="relative h-[300px] md:h-[420px] pt-[60px] md:pt-0 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${
            college.images?.[0]?.startsWith("/uploads")
              ? `https://shiksha18.onrender.com${college.images[0]}`
              : `https://shiksha18.onrender.com/uploads/${college.images[0]}`
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-white px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-xl sm:text-2xl md:text-5xl font-bold mb-4 leading-tight">
            {college.name}
          </h1>
          <p className="text-sm md:text-lg opacity-90 flex items-center justify-center gap-1">
            📍 {college.location}
          </p>
        </div>
      </div>

      {/* COLLEGE HIGHLIGHTS */}
      <div className="max-w-6xl mx-auto px-6 mt-[-50px] relative z-20">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg py-6 px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 text-center">
          {/* YEARS */}
          <div className="flex flex-col items-center border-r border-gray-200 last:border-none transition hover:scale-105">
            <div className="text-2xl mb-1">🎓</div>
            <h3 className="text-2xl font-bold text-blue-900">25+</h3>
            <p className="text-gray-500 text-xs">Years of Excellence</p>
          </div>

          {/* STUDENTS */}
          <div className="flex flex-col items-center border-r border-gray-200 last:border-none transition hover:scale-105">
            <div className="text-2xl mb-1">👨‍🎓</div>
            <h3 className="text-2xl font-bold text-blue-900">10K+</h3>
            <p className="text-gray-500 text-xs">Students</p>
          </div>

          {/* FACULTY */}
          <div className="flex flex-col items-center border-r border-gray-200 last:border-none transition hover:scale-105">
            <div className="text-2xl mb-1">👩‍🏫</div>
            <h3 className="text-2xl font-bold text-blue-900">150+</h3>
            <p className="text-gray-500 text-xs">Faculty Members</p>
          </div>

          {/* PLACEMENT */}
          <div className="flex flex-col items-center transition hover:scale-105">
            <div className="text-2xl mb-1">💼</div>
            <h3 className="text-2xl font-bold text-blue-900">90%</h3>
            <p className="text-gray-500 text-xs">Placement Rate</p>
          </div>
        </div>
      </div>

      {/* MAIN SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 w-full space-y-10">
          {/* MAIN IMAGE */}
          {/* DESKTOP IMAGE */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm p-6">
            <img
              src={
                activeImage.startsWith("/uploads")
                  ? `https://shiksha18.onrender.com${activeImage}`
                  : `https://shiksha18.onrender.com/uploads/${activeImage}`
              }
              alt="college"
              className="w-full h-[300px] md:h-[380px] object-cover rounded-lg"
            />
          </div>

          {/* MOBILE SLIDER */}
          <div className="block md:hidden bg-white rounded-2xl shadow-sm p-6 relative">
            <img
              src={getImageUrl(college.images?.[currentIndex] || college.image)}
              alt="college"
              className="w-full h-[200px] object-cover rounded-lg"
            />

            <button
              onClick={prevImage}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
            >
              ›
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 flex-wrap">
            {college?.images?.map((img, index) => (
              <img
                key={index}
                src={
                  img.startsWith("/uploads")
                    ? `https://shiksha18.onrender.com${img}`
                    : `https://shiksha18.onrender.com/uploads/${img}`
                }
                onClick={() => setActiveImage(img)}
                className={`w-16 md:w-24 h-16 md:h-20 object-contain border rounded-lg cursor-pointer
${activeImage === img ? "border-blue-600 scale-105" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* ABOUT */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              About {college.name}
            </h2>

            <p
              className={`text-gray-600 leading-7 text-justify ${
                !showFullDesc ? "line-clamp-4" : ""
              }`}
            >
              {college.description}
            </p>

            {college.description?.length > 150 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-blue-600 text-sm mt-2"
              >
                {showFullDesc ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
          {/* STREAMS */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Streams Offered
            </h2>

            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
              {college?.streams?.map((stream, i) => (
                <span
                  key={i}
                  className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm text-center md:text-left md:px-4 md:py-2"
                >
                  {stream}
                </span>
              ))}
            </div>
          </div>

          {/* COURSES */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Popular Courses
            </h2>

            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
              {college.courses.map((course, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm text-center md:text-left md:px-4 md:py-2"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* FACILITIES */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Facilities</h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              {(showAllFacilities
                ? college.facilities
                : college.facilities.slice(0, 5)
              ).map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-600">✔</span>
                  {item}
                </li>
              ))}
            </ul>

            {college.facilities.length > 5 && (
              <button
                onClick={() => setShowAllFacilities(!showAllFacilities)}
                className="text-blue-600 text-sm mt-3"
              >
                {showAllFacilities ? "View Less" : "View All"}
              </button>
            )}
          </div>

          {/* PLACEMENTS */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 overflow-hidden">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
              Our Placement Partners
            </h2>

            <div className="space-y-6">
              {/* ROW 1 */}
              <div className="flex gap-6 whitespace-nowrap animate-scroll">
                {[...college.placements, ...college.placements].map(
                  (company, index) => (
                    <div
                      key={index}
                      className="min-w-[120px] h-[70px] bg-white border rounded-lg flex items-center justify-center shadow"
                    >
                      <img
                        src={`https://shiksha18.onrender.com${company.logo}`}
                        alt={company.name}
                        className="h-8 object-contain"
                      />
                    </div>
                  ),
                )}
              </div>

              {/* ROW 2 */}
              <div className="flex gap-6 whitespace-nowrap animate-scroll-reverse">
                {[...college.placements, ...college.placements].map(
                  (company, index) => (
                    <div
                      key={index}
                      className="min-w-[120px] h-[70px] bg-white border rounded-lg flex items-center justify-center shadow"
                    >
                      <img
                        src={`https://shiksha18.onrender.com${company.logo}`}
                        alt={company.name}
                        className="h-8 object-contain"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* FEES STRUCTURE */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">Fees Structure</h2>

            <div className="w-full overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Course</th>
                    <th className="p-3 text-left">Duration</th>
                    <th className="p-3 text-left">Fees</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {college.fees && college.fees.length > 0 ? (
                    college.fees.map((f, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3">{f.course}</td>
                        <td className="p-3">{f.duration}</td>
                        <td className="p-3 font-medium">₹{f.amount}</td>

                        <td className="p-3">
                          <button className="bg-green-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-green-700 transition">
                            Apply Now
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-3 text-center text-gray-500">
                        Fees information not available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ELIGIBILITY */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4">Admission Eligibility</h2>

            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                Candidate must have completed 12th from a recognized board.
              </li>
              <li>Minimum 50% marks required in qualifying examination.</li>
              <li>Entrance exam may be required for some courses.</li>
              <li>Personal interview may be conducted.</li>
            </ul>
          </div>

          {/* REVIEWS */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

            <div className="space-y-6">
              <div className="border-b pb-4">
                <h4 className="font-semibold">Rahul Sharma ⭐⭐⭐⭐</h4>
                <p className="text-gray-600 text-sm mt-2">
                  Great campus and faculty. The infrastructure is modern and
                  placements are good.
                </p>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-semibold">Anjali Verma ⭐⭐⭐⭐⭐</h4>
                <p className="text-gray-600 text-sm mt-2">
                  One of the best universities for management studies. Faculty
                  support is amazing.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Amit Kumar ⭐⭐⭐⭐</h4>
                <p className="text-gray-600 text-sm mt-2">
                  Good environment for learning and excellent facilities for
                  students.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:sticky lg:top-28 h-fit space-y-6 w-full">
          {/* ENQUIRY FORM */}
          <div className="bg-white shadow-sm rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-5">Apply for Admission</h3>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-md"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-md"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded-md"
              />

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full border p-3 rounded-md"
              >
                <option>Select Course</option>

                {college.courses.map((course, i) => (
                  <option key={i}>{course}</option>
                ))}
              </select>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition"
              >
                Submit Application
              </button>
            </div>
          </div>

          {/* SOCIAL CONNECTION */}
          <div className="bg-white shadow-sm rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-6">Social Connections</h3>

            <div className="flex justify-center gap-6 text-2xl">
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white hover:scale-110 transition"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>

              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:scale-110 transition"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white hover:scale-110 transition"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white hover:scale-110 transition"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
@keyframes scroll {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-scroll {
  animation: scroll 35s linear infinite;
}

.animate-scroll-reverse {
  animation: scroll 35s linear infinite reverse;
}
`}
      </style>
    </div>
  );
};

export default CollegeDetails;
