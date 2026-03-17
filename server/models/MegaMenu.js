const mongoose = require("mongoose");

const MegaMenuSchema = new mongoose.Schema({

  stream: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  topColleges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College"
    }
  ],

  popularColleges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College"
    }
  ]

});

module.exports = mongoose.model("MegaMenu", MegaMenuSchema);