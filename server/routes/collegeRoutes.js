const express = require("express");
const router = express.Router();
const College = require("../models/College");

// GET all colleges
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find().sort({ _id: -1 });
    res.json(colleges);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET single college
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD college
router.post("/add", async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE college
router.put("/:id", async (req, res) => {
  try {
    const data = req.body;

    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id,
      {
        name: data.name,
        type: data.type,
        url: data.url,
        location: data.location,
        streams: data.streams || [],
        description: data.description,
        courses: data.courses || [],
        facilities: data.facilities || [],
        placements: data.placements || [],
        fees: data.fees || [],
        image: data.image,
        images: data.images || [],
        isPopular: data.isPopular,
        isTop: data.isTop,
      },
      { new: true },
    );

    res.json(updatedCollege);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE college
router.delete("/:id", async (req, res) => {
  try {
    await College.findByIdAndDelete(req.params.id);
    res.json({ message: "College deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stream/:stream", async (req, res) => {
  const colleges = await College.find({
    streams: req.params.stream,
  });

  res.json(colleges);
});

router.get("/streams", async (req, res) => {
  const streams = await College.distinct("streams");

  res.json(streams);
});

router.get("/by-stream-location/:stream", async (req, res) => {
  try {
    const colleges = await College.find({
      streams: req.params.stream,
    });

    const grouped = {};

    colleges.forEach((c) => {
      const parts = c.location?.split(",");

      const state = parts.length > 1 ? parts[1].trim() : parts[0]?.trim();

      if (!grouped[state]) {
        grouped[state] = [];
      }

      grouped[state].push(c);
    });

    res.json(grouped);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/mega-menu/:stream", async (req, res) => {
  try {
    const colleges = await College.find({
      streams: req.params.stream,
    });

    const grouped = {};

    colleges.forEach((c) => {
      const parts = c.location?.split(",");

      const state = parts.length > 1 ? parts[1].trim() : parts[0]?.trim();

      if (!grouped[state]) {
        grouped[state] = [];
      }

      grouped[state].push(c);
    });

    res.json(grouped);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/mega-menu-data/:stream", async (req, res) => {

const stream = req.params.stream;

const colleges = await College.find({
streams: stream
});

const locations = {};
const popular = [];
const top = [];

colleges.forEach((c)=>{

const parts = c.location?.split(",");

const state =
parts.length > 1
? parts[1].trim()
: parts[0]?.trim();

if(!locations[state]){
locations[state] = [];
}

locations[state].push(c);

if(c.isPopular){
popular.push(c);
}

if(c.isTop){
top.push(c);
}

});

res.json({
locations,
popular,
top
});

});

router.get("/courses/:stream", async (req, res) => {

try{

const stream = req.params.stream;

const colleges = await College.find({
streams: stream
});

let courses = new Set();

colleges.forEach(college => {

(college.courses || []).forEach(course => {

const c = course.toLowerCase();

/* ENGINEERING */
if(stream === "Engineering" && (
c.includes("tech") ||
c.includes("engineer") ||
c.includes("b.e") ||
c.includes("m.e")
)){
courses.add(course);
}

/* MANAGEMENT */
else if(stream === "Management" && (
c.includes("mba") ||
c.includes("bba") ||
c.includes("pgdm") ||
c.includes("management")
)){
courses.add(course);
}

/* COMPUTER APPLICATION */
else if(stream === "Computer Application" && (
c.includes("bca") ||
c.includes("mca") ||
c.includes("computer")
)){
courses.add(course);
}

/* NURSING */
else if(stream === "Nursing" && (
c.includes("nursing") ||
c.includes("gnm") ||
c.includes("anm")
)){
courses.add(course);
}

/* DESIGN */
else if(stream === "Design" && (
c.includes("design") ||
c.includes("b.des")
)){
courses.add(course);
}

/* LAW */
else if(stream === "Law" && (
c.includes("llb") ||
c.includes("law")
)){
courses.add(course);
}

/* PHARMACY */
else if(stream === "Pharmacy" && (
c.includes("pharm")
)){
courses.add(course);
}

/* AGRICULTURE */
else if(stream === "Agriculture" && (
c.includes("agri")
)){
courses.add(course);
}

});

});

res.json([...courses]);

}catch(err){
res.status(500).json(err);
}

});

router.get("/locations/:stream", async (req, res) => {

const colleges = await College.find({
streams: req.params.stream
});

const states = new Set();

colleges.forEach(c => {

const parts = c.location?.split(",");

const state =
parts.length > 1
? parts[1].trim()
: parts[0];

states.add(state);

});

res.json(Array.from(states));

});

module.exports = router;
