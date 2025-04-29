import React, { useState, useContext } from 'react';
import { UserContext } from "./UserContext";

function Expenses() {
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    amount: '',
    expense_name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);

    try {
      const response = await fetch("http://localhost:5001/add-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: formData.amount,
          expense_name: formData.expense_name,
          user_id: currentUser.id, // pass user_id!
        }),
      });

      const data = await response.json();
      console.log('Transaction response:', data);

      if (response.ok) {
        window.location.reload();
      } else {
        alert(data.error || "Failed to add transaction.");
      }

    } catch (err) {
      console.error('Error submitting transaction:', err);
      alert("An error occurred while adding the transaction.");
    }
  };

  if (!currentUser) {
    return <h2>Log In to add and view transactions.</h2>;
  }

  return (
    <div>
      <h2>Enter Expense</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Expense Name:</label><br />
          <input
            type="text"
            name="expense_name"
            value={formData.expense_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label><br />
          <input
            type="number"
            step="0.01"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default Expenses;