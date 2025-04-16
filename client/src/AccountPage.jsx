import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import { UserContext } from "./UserContext";
import CurrentUser from "./CurrentUser";

function AccountPage() {
  return (
    <>
      <div className="accountpage">
        <h1>Account Page</h1>
        <CurrentUser></CurrentUser>
        <SignOut></SignOut>
      </div>
    </>
  );
}

export default AccountPage;