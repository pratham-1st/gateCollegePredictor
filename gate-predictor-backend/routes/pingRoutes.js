const express = require("express");

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({
    status: "alive",
    message:"Server is running",
    time: new Date()
  });
});

module.exports = router;