import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../services/auth-thunks";
import "./spotify-styles.css";

function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("User");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await dispatch(registerThunk({ username, password, firstName, lastName, email, role }));
            navigate("/login");
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div className="spotify-container">
            <h1 className="spotify-heading">Register Screen</h1>
            <div className="spotify-input-group">
                <label className="spotify-input-label">Username</label>
                <input
                    className="spotify-input"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="spotify-input-group">
                <label className="spotify-input-label">Password</label>
                <input
                    className="spotify-input"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div  className="spotify-input-group">
                <label className="spotify-input-label">Confirm Password</label>
                <input
                    className="spotify-input"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
            </div>
            <div className="spotify-input-group">
                <label className="spotify-input-label">First Name</label>
                <input
                    className="spotify-input"
                    type="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div className="spotify-input-group">
                <label className="spotify-input-label">Last Name</label>
                <input
                    className="spotify-input"
                    type="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div className="spotify-input-group">
                <label className="spotify-input-label">Email</label>
                <input
                    className="spotify-input"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="spotify-input-group">
        <label className="spotify-input-label">Role</label>
        <div>
          <input
            type="radio"
            id="user"
            name="role"
            value="user"
            checked={role === "user"}
            onChange={(event) => setRole(event.target.value)}
          />
          <label htmlFor="user">User</label>
        </div>
        <div>
          <input
            type="radio"
            id="admin"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={(event) => setRole(event.target.value)}
          />
          <label htmlFor="admin">Admin</label>
        </div>
        <div>
          <input
            type="radio"
            id="moderator"
            name="role"
            value="moderator"
            checked={role === "moderator"}
            onChange={(event) => setRole(event.target.value)}
          />
          <label htmlFor="moderator">Moderator</label>
        </div>
      </div>
            <button className="spotify-button" onClick={handleRegister}>
                Register
            </button>
            <button className="spotify-button" onClick={() => (navigate("/login"))}>
                Back to Login
            </button>
            <button className="spotify-button" onClick={() => (navigate("/main"))}>
                Home
            </button>
        </div>
    );
}

export default RegisterScreen;