import React, { useContext } from "react";
import { UserContext } from "./UserContext";

const CurrentUser = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {currentUser ? (
        <p>Welcome, {currentUser.email}!</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};

export default CurrentUser;