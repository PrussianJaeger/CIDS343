import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./HomePage";
import AccountPage from "./AccountPage";
import SavingsPage from "./SavingsPage";
import SpendingsPage from "./SpendingsPage";
import SettingsPage from "./SettingsPage";
import Header from "./Header";
import Footer from "./Footer";


function App() {

  return (
    <>
      <Router>
        <nav className="navbar">
          <Link to="/">Home</Link> | 
          | <Link to="/account">Account</Link> | 
          | <Link to="/savings">Savings</Link> | 
          | <Link to="/spendings">Spendings</Link> |
          | <Link to="/settings">Settings</Link>
        </nav>

        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/spendings" element={<SpendingsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;