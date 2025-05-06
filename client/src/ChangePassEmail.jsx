import { useState } from "react";
import AuthPopup from "./components/AuthPopup"; 

function ChangePassEmail() {
  const [popupType, setPopupType] = useState(null); 
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const closePopup = () => {
    setPopupType(null);
    setNewPassword("");
    setNewEmail("");
  };

  const changePassword = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password: newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Password changed successfully");
      closePopup();
    } else {
      alert(data.error || "Password change failed");
    }
  };

  const changeEmail = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/change-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: newEmail }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Email changed successfully");
      closePopup();
    } else {
      alert(data.error || "Email change failed");
    }
  };

  return (
    <>
      <div className="change">
        <button className="auth-button setting-buttons" onClick={() => setPopupType("password")}>
          Change Password
        </button>
        <button className="auth-button setting-buttons" onClick={() => setPopupType("email")}>
          Change Email
        </button>
      </div>

      <AuthPopup isOpen={!!popupType} onClose={closePopup}>
        <h2>{popupType === "password" ? "Change Password" : "Change Email"}</h2>
        <form onSubmit={popupType === "password" ? changePassword : changeEmail}>
          {popupType === "password" ? (
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          ) : (
            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          )}
          <button type="submit">
            {popupType === "password" ? "Submit Password" : "Submit Email"}
          </button>
        </form>
      </AuthPopup>
    </>
  );
}

export default ChangePassEmail;