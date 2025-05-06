import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

function SavingsPage() {
  const { currentUser } = useContext(UserContext);
  const [salary, setSalary] = useState('');
  const [storedSalary, setStoredSalary] = useState(0);
  const save75percent = storedSalary * .25;
  const save50percent = storedSalary * .50;
  const save25percent = storedSalary * .75;

  useEffect(() => {
    if (currentUser) {
      fetchSalary();
    }
  }, [currentUser]);

  const fetchSalary = async () => {
    try {
      const res = await fetch('http://localhost:5001/get-salary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: currentUser.email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStoredSalary(data.salary || 0);
      } else {
        console.error(data.error || 'Error fetching salary');
        setStoredSalary(0);
      }
    } catch (err) {
      console.error('Failed to fetch salary:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const parsedSalary = parseFloat(salary);
    if (isNaN(parsedSalary) || parsedSalary < 0) {
      return alert('Please enter a valid salary amount.');
    }

    try {
      const res = await fetch('http://localhost:5001/set-salary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: currentUser.email, salary: parsedSalary }),
      });

      const data = await res.json();
      if (res.ok) {
        setStoredSalary(parsedSalary);
        console.log()
      } else {
        alert(data.error || 'Failed to update salary');
      }
    } catch (err) {
      console.error('Failed to update salary:', err);
    }
  };

  if (!currentUser) return <p>Please log in.</p>;

  return (
      <div className="page">
        <div className="content">
          <h3>Monthly Salary</h3>
          <p>Current Salary: ${storedSalary}</p>

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter monthly salary"
              min="0"
              step="0.01"
              required
            />
            <button type="submit" id="saveSalaryButton">Save Salary</button>
            <div id="savingSplits">
            <h3>Savings splits:</h3>
            <p>If you save 75% of your income, 
              you can spend: ${save75percent} monthly</p>
            <p>If you save 50% of your income,
              you can spend: ${save50percent} monthly</p>
            <p>If you save 25% of your income,
              you can spend: ${save25percent} monthly</p>
            </div>
          </form>
        </div>
      </div>
  );
}

export default SavingsPage;