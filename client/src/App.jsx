import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import HomePage from './HomePage';
import AccountPage from './AccountPage';
import SavingsPage from './SavingsPage';
import SpendingsPage from './SpendingsPage';
import SettingsPage from './SettingsPage';
import LearnPage from './LearnPage';
import AuthPopup from './components/AuthPopup'
import React, { useContext } from "react";
import { UserContext } from "./UserContext";


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <Header className={"header"}/>

      <Router>
        <nav className="navbar">

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/savings">Savings</Link>
            <Link to="/spendings">Spendings</Link>
            <Link to="/learn">Learn</Link>
          </div>

          <div className="auth-buttons">
            { !currentUser ? (
              <div>
                <button className="auth-button" onClick={() => setShowLogin(true)}>Login</button>
                <button className="auth-button" onClick={() => setShowSignup(true)}>Sign Up</button>
              </div>
            ) : (
              //<p>Welcome, {currentUser.email}!</p>
              //<Link className="auth-button" to="/account">{currentUser.email}</Link>
                <Link id="auth-button" to="/account">Account</Link>
            )} 
          </div>
        </nav>

        <AuthPopup isOpen={showLogin} onClose={() => setShowLogin(false)} isLogin={true} />
        <AuthPopup isOpen={showSignup} onClose={() => setShowSignup(false)} isLogin={false} />
          
          <br />
        <div  className="primary">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/savings" element={<SavingsPage />} />
            <Route path="/spendings" element={<SpendingsPage />} />
            <Route path="/learn/*" element={<LearnPage />} />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;