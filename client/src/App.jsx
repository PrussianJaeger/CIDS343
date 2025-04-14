import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./HomePage";
import AccountPage from "./AccountPage";
import SavingsPage from "./SavingsPage";
import SpendingsPage from "./SpendingsPage";
import SettingsPage from "./SettingsPage";
import CurrentUser from "./CurrentUser";

function Home() {
  return (
    <>
      <HomePage></HomePage>
    </>
  );
}

function Account() {
  return (
    <>
      <AccountPage></AccountPage>
    </>
  );
}

function Savings() {
  return (
    <>
      <SavingsPage></SavingsPage>
    </>
  );
}

function Spendings() {
  return (
    <>
      <SpendingsPage></SpendingsPage>
    </>
  );
}

function Settings() {
  return (
    <>
      <SettingsPage></SettingsPage>
    </>
  );
}

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
        <CurrentUser></CurrentUser>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/spendings" element={<Spendings />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;