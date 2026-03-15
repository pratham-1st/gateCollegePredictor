const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const College = require("./models/college.js");

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const data = JSON.parse(
      fs.readFileSync("./iit_sample.json", "utf-8")
    );

    await College.deleteMany();
    console.log("Old Data Cleared");

    await College.insertMany(data);
    console.log("Data Imported Successfully 🚀");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();