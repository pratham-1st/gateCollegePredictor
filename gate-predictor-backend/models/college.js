const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instituteType: {
      type: String,
      enum: ["IIT", "NIT", "IIIT", "Public University", "Other"],
      required: true,
    },
    discipline: { type: String, required: true },
    program: {type: String, required: true},
    year: { type: Number, required: true },
    cutoffs: {
      GEN: Number,
      OBC: Number,
      SC: Number,
      ST: Number,
      EWS: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);