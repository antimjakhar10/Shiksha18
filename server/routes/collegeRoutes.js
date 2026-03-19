const express = require("express");
const router = express.Router();
const College = require("../models/College");

/* =========================
   ✅ IMPORTANT ROUTES (TOP)
========================= */

// ALL colleges (admin)
router.get("/all", async (req, res) => {
  try {
    const colleges = await College.find().sort({ _id: -1 });
    res.json(colleges);
  } catch (err) {
    console.log("ALL ERROR:", err);
    res.status(500).json(err);
  }
});

// ONLY approved (website)
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find({
      status: "approved",
    }).sort({ _id: -1 });
    res.json(colleges);
  } catch (err) {
    res.status(500).json(err);
  }
});

// pending (admin)
router.get("/pending/all", async (req, res) => {
  try {
    const colleges = await College.find({
      status: "pending",
    });
    res.json(colleges);
  } catch (err) {
    res.status(500).json(err);
  }
});

// user colleges
router.get("/user/:userId", async (req, res) => {
  try {
    const colleges = await College.find({
      userId: req.params.userId,
    }).sort({ _id: -1 });

    res.json(colleges);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =========================
   ➕ ADD / UPDATE / DELETE
========================= */

// ADD
router.post("/add", async (req, res) => {
  try {
    const college = new College({
      ...req.body,
      status:
        req.body.addedBy === "admin"
          ? "approved"
          : "pending",
    });

    await college.save();
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
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
   🔥 STATUS UPDATE (MAIN)
========================= */
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await College.findByIdAndUpdate(req.params.id, {
      status: status,
    });

    res.json({ message: "Status updated" });
  } catch (err) {
    console.log("STATUS ERROR:", err);
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        status: req.body.status || "pending", // ✅ FIX
      },
      { new: true }
    );

    res.json(updatedCollege);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

/* =========================
   🎯 FILTER APIs
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
    const state =
      parts.length > 1 ? parts[1].trim() : parts[0];
    states.add(state);
  });

  res.json(Array.from(states));
});

/* =========================
   ⚠️ ALWAYS LAST
========================= */

router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    res.json(college);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;