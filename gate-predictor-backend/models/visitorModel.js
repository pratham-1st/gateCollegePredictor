const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true
  },
  visitedAt: {
    type: Date,
    default: Date.now
  }
});

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
