import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function IncomeVsSpendingPage() {
  const { user } = useContext(UserContext);
  const [salary, setSalary] = useState(0);
  const [spending, setSpending] = useState(0);

  useEffect(() => {
    if (!user?.email) return;

    // Fetch salary
    fetch('http://localhost:5001/get-salary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.salary !== undefined) setSalary(data.salary);
      });

    // Fetch spending
    fetch('http://localhost:5001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.transactions)) {
          const totalSpent = data.transactions.reduce(
            (sum, tx) => sum + (tx.amount || 0),
            0
          );
          setSpending(totalSpent);
        }
      });
  }, [user]);

  const chartData = {
    labels: ['Income', 'Spending'],
    datasets: [
      {
        label: 'Monthly Totals ($)',
        data: [salary, spending],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  return (
    <div className="page">
      <h1>Income vs Spending</h1>
      <p>This chart shows a visual comparison between your monthly income and your current total spending, giving you more tools to help save money.</p>
      <div style={{ maxWidth: '500px', margin: '30px auto' }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default IncomeVsSpendingPage;
