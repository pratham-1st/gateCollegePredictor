require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const visitorRoute = require("./routes/visitorRoutes.js");
const pingRoute = require("./routes/pingRoutes.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// DB connection
connectDB();

//test route
app.get("/", (req,res) => {
    res.send("Backend is running.")
})

// Routes
app.use("/api/predict", require("./routes/predictRoutes"));
app.use("/api/colleges", require("./routes/collegeRoutes") );
app.use("/api", visitorRoute);
app.use("/api/request", require("./routes/requestRoutes"));
app.use("/api", pingRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));