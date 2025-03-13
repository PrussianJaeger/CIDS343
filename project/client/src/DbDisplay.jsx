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
      <div className="dbd">
        <h3>Data from MySQL DB</h3>
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
    </>
  );
}

export default DbDisplay;