import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import SavingTopic from './components/learn/SavingTopic';
import InvestingTopic from './components/learn/InvestingTopic';
import BudgetingTopic from './components/learn/BudgetingTopic';
import './components/learn/LearnPage.css';

function LearnPage() {
  return (
    <div className="learn-page">
      <h1>Financial Learning Center</h1>
      <div className="learn-navigation">
        <Link to="/learn/saving" className="topic-link">Saving Money</Link>
        <Link to="/learn/investing" className="topic-link">Investing Basics</Link>
        <Link to="/learn/budgeting" className="topic-link">Budgeting 101</Link>
      </div>

    <Routes className="topic-content">
      <Route path="saving" element={<SavingTopic />} />
      <Route path="investing" element={<InvestingTopic />} />
      <Route path="budgeting" element={<BudgetingTopic />} />
      <Route path="/" element={
        <div className="welcome-message">
          <h2>Welcome to the Learning Center</h2>
          <p>Select a topic above to start learning about personal finance.</p>
        </div>
      } />
    </Routes>
    </div>
  );
}

export default LearnPage;