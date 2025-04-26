import { useNavigate, Link } from "react-router";
import * as usersAPI from "../../utilities/users-api";

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    function handleLogout() {
        usersAPI.logout();
        setUser(null);
        navigate("/");
    }

    if (user) {
        return (
            <>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/finches">All Finches</Link></li>
                <li><Link to="/finches/new">New Finch</Link></li>
                <li><Link to="/toys/new">Add a Toy</Link></li>
                <li><Link to="/toys">All Toys</Link></li>
                <form id="logout-form" onSubmit={handleLogout}>
                    <button type="submit">Log out</button>
                </form>
            </>
        );
    }
    if (!user) {
        return (
            <>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </>
        );
    }
}
