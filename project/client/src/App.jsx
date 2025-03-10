import React, { useState, useEffect } from "react";

function App() {
  const [backendData, setBackendData] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data.name); // Assuming the API returns an object with a 'name' key
      });
  }, []);

  return (
    <div>
      {backendData === "" ? (
        <p>Loading...</p>
      ) : (
        <p>{backendData}</p> // Display the name from the API
      )}
    </div>
  );
}

export default App;