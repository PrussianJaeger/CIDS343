import React from 'react';

function BudgetingTopic() {
  return (
    <div className="topic-content">
      <h2>Budgeting 101</h2>
      <div className="topic-section">
        <h3>What is Budgeting?</h3>
        <p>Budgeting is the process of creating a plan for your money. It helps you track your income and expenses, ensuring you have enough money for the things you need and want.</p>
      </div>
      <div className="topic-section">
        <h3>Budgeting Methods</h3>
        <ul>
          <li>50/30/20 Rule</li>
          <li>Zero-Based Budgeting</li>
          <li>Envelope System</li>
          <li>Pay Yourself First</li>
        </ul>
      </div>
    </div>
  );
}

export default BudgetingTopic; 