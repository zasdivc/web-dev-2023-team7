import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../services/auth-thunks";
import "./spotify-styles.css";

function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        try {
            let response = await dispatch(loginThunk({ username, password }));
            if (response.type && response.type == "users/login/rejected") {
                alert("wrong information");
                navigate("/login");
            } else {
                navigate("/profile");
            }
          } catch (e) {
            console.log(e);
          }
    };
    return (
        <div className="spotify-container">
            <h1 className="spotify-heading">Login Screen</h1>
            <div className="spotify-input-group">
                <label className="spotify-input-label" >Username</label>
                <input className="spotify-input"
                       type="text" value={username}
                       onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="spotify-input-group">
                <label className="spotify-input-label">Password</label>
                <input className="spotify-input"
                       type="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button className="spotify-button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );

}
export default LoginScreen;