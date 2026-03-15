const Program = require("../models/college.js");

const predictCollege = async (req, res) => {
  try {
    const { score, instituteType, category, discipline, year } = req.body;

        let query = { discipline };

    if(instituteType !== "ALL"){
      query.instituteType = instituteType;
    }

    const programs = await Program.find(query);

    const results = programs
      .map(program1 => {
        const cutoff = program1.cutoffs[category];
        if (!cutoff) return null;

        let status = "";

        if (score >= cutoff + 30) status = "SAFE";
        else if (score >= cutoff) status = "MODERATE";
        else if (score >= cutoff - 20) status = "TOUGH";
        else return null;

        return {
          institute: program1.name,
          cutoff,
          status,
          instituteType: program1.instituteType,
          discipline:program1.discipline,
          program:program1.program,
          year
        };
      })
      .filter(Boolean);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { predictCollege };