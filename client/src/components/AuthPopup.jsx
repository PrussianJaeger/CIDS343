import React, { useState, useEffect } from 'react';
import './AuthPopup.css';

function AuthPopup({ isOpen, onClose, isLogin }) {
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
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("sing in data: ", data);

    if (response.ok) {
      fetchCurrentUser();
      onClose(); // close popup
      window.location.reload();
    } else {
      alert(data.error || "Login failed");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      fetchCurrentUser();
      onClose(); // close popup
      window.location.reload();
    } else {
      alert(data.error || "Signup failed");
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

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={isLogin ? handleSignIn : handleSignUp}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPopup;
