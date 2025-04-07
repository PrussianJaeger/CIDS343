import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // store logged-in user

  const handleSignIn = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // ✅ Call your "get current user" function right after login
      fetchCurrentUser();
    } else {
      alert(data.error || "Login failed");
    }
  };

  // 🔄 This function grabs the currently logged-in user
  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:5001/profile");
      const userData = await res.json();
      setCurrentUser(userData.user);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>

      <div>
        {currentUser ? (
          <p>Welcome, {currentUser.email}</p>
        ) : (
          <p>You are logged in as Guest</p>
        )}
      </div>
    </div>
  );
};


export default SignIn;