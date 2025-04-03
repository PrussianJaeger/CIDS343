import { Link } from "react-router-dom";

export function Navbar() {

    return (

        <>
            <Link to="/">
                <button>Home</button>
            </Link>

            <Link to="/account">
                <button>Account</button>
            </Link>

            <Link to="/learn">
                <button>Learn</button>
            </Link>

            <Link to="/settings">
                <button>Settings</button>
            </Link>

        </>

    )

}

export default Navbar;