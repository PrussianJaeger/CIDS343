import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

function SavingsPage() {
  const { currentUser } = useContext(UserContext);

  // State for monthly salary (display and input)
  const [monthlySalaryDisplay, setMonthlySalaryDisplay] = useState('');
  const [monthlySalaryInput, setMonthlySalaryInput] = useState(''); // Initialize as empty

  // State for monthly goal (display and input)
  const [monthlyGoalDisplay, setMonthlyGoalDisplay] = useState('');
  const [monthlyGoalInput, setMonthlyGoalInput] = useState(''); // Initialize as empty

  // State for monthly savings so far and global total
  const [monthlySoFar, setMonthlySoFar] = useState(0);
  const [globalTotal, setGlobalTotal] = useState(0);

  useEffect(() => {
    if (currentUser) {
      fetchSavingsData();
    }
  }, [currentUser]);

  const fetchSavingsData = async () => {
    try {
      const response = await fetch('http://localhost:5001/get-savings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: currentUser.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMonthlySalaryDisplay(data.monthlySalary || '');
        setMonthlyGoalDisplay(data.monthly_goal || '');
        setMonthlySoFar(data.total_monthly_savings || 0);
        setGlobalTotal(data.total_savings || 0);
        // DO NOT set monthlySalaryInput or monthlyGoalInput here
      } else {
        console.error('Failed to fetch savings data:', data.error || response.statusText);
      }
    } catch (error) {
      console.error('Error fetching savings data:', error);
    }
  };

  const updateSavingsField = async (field, value) => {
    try {
      const response = await fetch('http://localhost:5001/update-savings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: currentUser.email, field, value }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || `Update failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating savings field:', error);
    }
  };

  const handleSubmit = async (event, field, inputValue, setDisplayValue) => {
    event.preventDefault();
    const parsedValue = parseFloat(inputValue);
    if (isNaN(parsedValue) || parsedValue < 0) {
      alert('Please enter a valid positive number.');
      return;
    }
    await updateSavingsField(field, parsedValue);
    await fetchSavingsData(); // Refresh data to update all displayed values
    // Optionally clear the input after successful submit:
    if (field === 'monthlySalary') setMonthlySalaryInput('');
    if (field === 'monthlyGoal') setMonthlyGoalInput('');
  };

  const handleIncrement = async (delta) => {
    const newMonthlySoFar = monthlySoFar + delta;
    const newGlobalTotal = globalTotal + delta;

    setMonthlySoFar(newMonthlySoFar);
    setGlobalTotal(newGlobalTotal);

    await updateSavingsField('totalMonthlySavings', newMonthlySoFar);
    await updateSavingsField('totalSavings', newGlobalTotal);
  };

  if (!currentUser) {
    return <p>Please log in to view your savings information.</p>;
  }

  return (
    <div className="page">
      <div className="content">
        <h3>Monthly Salary</h3>
        <p>Current: ${monthlySalaryDisplay}</p>
        <form onSubmit={(e) => handleSubmit(e, 'monthlySalary', monthlySalaryInput, setMonthlySalaryDisplay)}>
          <input
            type="number"
            value={monthlySalaryInput}
            onChange={(e) => setMonthlySalaryInput(e.target.value)}
            placeholder="Enter Value"
            min="0"
            step="1"
            required
          />
          <button type="submit">Save Salary</button>
        </form>
      </div>

      <div className="content">
        <h3>Monthly Savings Goal</h3>
        <p>Goal: ${monthlyGoalDisplay}</p>
        <form onSubmit={(e) => handleSubmit(e, 'monthlyGoal', monthlyGoalInput, setMonthlyGoalDisplay)}>
          <input
            type="number"
            value={monthlyGoalInput}
            onChange={(e) => setMonthlyGoalInput(e.target.value)}
            placeholder="Enter savings goal"
            min="0"
            step="1"
            required
          />
          <button type="submit">Save Goal</button>
        </form>
      </div>

      <div className="content">
        <h3>Monthly Savings So Far</h3>
        <p>Total: ${monthlySoFar}</p>
        <button onClick={() => handleIncrement(5)}>+5</button>
        <button onClick={() => handleIncrement(-5)} disabled={monthlySoFar < 10}>-5</button>
      </div>

      <div className="content">
        <h3>Total Savings (All Time)</h3>
        <p>${globalTotal.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default SavingsPage;