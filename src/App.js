import React, { useState } from "react";
import { add } from "./utils/utils"; // Import your add function
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setResult(""); // Reset result state

    try {
      const sum = add(numbers.replace(/\\n/g, "\n"));
      setResult(`✅ Sum is ${sum}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(`❌ Error: ${err.message}`);
      } else {
        setError("❌ An unknown error occurred");
      }
    }
  };

  return (
    <div className="main-wrapper">
      <h1>String Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="numbers">Enter numbers:</label>
          <input
            type="text"
            id="numbers"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="Enter numbers"
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Calculate
          </button>
        </div>
      </form>
      {result && <div className="result-message">{result}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default App;
