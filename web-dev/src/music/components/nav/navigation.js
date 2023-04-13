import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navigation() {
    const { currentUser } = useSelector((state) => state.auth);
    return (
        <div>
            <Link to="/">Home</Link>|
            <Link to="/house">House</Link>|
            <Link to="/todos">ToDos</Link> |
            <Link to="/todos-redux">Todos Redux</Link>|
            <Link to="/tuits">Tuits</Link>|
            {!currentUser && <Link to="/login">Login</Link>} |
            {!currentUser && <Link to="/register">Register</Link>} |
            {currentUser  && <Link to="/profile">Profile</Link>} |
            {currentUser  && currentUser.isAdmin
                && <Link to="/admin">Admin</Link>}
        </div>
    );
}
export default Navigation;