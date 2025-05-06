import React, { useState, useEffect } from 'react';
import './AuthPopup.css';

function AuthPopup({ isOpen, onClose, isLogin = true, children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "signin" : "signup";

    const response = await fetch(`http://localhost:5001/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      fetchCurrentUser();
      onClose();
      window.location.reload();
    } else {
      alert(data.error || `${isLogin ? "Login" : "Signup"} failed`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>

        {children ? (
          children
        ) : (
          <>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
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
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPopup;