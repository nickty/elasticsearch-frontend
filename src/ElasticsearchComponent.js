import React, { useState } from "react";
import axios from "axios";
import "./ElasticsearchComponent.css";

const ElasticsearchComponent = () => {
  const [index, setIndex] = useState("");
  const [id, setId] = useState("");
  const [body, setBody] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleIndex = async () => {
    setError(""); // Clear previous errors
    let parsedBody;

    try {
      parsedBody = JSON.parse(body);
    } catch (err) {
      setError("Invalid JSON format in body");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/index", {
        index,
        id,
        body: parsedBody,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3001/search", {
        params: { index, q: query },
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Elasticsearch with Node.js and React</h1>
      <div className="section">
        <h2>Index Document</h2>
        <input
          type="text"
          placeholder="Index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="textarea"
        />
        <button onClick={handleIndex} className="button">
          Index
        </button>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="section">
        <h2>Search</h2>
        <input
          type="text"
          placeholder="Index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input"
        />
        <button onClick={handleSearch} className="button">
          Search
        </button>
        <ul className="results">
          {results.map((result) => (
            <li key={result._id} className="result-item">
              {JSON.stringify(result._source)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ElasticsearchComponent;
