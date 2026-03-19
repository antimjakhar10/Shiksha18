const express = require("express");
const router = express.Router();
const College = require("../models/College");

/* =========================
   ✅ IMPORTANT ROUTES (TOP)
========================= */

// 🔥 ALL colleges (admin use)
router.get("/all", async (req, res) => {
  try {
    const colleges = await College.find().sort({ _id: -1 });
    res.json(colleges);
  } catch (err) {
    console.log("ALL ERROR:", err);
    res.status(500).json(err);
  }
});

// 🔥 ONLY approved (website use)
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find({ status: "approved" }).sort({ _id: -1 });
    res.json(colleges);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 🔥 pending (admin approval)
router.get("/pending/all", async (req, res) => {
  try {
    const colleges = await College.find({ status: "pending" });
    res.json(colleges);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 🔥 user colleges
router.get("/user/:userId", async (req, res) => {
  try {
    const colleges = await College.find({ userId: req.params.userId }).sort({ _id: -1 });
    res.json(colleges);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =========================
   ➕ ADD / UPDATE / DELETE
========================= */

// ADD (user → always pending)
router.post("/add", async (req, res) => {
  try {
    const college = new College({
      ...req.body,
      status: "pending",
      addedBy: "user",
    });

    await college.save();
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE (again pending)
router.put("/:id", async (req, res) => {
  try {
    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        status: "pending",
      },
      { new: true }
    );

    res.json(updatedCollege);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await College.findByIdAndDelete(req.params.id);
    res.json({ message: "College deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =========================
   ✅ APPROVAL SYSTEM
========================= */

router.put("/approve/:id", async (req, res) => {
  try {
    await College.findByIdAndUpdate(req.params.id, {
      status: "approved",
    });
    res.json({ message: "Approved" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/reject/:id", async (req, res) => {
  try {
    await College.findByIdAndUpdate(req.params.id, {
      status: "rejected",
    });
    res.json({ message: "Rejected" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =========================
   🎯 FILTER / STREAM APIs
========================= */

router.get("/stream/:stream", async (req, res) => {
  const colleges = await College.find({
    streams: req.params.stream,
    status: "approved",
  });
  res.json(colleges);
});

router.get("/streams", async (req, res) => {
  const streams = await College.distinct("streams");
  res.json(streams);
});

router.get("/locations/:stream", async (req, res) => {
  const colleges = await College.find({
    streams: req.params.stream,
    status: "approved",
  });

  const states = new Set();

  colleges.forEach((c) => {
    const parts = c.location?.split(",");
    const state = parts.length > 1 ? parts[1].trim() : parts[0];
    states.add(state);
  });

  res.json(Array.from(states));
});

/* =========================
   ⚠️ ALWAYS LAST (IMPORTANT)
========================= */

// ❌ dynamic route ALWAYS LAST
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;