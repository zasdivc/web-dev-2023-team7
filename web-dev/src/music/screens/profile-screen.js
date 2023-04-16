import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk } from "../../services/auth-thunks";
import "./spotify-styles.css";

function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = () => { dispatch(updateUserThunk(profile)); };

    console.log(profile)

    useEffect(() => {
        const asyncFetchData = async () => {
            const { payload } = await dispatch(profileThunk());
            setProfile(payload);
        }
        asyncFetchData();
    }, []);

    return (
        <div className="spotify-container">
            <h1 className="spotify-heading">Profile Screen</h1>
            {profile && (
                <div>
                    <div className="spotify-input-group">
                        <label className="spotify-input-label">First Name</label>
                        <input className="spotify-input" type="text"
                               value={profile.firstName}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       firstName: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                    <div className="spotify-input-group">
                        <label className="spotify-input-label">Last Name</label>
                        <input className="spotify-input" type="text"
                               value={profile.lastName}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile,
                                       lastName: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}
                        />
                    </div>
                </div>
            )}
            <button className="spotify-button"
                    onClick={() => {
                        dispatch(logoutThunk());
                        navigate("/login");
                    }}>
                Logout
            </button>
            <button className="spotify-button" onClick={save}>Save</button>
        </div>
    );
}

export default ProfileScreen;