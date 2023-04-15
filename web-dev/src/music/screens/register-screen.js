import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../services/auth-thunks";

function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await dispatch(registerThunk({ username, password, firstName, lastName }));
            navigate("/login");
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div>
            <h1>Register Screen</h1>
            <div>
                <label>Username</label>
                <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    className="form-control"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
            </div>
            <div>
                <label>First Name</label>
                <input
                    className="form-control"
                    type="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    className="form-control"
                    type="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

export default RegisterScreen;