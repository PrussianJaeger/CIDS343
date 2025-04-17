import React, { useState, useEffect } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/signin", {
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
      alert(data.error || "Login failed");
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:5001/profile", {
        method: "GET",
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
      setCurrentUser(null);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
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
    </div>
  );
};

export default SignIn;