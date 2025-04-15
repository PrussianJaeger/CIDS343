import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import './App.css';

import HomePage from "./HomePage";
import AccountPage from "./AccountPage";
import SavingsPage from "./SavingsPage";
import SpendingsPage from "./SpendingsPage";
import SettingsPage from "./SettingsPage";
import Header from "./Header";
import Footer from "./Footer";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import LearnPage from "./LearnPage";
import AuthPopup from "./components/AuthPopup";


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

  return (
    <>
      <Router>
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/savings">Savings</Link>
            <Link to="/spendings">Spendings</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/learn">Learn</Link>
          </div>
          <div className="auth-buttons">
            <button className="auth-button" onClick={() => setShowLogin(true)}>Login</button>
            <button className="auth-button" onClick={() => setShowSignup(true)}>Sign Up</button>
          </div>
        </nav>

        <AuthPopup isOpen={showLogin} onClose={() => setShowLogin(false)} isLogin={true} />
        <AuthPopup isOpen={showSignup} onClose={() => setShowSignup(false)} isLogin={false} />

        <Header />
          
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