const express = require("express")
const { predictCollege } = require("../controllers/predictController");
const College = require("../models/college.js");

const router = express.Router();

// GET all colleges
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/predict", predictCollege);

module.exports = router;