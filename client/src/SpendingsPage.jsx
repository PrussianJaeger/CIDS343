import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

function SpendingsPage() {
  const { currentUser } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
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
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({
      ...prev,
      [name]: value
    }));
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
        fetchTransactions(); // Refresh the transactions list
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  if (!currentUser) {
    return <p>Please log in to view your transactions.</p>;
  }

  return (
    <div className="page">
      <h2>Your Transactions</h2>
      
      <div className="content">
        <h3>Add New Transaction</h3>
        <form onSubmit={handleSubmit}>
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
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SpendingsPage;