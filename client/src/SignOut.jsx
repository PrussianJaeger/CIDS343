import React, { useContext } from "react";
import { UserContext } from "./UserContext"; // Import the UserContext

const SignOut = () => {
  const { setCurrentUser } = useContext(UserContext); // Access the setCurrentUser from context

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5001/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setCurrentUser(null); // Clear the current user state
        window.location.reload(); // Optionally refresh the page after logout
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default SignOut;