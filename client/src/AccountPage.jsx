import SignOut from "./SignOut";
import ChangePassEmail from "./ChangePassEmail";

import { UserContext } from "./UserContext";
import CurrentUser from "./CurrentUser";

function AccountPage() {
  return (
    <>
      <div className="accountpage">
        <h1>Account Page</h1>
        <CurrentUser></CurrentUser>
        <ChangePassEmail></ChangePassEmail>
        <SignOut></SignOut>
      </div>
    </>
  );
}

export default AccountPage;