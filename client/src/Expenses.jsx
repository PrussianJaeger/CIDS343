import React, { useState } from 'react';

function Expenses() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);

    // Replace with your actual API endpoint
    fetch('/add-transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log('Success:', data))
    .catch(err => console.error('Error:', err));
  };

  return (
    <>
      <h2>Enter Expense</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Transaction</button>
      </form>
    </>
  );
}

export default Expenses;