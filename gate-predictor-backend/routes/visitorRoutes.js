const express = require("express")
const Visitor = require("../models/visitorModel.js");

const router = express.Router();

router.get("/visit", async (req, res) => {

  try {

    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress;

    const existingVisitor = await Visitor.findOne({ ip });

    if (!existingVisitor) {

      await Visitor.create({ ip });

    }

    const totalVisitors = await Visitor.countDocuments();

    res.json({ visitors: totalVisitors });

  } catch (error) {

    res.status(500).json({ error: "Server error" });

  }

});

module.exports = router;