import SignIn from "./SignIn";
import SignUp from "./SignUp";

function AccountPage() {
  return (
    <>
      <div className="accountpage">
        <h1>Account Page</h1>
        <SignUp></SignUp>
        <SignIn></SignIn>
      </div>
    </>
  );
}

export default AccountPage;