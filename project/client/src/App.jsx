import React, { useState, useEffect } from "react";

function App() {
  const [backendData, setBackendData] = useState("");
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5001/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data.name); // Assuming the API returns an object with a 'name' key
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5001/users') // Fetch from backend
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); // Store users in state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {backendData === "" ? (
        <p>Loading...</p>
      ) : (
        <p>{backendData}</p> // Display the name from the API
      )}
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}</li> // Display each user
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;