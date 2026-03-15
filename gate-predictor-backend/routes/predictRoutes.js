const express = require("express");
const router = express.Router();
const { predictCollege } = require("../controllers/predictController");

router.post("/", predictCollege);

module.exports = router;