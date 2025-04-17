import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import LearnPage from "./LearnPage";
import Home from './HomePage';
import Account from './AccountPage';
import Savings from './SavingsPage';
import Spendings from './SpendingsPage';
import Settings from './SettingsPage';
import AuthPopup from './components/AuthPopup'
import React, { useContext } from "react";
import { UserContext } from "./UserContext";


function Learn() {
  return (
    <>
      <LearnPage></LearnPage>
    </>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <Header />

      <Router>
        <nav className="navbar">

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/savings">Savings</Link>
            <Link to="/spendings">Spendings</Link>
            <Link to="/settings">Settings</Link>
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
              <Link className="auth-button" to="/account">{currentUser.email}</Link>
            )} 
          </div>
        </nav>

        <AuthPopup isOpen={showLogin} onClose={() => setShowLogin(false)} isLogin={true} />
        <AuthPopup isOpen={showSignup} onClose={() => setShowSignup(false)} isLogin={false} />
          
          <br />
          
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/spendings" element={<Spendings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/learn/*" element={<Learn />} />

        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;