import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null); 

  const handleSignUp = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      fetchCurrentUser();
      window.location.reload();
    } else {
      alert(data.error || "Signup failed");
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:5001/profile", {
        credentials: "include",
      });
      const userData = await res.json();
      if (res.ok) {
        setCurrentUser(userData.user);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;