import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';


function SpendingsPage() {
  const { currentUser } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [originalTransactions, setOriginalTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    if (currentUser) {
      fetchTransactions();
    }
  }, [currentUser]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5001/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: currentUser.email })
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
        setOriginalTransactions(data.transactions); // save original
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: null, direction: null }; // reset
      }
      return { key, direction: 'asc' };
    });
  };

  const getMonthlySpendingData = (transactions) => {
    const monthlyTotals = {};
  
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const key = `${month}-${year}`; 
  
      if (!monthlyTotals[key]) {
        monthlyTotals[key] = 0;
      }
      monthlyTotals[key] += t.amount;
    });
  
    return Object.entries(monthlyTotals)
      .sort(([a], [b]) => {
        const [monthA, yearA] = a.split('-').map(Number);
        const [monthB, yearB] = b.split('-').map(Number);
        return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
      })
      .map(([month, total]) => ({
        month,
        total: parseFloat(total.toFixed(2)),
      }));
  };

  const getSortedTransactions = () => {
    if (!sortConfig.key) return originalTransactions;

    const sorted = [...transactions].sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      if (sortConfig.key === 'date') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const response = await fetch('http://localhost:5001/add-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: currentUser.email,
          amount: parseFloat(newTransaction.amount),
          description: newTransaction.description,
          category: newTransaction.category
        })
      });

      if (response.ok) {
        setNewTransaction({ amount: '', description: '', category: '' });
        fetchTransactions(); // refresh data
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  if (!currentUser) return <p>Please log in to view your transactions.</p>;

  const sortedTransactions = getSortedTransactions();
  const totalSpending = sortedTransactions.reduce((sum, t) => sum + t.amount, 0);


  const getSortSymbol = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? '🔼' : '🔽';
  };

  return (
    <div className="page">
      <h2>Your Transactions</h2>
      
      <div className="content">
        <h3>Add New Transaction</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={newTransaction.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={newTransaction.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit">Add Transaction</button>
        </form>
      </div>

      <div className="content">
        <h3>Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                  Date {getSortSymbol('date')}
                </th>
                <th onClick={() => handleSort('description')} style={{ cursor: 'pointer' }}>
                Description {getSortSymbol('description')}
                </th>
                <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                  Category {getSortSymbol('category')}
                </th>
                <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
                  Amount {getSortSymbol('amount')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.transactionId}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                <td style={{ fontWeight: 'bold' }}>${totalSpending.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
      <div className="content" id="chart">
        <h3>Monthly Spending</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getMonthlySpendingData(transactions)}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default SpendingsPage;
