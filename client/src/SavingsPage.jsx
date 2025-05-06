import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

function SavingsPage() {
  const { currentUser } = useContext(UserContext);

  const [monthlySalary, setMonthlySalary] = useState('');
  const [monthlyGoal, setMonthlyGoal] = useState('');
  const [monthlySoFar, setMonthlySoFar] = useState(0);
  const [globalTotal, setGlobalTotal] = useState(0);

  useEffect(() => {
    if (currentUser) {
      fetchSavingsData();
    }
  }, [currentUser]);

  const fetchSavingsData = async () => {
    try {
      const res = await fetch('http://localhost:5001/get-savings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: currentUser.email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMonthlySalary(data.monthlySalary || 0);
        setMonthlyGoal(data.monthly_goal || 0);
        setMonthlySoFar(data.total_monthly_savings || 0);
        setGlobalTotal(data.total_savings || 0);
      }
    } catch (err) {
      console.error('Failed to fetch savings data:', err);
    }
  };

  const updateSavingsField = async (field, value) => {
    try {
      const res = await fetch('http://localhost:5001/update-savings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: currentUser.email, field, value }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleSubmit = async (e, field, valueSetter) => {
    e.preventDefault();
    const parsed = parseFloat(valueSetter);
    if (isNaN(parsed) || parsed < 0) return alert('Enter a valid number');
    await updateSavingsField(field, parsed);
    fetchSavingsData();
  };

  const handleIncrement = async (delta) => {
    const updatedMonthly = monthlySoFar + delta;
    const updatedGlobal = globalTotal + delta;

    setMonthlySoFar(updatedMonthly);
    setGlobalTotal(updatedGlobal);

    await updateSavingsField('total_monthly_savings', updatedMonthly);
    await updateSavingsField('total_savings', updatedGlobal);
  };

  if (!currentUser) return <p>Please log in.</p>;

  return (
    <div className="page">
      <div className="content">
        <h3>Monthly Salary</h3>
        <p>Current: ${monthlySalary}</p>
        <form onSubmit={(e) => handleSubmit(e, 'monthlySalary', monthlySalary)}>
          <input
            type="number"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(e.target.value)}
            placeholder="Enter monthly salary"
            min="0"
            step="0.01"
            required
          />
          <button type="submit">Save Salary</button>
        </form>
      </div>

      <div className="content">
        <h3>Monthly Savings Goal</h3>
        <p>Goal: ${monthlyGoal}</p>
        <form onSubmit={(e) => handleSubmit(e, 'monthly_goal', monthlyGoal)}>
          <input
            type="number"
            value={monthlyGoal}
            onChange={(e) => setMonthlyGoal(e.target.value)}
            placeholder="Enter monthly savings goal"
            min="0"
            step="0.01"
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