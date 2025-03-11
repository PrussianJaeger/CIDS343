import React, { useState, useEffect } from "react";

function DbDisplay() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/users') // Fetch from backend
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); // Store users in state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
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
    </>
  );
}

export default DbDisplay;