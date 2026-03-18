import { useState, useEffect } from "react";
import "../src/App.css"
function App() {

  const [score, setScore] = useState("");
  const [category, setCategory] = useState("GEN");
  const [discipline, setDiscipline] = useState("CS");
  const [year, setYear] = useState("2024");
  const [results, setResults] = useState([]);
  const [instituteType,setInstituteType] = useState("ALL");
  const [visitors, setVisitors] = useState(0);
  const [collegeName, setCollegeName] = useState("");
  const [programName, setProgramName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  fetch("https://gatecollegepredictor-0.onrender.com/api/visit")
    .then(res => res.json())
    .then(data => setVisitors(data.visitors))
    .catch(err => console.log(err));

}, []);

const handleCollegeRequest = async () => {

  const response = await fetch("https://gatecollegepredictor-0.onrender.com/api/request/request-college", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      collegeName,
      program: programName,
      discipline
    })

  });

  const data = await response.json();

  alert("Request sent! I will add this college soon.");

  // CLEAR INPUT FIELDS
  setCollegeName("");
  setProgramName("");

};

  const handlePredict = async () => {

    setLoading(true);
    setResults([]);
    const response = await fetch("https://gatecollegepredictor-0.onrender.com/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        score: Number(score),
        instituteType,
        category,
        discipline,
        year: Number(year)
      })
    });

    const data = await response.json();

    const processedResults = data.map((item) => {

  const difference = Number(score) - Number(item.cutoff);

  const k = 0.05;

  let probability = 100 / (1 + Math.exp(-k * difference));

  probability = Math.round(probability);

  if (probability > 95) probability = 95;
  if (probability < 5) probability = 5;

  return {
    ...item,
    probability
  };

});

// 👇 REPLACE OLD SORT WITH NEW ONE HERE
const priorityOrder = {
  IIT: 1,
  NIT: 2,
  IIIT: 3,
  "Public University": 4
};

processedResults.sort((a, b) => {
  const pA = priorityOrder[a.instituteType] || 5;
  const pB = priorityOrder[b.instituteType] || 5;

  if (pA !== pB) return pA - pB;

  return b.probability - a.probability;
});

setResults(processedResults);

setLoading(false);
  };

  const topMatches = results.filter(
  (item) => item.status === "SAFE" || item.status === "MODERATE"
  ).slice(0, 3);

  return (
    <div id="home" style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>GATE College Predictor 2026</h1>

      {results.length>0 && (
      <p style={{color:"gray", padding: "20px"}}>
      🔥 {visitors} students predicted chances
      </p>
      )
      }
      <div id="home-bar">
        <input
        placeholder="Enter GATE Score"
        value={score} maxLength={1000}
        onChange={(e) => setScore(e.target.value)}
      />

      <select onChange={(e)=>setInstituteType(e.target.value)}>

      <option value="ALL">All</option>
      <option value="IIT">IIT</option>
      <option value="NIT">NIT</option>
      <option value="IIIT">IIIT</option>
      <option value="Public University">Public Universities</option>

      </select>

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="GEN">GEN</option>
        <option value="OBC">OBC</option>
        <option value="SC">SC</option>
        <option value="ST">ST</option>
        <option value="EWS">EWS</option>
      </select>

      <select onChange={(e) => setDiscipline(e.target.value)}>
        <option value="CSE">CS/IT</option>
        <option value="DA">DA</option>
      </select>

      <button onClick={handlePredict} disabled={loading}>
      {loading ? "Predicting..." : "Predict Colleges"}
      </button>

      {loading && (
      <div className="loader-container">
      <div className="loader"></div>
      <p>Finding best colleges for you... 🚀</p>
      </div>
      )}

      <hr />
      <p>Based on latest GATE 2025 cutoffs</p>
      </div>

      

 {!loading && topMatches.length > 0 && (
  <div className="top-matches">

    <h2>⭐ Top Matches For You</h2>

    <div className="top-container">
      {topMatches.map((item, index) => (
        <div className="top-card" key={index}>
          <h3>{item.institute}</h3>
          <p>{item.program}</p>
          <p>{item.probability}%</p>
        </div>
      ))}
    </div>

  </div>
)}

{!loading && results.length > 0 && (

  <div className="results-table">

    <h2>Admission Probability Results</h2>

    <table>

      <thead>
        <tr>
          <th>Rank</th>
          <th>Institute</th>
          <th>Type</th>
          <th>Program</th>
          <th>Cutoff</th>
          <th>Your Score</th>
          <th>Probability</th>
        </tr>
      </thead>

      <tbody>

        {results.map((item, index) => (

          <tr key={index}>

            <td>{index + 1}</td>
            <td>{item.institute}</td>
            <td>{item.instituteType}</td>
            <td>{item.program}</td>
            <td>{item.cutoff}</td>
            <td>{score}</td>
            <td>{item.probability}%</td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

)}

<hr />

{!loading && results.length>0 && (

<div className="college-request">

  <h2>Can't find your college?</h2>

  <p>Send it to us and we will add it to the predictor.</p>

  <div className="request-form">

    <input
      placeholder="College Name"
      value={collegeName}
      onChange={(e)=>setCollegeName(e.target.value)}
    />

    <input
      placeholder="Program (Example: MTech CSE)"
      value={programName}
      onChange={(e)=>setProgramName(e.target.value)}
    />

    <button onClick={handleCollegeRequest}>
      Send Request
    </button>

  </div>

</div>
)}

<p className="footer-p">Made with ❤️ by Pratham</p>

    </div>
  );
}

export default App;