import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import HomePage from './HomePage';
import AccountPage from './AccountPage';
import SavingsPage from './SavingsPage';
import SpendingsPage from './SpendingsPage';
import LearnPage from './LearnPage';
import AuthPopup from './components/AuthPopup'
import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import darkThemeImage from "./assets/dark-theme-white.svg";


function NavBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [darkModeState, setDarkMode] = useState(false);
  const { currentUser } = useContext(UserContext);


  return (
    <>
      <Router>
        <nav className="navbar">

          { currentUser ? (
            <div className="nav-links">
              <Link to="/" className="link">Home</Link>
              <Link to="/savings" className="link">Savings</Link>
              <Link to="/spendings" className="link">Spendings</Link>
              <Link to="/learn" className="link">Learn</Link>
            </div>
          ) : (
            <div className="nav-links">
              <Link to="/" className="link">Home</Link>
              <Link to="/learn" className="link">Learn</Link>
            </div>
          )}
      
          <div className="auth-buttons">
            <button id="darkButton" onClick={() => {setDarkMode(!darkModeState); darkMode();}}>
              <img src={darkThemeImage} alt="Dark Mode"/>
            </button>

            { !currentUser ? (
              <div>
                <button className="auth-button" onClick={() => setShowLogin(true)}>Login</button>
                <button className="auth-button" onClick={() => setShowSignup(true)}>Sign Up</button>
              </div>
            ) : (
                <Link className="auth-button" to="/account">Account</Link>
            )} 
          </div>
        </nav>

        <AuthPopup isOpen={showLogin} onClose={() => setShowLogin(false)} isLogin={true} />
        <AuthPopup isOpen={showSignup} onClose={() => setShowSignup(false)} isLogin={false} />
          
        <br />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/savings" element={<SavingsPage />} />
            <Route path="/spendings" element={<SpendingsPage />} />
            <Route path="/learn/*" element={<LearnPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default NavBar;

function darkMode() {
  document.querySelector("body").classList.toggle("dark-mode");
}