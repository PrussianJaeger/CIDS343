import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "./UserContext";

function Transactions() {
  const { currentUser } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchTransactions();
    }
  }, [currentUser]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5001/transactions", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      console.log('Fetched transactions:', data);

      if (response.ok) {
        setTransactions(data.transactions);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  if (!currentUser) {
    return <h2></h2>;
  }

  return (
    <div>
      <h2>Your Transactions</h2>
      {transactions.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Expense Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.transaction_id}>
                <td>${tx.amount.toFixed(2)}</td>
                <td>{tx.expense_name}</td>
                <td>{new Date(tx.transaction_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions yet.</p>
      )}
    </div>
  );
}

export default Transactions;