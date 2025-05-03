function ChangePassEmail() {

  const changeEmail = async() => {
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

  }

  const changePassword = async() => {

  }

  return (
    <>
      <div className="change">
        <button>Change Password</button>
        <button>Change Email</button>
      </div>
    </>
  );
}

export default ChangePassEmail;