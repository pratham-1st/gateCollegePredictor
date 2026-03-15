const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/request-college", async (req, res) => {

  const { collegeName, program, discipline } = req.body;

  try {

    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {
        user: "prathamsinghchouhan14@gmail.com",
        pass: "klwr dgmi syqm xhsn"
      }

    });

    const mailOptions = {

      from: "YOUR_EMAIL@gmail.com",
      to: "YOUR_EMAIL@gmail.com",

      subject: "New College Request - GATE Predictor",

      text: `
New College Request Received

College: ${collegeName}
Program: ${program}
Discipline: ${discipline}

      `

    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Request sent successfully" });

  } catch (error) {

    res.status(500).json({ error: "Email sending failed" });

  }

});

module.exports = router;