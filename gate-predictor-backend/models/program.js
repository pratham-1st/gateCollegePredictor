const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instituteType: {
    type: String, // IIT / NIT
    required: true
  },
  discipline: {
    type: String, // CSE, DA, AI
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  cutoffs: {
    GEN: Number,
    OBC: Number,
    SC: Number,
    ST: Number,
    EWS: Number
  }
});

module.exports = mongoose.model("Program", programSchema);