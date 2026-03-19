import { useState, useEffect } from "react";
import axios from "axios";
import "./FormLayout.css";
import "./AddCollege.css";

function AddCollege({ isAdmin = false }) {
  const [streams, setStreams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [selectedPlacements, setSelectedPlacements] = useState([]);
  const [showAllStreams, setShowAllStreams] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [showAllPlacements, setShowAllPlacements] = useState(false);

  const [newPlacement, setNewPlacement] = useState({
    name: "",
    avgPackage: "",
    highestPackage: "",
    logo: "",
  });

  useEffect(() => {
    fetchStreams();
    fetchCourses();
    fetchFacilities();
    fetchPlacements();
  }, []);

  const fetchStreams = async () => {
    const res = await axios.get("https://shiksha18.onrender.com/api/streams");
    setStreams(res.data);
  };

  const fetchCourses = async () => {
    const res = await axios.get("https://shiksha18.onrender.com/api/courses");
    setCourses(res.data);
  };

  const fetchFacilities = async () => {
    const res = await axios.get(
      "https://shiksha18.onrender.com/api/facilities",
    );
    setFacilities(res.data);
  };

  const fetchPlacements = async () => {
    const res = await axios.get(
      "https://shiksha18.onrender.com/api/placements",
    );
    setPlacements(res.data);
  };

  const [college, setCollege] = useState({
    name: "",
    type: "University",
    location: "",
    streams: [],
    description: "",
    courses: "",
    facilities: "",
    fees: [{ course: "", duration: "", amount: "" }],
    image: "",
    images: [],
    seoTitle: "",
    seoDescription: "",
    seoTags: "",
  });

  const handleChange = (e) => {
    setCollege({ ...college, [e.target.name]: e.target.value });
  };

  const handleStreamSelect = (stream) => {
    if (college.streams.includes(stream)) {
      setCollege({
        ...college,
        streams: college.streams.filter((s) => s !== stream),
      });
    } else {
      setCollege({
        ...college,
        streams: [...college.streams, stream],
      });
    }
  };

  const handleCourseSelect = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleFacilitySelect = (facility) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  const handlePlacementSelect = (placement) => {
    if (selectedPlacements.includes(placement)) {
      setSelectedPlacements(selectedPlacements.filter((p) => p !== placement));
    } else {
      setSelectedPlacements([...selectedPlacements, placement]);
    }
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const res = await axios.post(
      "https://shiksha18.onrender.com/upload",
      formData,
    );

    setCollege({
      ...college,
      image: res.data.image,
    });
  };

  const handleFeeChange = (index, field, value) => {
    const updatedFees = [...college.fees];
    updatedFees[index][field] = value;

    setCollege({
      ...college,
      fees: updatedFees,
    });
  };

  const addFeeRow = () => {
    setCollege({
      ...college,
      fees: [...college.fees, { course: "", duration: "", amount: "" }],
    });
  };

  const removeFeeRow = (index) => {
    const updatedFees = college.fees.filter((_, i) => i !== index);

    setCollege({
      ...college,
      fees: updatedFees,
    });
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);

    const uploadedImages = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        "https://shiksha18.onrender.com/upload",
        formData,
      );

      uploadedImages.push(res.data.image);
    }

    setCollege({
      ...college,
      images: [...college.images, ...uploadedImages],
    });
  };

  const handlePlacementLogoUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const res = await axios.post(
      "https://shiksha18.onrender.com/upload",
      formData,
    );

    setNewPlacement({
      ...newPlacement,
      logo: res.data.image,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...college,
      streams: college.streams,
      courses: selectedCourses,
      facilities: selectedFacilities,
      placements: placements
        .filter((p) => selectedPlacements.includes(p.name))
        .map((p) => ({
          name: p.name,
          logo: p.logo,
        })),
      fees: college.fees,
      images: college.images,

      // 🔥 SEO FIX
      seoTitle: college.seoTitle,
      seoDescription: college.seoDescription,

      seoTags: college.seoTags
        ? college.seoTags.split(",").map((tag) => tag.trim())
        : [],
    };

    console.log("FINAL DATA:", formattedData);

    const user = JSON.parse(localStorage.getItem("user"));

    console.log("USER:", user);

    await axios.post("https://shiksha18.onrender.com/api/colleges/add", {
      ...formattedData,
      status: isAdmin ? "approved" : "pending",
      addedBy: isAdmin ? "admin" : "user",
      userId: user?.id, // 🔥 ONLY THIS
    });

    alert("College Added Successfully");
  };

  return (
    <div className="admin-form-page">
      <h1 className="admin-page-title">Add University/College</h1>

      <div className="admin-form-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          {/* TOP GRID */}

          <div className="college-top-grid">
            {/* LEFT COLUMN */}

            <div className="college-left">
              <div className="admin-form-group">
                <label>University/College Name</label>
                <input name="name" onChange={handleChange} />
              </div>

              <div className="admin-form-group">
                <label>University/College URL</label>
                <input name="url" />
              </div>

              <div className="admin-form-group">
                <label>University/College Logo</label>
                <input type="file" onChange={handleImageUpload} />
              </div>

              {college.image && (
                <img
                  src={`https://shiksha18.onrender.com${college.image}`}
                  className="logo-preview"
                />
              )}

              <div className="admin-form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={college.type}
                  onChange={handleChange}
                >
                  <option value="University">University</option>
                  <option value="College">College</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Popular College</label>
                <input
                  type="checkbox"
                  checked={college.isPopular || false}
                  onChange={(e) =>
                    setCollege({ ...college, isPopular: e.target.checked })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label>Top College</label>
                <input
                  type="checkbox"
                  checked={college.isTop || false}
                  onChange={(e) =>
                    setCollege({ ...college, isTop: e.target.checked })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label>Location</label>
                <input name="location" onChange={handleChange} />
              </div>
            </div>

            {/* RIGHT COLUMN */}

            <div className="college-right">
              <div className="admin-form-group">
                <label>University/College Description</label>
                <textarea
                  name="description"
                  rows="12"
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form-group">
                <label>SEO Title</label>
                <input
                  name="seoTitle"
                  value={college.seoTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-group">
                <label>SEO Description</label>
                <textarea
                  name="seoDescription"
                  value={college.seoDescription}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-group">
                <label>SEO Tags (comma separated)</label>
                <input
                  name="seoTags"
                  value={college.seoTags}
                  onChange={handleChange}
                />
              </div>

              {/* GALLERY */}

              <div className="admin-form-group">
                <label>Gallery Images</label>
                <input type="file" multiple onChange={handleGalleryUpload} />
              </div>

              <div className="gallery-preview">
                {college.images &&
                  college.images.map((img, index) => (
                    <img
                      key={index}
                      src={
                        img.startsWith("/uploads")
                          ? `https://shiksha18.onrender.com${img}`
                          : `https://shiksha18.onrender.com/uploads/${img}`
                      }
                      className="gallery-img"
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* STREAMS */}

          <div className="full-width-section">
            <div className="stream-header">
              <h3>Select Streams</h3>

              <div className="stream-controls">
                <input
                  type="text"
                  placeholder="Search"
                  className="stream-search"
                />

                <button
                  type="button"
                  className="add-stream-btn"
                  onClick={async () => {
                    const name = prompt("Enter Stream Name");

                    if (!name) return;

                    await axios.post(
                      "https://shiksha18.onrender.com/api/streams/add",
                      { name },
                    );

                    fetchStreams();
                  }}
                >
                  Add New Stream
                </button>
              </div>
            </div>

            <div
              className={`streams-grid ${!showAllStreams ? "mobile-limit" : ""}`}
            >
              {streams.map((stream) => (
                <div key={stream._id} className="stream-row">
                  <div className="stream-left">
                    <input
                      type="checkbox"
                      value={stream.name}
                      checked={college.streams.includes(stream.name)}
                      onChange={() => handleStreamSelect(stream.name)}
                    />

                    <span>{stream.name}</span>
                  </div>

                  <div className="stream-actions">
                    <button
                      className="edit-btn"
                      type="button"
                      onClick={async () => {
                        const newName = prompt("Edit Stream", stream.name);

                        if (!newName) return;

                        await axios.put(
                          `https://shiksha18.onrender.com/api/streams/${stream._id}`,
                          {
                            name: newName,
                          },
                        );

                        fetchStreams();
                      }}
                    >
                      ✏
                    </button>

                    <button
                      className="delete-btn"
                      type="button"
                      onClick={async () => {
                        if (!window.confirm("Delete Stream?")) return;

                        await axios.delete(
                          `https://shiksha18.onrender.com/api/streams/${stream._id}`,
                        );

                        fetchStreams();
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {streams.length > 6 && (
              <button
                type="button"
                className="view-more-btn"
                onClick={() => setShowAllStreams(!showAllStreams)}
              >
                {showAllStreams ? "Show Less" : "View All"}
              </button>
            )}
          </div>

          {/* COURSES */}

          <div className="full-width-section">
            <div className="stream-header">
              <h3>Select Courses</h3>

              <div className="stream-controls">
                <input
                  type="text"
                  placeholder="Search"
                  className="stream-search"
                />

                <button
                  type="button"
                  className="add-stream-btn"
                  onClick={async () => {
                    const name = prompt("Enter Course Name");

                    if (!name) return;

                    await axios.post(
                      "https://shiksha18.onrender.com/api/courses/add",
                      { name },
                    );

                    fetchCourses();
                  }}
                >
                  Add New Course
                </button>
              </div>
            </div>

            <div
              className={`streams-grid ${!showAllCourses ? "mobile-limit" : ""}`}
            >
              {courses.map((course) => (
                <div key={course._id} className="stream-row">
                  <div className="stream-left">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.name)}
                      onChange={() => handleCourseSelect(course.name)}
                    />

                    <span>{course.name}</span>
                  </div>

                  <div className="stream-actions">
                    <button
                      className="edit-btn"
                      type="button"
                      onClick={async () => {
                        const newName = prompt("Edit Course", course.name);

                        if (!newName) return;

                        await axios.put(
                          `https://shiksha18.onrender.com/api/courses/${course._id}`,
                          {
                            name: newName,
                          },
                        );

                        fetchCourses();
                      }}
                    >
                      ✏
                    </button>

                    <button
                      className="delete-btn"
                      type="button"
                      onClick={async () => {
                        if (!window.confirm("Delete Course?")) return;

                        await axios.delete(
                          `https://shiksha18.onrender.com/api/courses/${course._id}`,
                        );

                        fetchCourses();
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {courses.length > 6 && (
              <button
                type="button"
                className="view-more-btn"
                onClick={() => setShowAllCourses(!showAllCourses)}
              >
                {showAllCourses ? "Show Less" : "View All"}
              </button>
            )}
          </div>

          {/* FACILITIES */}

          <div className="full-width-section">
            <div className="stream-header">
              <h3>Select Facilities</h3>

              <div className="stream-controls">
                <input
                  type="text"
                  placeholder="Search"
                  className="stream-search"
                />

                <button
                  type="button"
                  className="add-stream-btn"
                  onClick={async () => {
                    const name = prompt("Enter Facility Name");

                    if (!name) return;

                    await axios.post(
                      "https://shiksha18.onrender.com/api/facilities/add",
                      { name },
                    );

                    fetchFacilities();
                  }}
                >
                  Add New Facility
                </button>
              </div>
            </div>

            <div
              className={`streams-grid ${!showAllFacilities ? "mobile-limit" : ""}`}
            >
              {facilities.map((facility) => (
                <div key={facility._id} className="stream-row">
                  <div className="stream-left">
                    <input
                      type="checkbox"
                      checked={selectedFacilities.includes(facility.name)}
                      onChange={() => handleFacilitySelect(facility.name)}
                    />

                    <span>{facility.name}</span>
                  </div>

                  <div className="stream-actions">
                    <button
                      className="edit-btn"
                      type="button"
                      onClick={async () => {
                        const newName = prompt("Edit Facility", facility.name);

                        if (!newName) return;

                        await axios.put(
                          `https://shiksha18.onrender.com/api/facilities/${facility._id}`,
                          {
                            name: newName,
                          },
                        );

                        fetchFacilities();
                      }}
                    >
                      ✏
                    </button>

                    <button
                      className="delete-btn"
                      type="button"
                      onClick={async () => {
                        if (!window.confirm("Delete Facility?")) return;

                        await axios.delete(
                          `https://shiksha18.onrender.com/api/facilities/${facility._id}`,
                        );

                        fetchFacilities();
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {facilities.length > 6 && (
              <button
                type="button"
                className="view-more-btn"
                onClick={() => setShowAllFacilities(!showAllFacilities)}
              >
                {showAllFacilities ? "Show Less" : "View All"}
              </button>
            )}
          </div>

          {/* PLACEMENTS */}

          <div className="full-width-section">
            <div className="stream-header">
              <h3>Select Placements</h3>

              <div className="stream-controls">
                <input
                  type="text"
                  placeholder="Search"
                  className="stream-search"
                />

                <div className="placement-form">
                  <input
                    placeholder="Placement Name"
                    value={newPlacement.name}
                    onChange={(e) =>
                      setNewPlacement({ ...newPlacement, name: e.target.value })
                    }
                  />

                  <input
                    placeholder="Average Package (LPA)"
                    value={newPlacement.avgPackage}
                    onChange={(e) =>
                      setNewPlacement({
                        ...newPlacement,
                        avgPackage: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="Highest Package (LPA)"
                    value={newPlacement.highestPackage}
                    onChange={(e) =>
                      setNewPlacement({
                        ...newPlacement,
                        highestPackage: e.target.value,
                      })
                    }
                  />

                  <input type="file" onChange={handlePlacementLogoUpload} />

                  <button
                    type="button"
                    className="add-stream-btn"
                    onClick={async () => {
                      await axios.post(
                        "https://shiksha18.onrender.com/api/placements/add",
                        newPlacement,
                      );

                      setNewPlacement({
                        name: "",
                        avgPackage: "",
                        highestPackage: "",
                        logo: "",
                      });

                      fetchPlacements();
                    }}
                  >
                    Add Placement
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`streams-grid ${!showAllPlacements ? "mobile-limit" : ""}`}
            >
              {placements.map((placement) => (
                <div key={placement._id} className="stream-row">
                  <div className="stream-left">
                    <input
                      type="checkbox"
                      checked={selectedPlacements.includes(placement.name)}
                      onChange={() => handlePlacementSelect(placement.name)}
                    />

                    <span>{placement.name}</span>
                  </div>

                  <div className="stream-actions">
                    <button
                      className="edit-btn"
                      type="button"
                      onClick={async () => {
                        const newName = prompt("Edit Company", placement.name);

                        if (!newName) return;

                        await axios.put(
                          `https://shiksha18.onrender.com/api/placements/${placement._id}`,
                          {
                            name: newName,
                          },
                        );

                        fetchPlacements();
                      }}
                    >
                      ✏
                    </button>

                    <button
                      className="delete-btn"
                      type="button"
                      onClick={async () => {
                        if (!window.confirm("Delete Company?")) return;

                        await axios.delete(
                          `https://shiksha18.onrender.com/api/placements/${placement._id}`,
                        );

                        fetchPlacements();
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {placements.length > 6 && (
              <button
                type="button"
                className="view-more-btn"
                onClick={() => setShowAllPlacements(!showAllPlacements)}
              >
                {showAllPlacements ? "Show Less" : "View All"}
              </button>
            )}
          </div>

          {/* FEES */}

          <div className="fees-section">
            <h3>Fees Structure</h3>

            {college.fees.map((fee, index) => (
              <div key={index} className="fee-row">
                <input
                  placeholder="Course"
                  value={fee.course}
                  onChange={(e) =>
                    handleFeeChange(index, "course", e.target.value)
                  }
                />

                <input
                  placeholder="Duration"
                  value={fee.duration}
                  onChange={(e) =>
                    handleFeeChange(index, "duration", e.target.value)
                  }
                />

                <input
                  placeholder="Fees"
                  value={fee.amount}
                  onChange={(e) =>
                    handleFeeChange(index, "amount", e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() => removeFeeRow(index)}
                  className="remove-fee"
                >
                  Remove
                </button>
              </div>
            ))}

            <button type="button" onClick={addFeeRow} className="add-fee">
              + Add Fee Row
            </button>
          </div>

          <button className="admin-submit-btn">Add University</button>
        </form>
      </div>
    </div>
  );
}

export default AddCollege;
