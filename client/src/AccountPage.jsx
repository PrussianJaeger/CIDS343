import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./SignOut";

function AccountPage() {
  return (
    <>
      <div className="accountpage">
        <h1>Account Page</h1>
        <SignUp></SignUp>
        <SignIn></SignIn>
        <SignOut></SignOut>
      </div>
    </>
  );
}

export default AccountPage;