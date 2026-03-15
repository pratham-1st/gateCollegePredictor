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

  useEffect(() => {

  fetch("http://localhost:5000/api/visit")
    .then(res => res.json())
    .then(data => setVisitors(data.visitors))
    .catch(err => console.log(err));

}, []);

const handleCollegeRequest = async () => {

  const response = await fetch("http://localhost:5000/api/request/request-college", {

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

    const response = await fetch("http://localhost:5000/api/predict", {
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

processedResults.sort((a, b) => b.probability - a.probability);

setResults(processedResults);

console.log(processedResults)
  };

  const topMatches = results.filter(
  (item) => item.status === "SAFE" || item.status === "MODERATE"
  ).slice(0, 3);

  return (
    <div id="home" style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>GATE College Predictor 2026</h1>

      <p style={{color:"gray", padding: "20px"}}>
      🔥 {visitors} students have checked their chances
      </p>

      <div id="home-bar">
        <input
        placeholder="Enter GATE Score"
        value={score}
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

      <button onClick={handlePredict}>
        Predict Colleges
      </button>

      <hr />
      </div>

      

 {topMatches.length > 0 && (
  <div className="top-matches">

    <h2>⭐ Top Matches For You</h2>

    <div className="top-container">
      {topMatches.map((item, index) => (
        <div className="top-card" key={index}>
          <h3>{item.institute}</h3>
          <p>{item.discipline}</p>
        </div>
      ))}
    </div>

  </div>
)}

{results.length > 0 && (

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

<div className="college-request">

  <h2>🏫 Can't find your college?</h2>

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

    </div>
  );
}

export default App;