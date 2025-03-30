import React, { useState, useEffect } from "react";

function BackendDisplay() {

  const [backendData, setBackendData] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data.name); // Assuming the API returns an object with a 'name' key
      });
  }, []);

  return (
    <>
      <h3>Data from backend file</h3>
      {backendData === "" ? (
        <p>Loading...</p>
      ) : (
        <p>{backendData}</p> // Display the name from the API
      )}
    </>
  );
}

export default BackendDisplay;