import React, { useState } from "react";
import "../css/json.css";
import "../css/landing.css";
import BackButton from "../backButton";
import GitAbsolute from "../gitAbsolute";
import Footer from "../footer";

export default function JSONPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({});

  const handleInputChange = (e) => {
    const input = e.target.value;
    setJsonInput(input);

    try {
      const parsed = JSON.parse(input);
      setParsedJson(parsed);
      setError("");
    } catch (err) {
      setParsedJson(null);
      setError("Invalid JSON");
    }
  };

  const toggleExpand = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderJson = (data, path = "") => {
    if (typeof data === "object" && data !== null) {
      return (
        <ul>
          {Object.entries(data).map(([key, value]) => {
            const currentPath = path ? `${path}.${key}` : key;
            const isExpanded = expanded[currentPath];

            return (
              <li key={currentPath}>
                <strong>{key}:</strong>
                {Array.isArray(value) ? (
                  <>
                    <button onClick={() => toggleExpand(currentPath)} className="expandButton">
                      {isExpanded ? "Collapse" : "Expand"}
                    </button>
                    {isExpanded && renderJson(value, currentPath)}
                  </>
                ) : typeof value === "object" && value !== null ? (
                  renderJson(value, currentPath)
                ) : (
                  <span> {String(value)}</span>
                )}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return <span>{String(data)}</span>;
    }
  };

  return (
    <main className="mainContainer">
        <BackButton />
        <GitAbsolute />
      <h1 className="title">JSON Visualizer</h1>
      <p className="subTitle">Just paste your JSON in the input field</p>
      <div className="container">
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder="Paste your JSON here"
          className="jsonInput"
          rows="10"
          cols="50"
        />
        {error && <p className="errorJson" style={{ color: "white" }}>{error}</p>}
        <div className="formattedJSON">
          <div className="parseJSON">
            {parsedJson ? (
              renderJson(parsedJson)
            ) : (
              <p className="noJson">No valid JSON to display</p>
            )}
          </div>
        </div>
      </div>
        <Footer />
    </main>
  );
}
