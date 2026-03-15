import College from "../models/college.js";

export const predictColleges = async (req, res) => {
  try {
    const { score, category, discipline, year } = req.body;

    if (!score || !category || !discipline || !year) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const query = {
      discipline,
      year,
      [`cutoffs.${category}`]: { $lte: score },
    };

    const colleges = await College.find(query).sort({
      [`cutoffs.${category}`]: -1,
    });

    res.json({
      count: colleges.length,
      colleges,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};