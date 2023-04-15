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
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await dispatch(registerThunk({ username, password, firstName, lastName, email }));
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
            <button className="spotify-button" onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

export default RegisterScreen;