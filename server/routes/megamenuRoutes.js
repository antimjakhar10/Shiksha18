const express = require("express");
const router = express.Router();
const MegaMenu = require("../models/MegaMenu");


router.post("/add", async (req, res) => {
  try {
    const menu = new MegaMenu(req.body);
    await menu.save();
    res.json(menu);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", async (req, res) => {
  const data = await MegaMenu.find()
    .populate("topColleges")
    .populate("popularColleges");

  res.json(data);
});


router.get("/stream/:stream", async (req, res) => {
  try {

    const College = require("../models/College");

    const colleges = await College.find({
      streams: req.params.stream
    });

    const locations = {};

    colleges.forEach((c) => {

      const parts = c.location?.split(",");

      const state =
        parts.length > 1
          ? parts[1].trim()
          : parts[0]?.trim();

      if (!locations[state]) {
        locations[state] = [];
      }

      locations[state].push(c);

    });

    const menu = await MegaMenu.findOne({
      stream: req.params.stream
    })
    .populate("topColleges")
    .populate("popularColleges");

    res.json({
      locations,
      popular: menu ? menu.popularColleges : [],
      top: menu ? menu.topColleges : []
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;