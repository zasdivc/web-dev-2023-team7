import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk, updateUserThunk, profileByUIDThunk } from "../../services/auth-thunks";
import { findLikesByUserId } from "../../likes/likes-thunks";
import { getTrack } from "../music-service";
import {findCommentsByUserId} from "../../comment/comments-thunks";
import "./spotify-styles.css";
import {MusicList} from "../home/modules/main/components/MusicList";

function ProfileScreen() {
    const {currentUser} = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(currentUser);
    const [likes, setLikes] = useState([]);
    const [trackData, setTrackData] = useState([]);
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = () => {
        dispatch(updateUserThunk(profile));
    };

    const extractUIDFromURL = () => {
        const urlPath = window.location.pathname;
        const uidRegex = /\/profile\/(\w+)/;
        const match = urlPath.match(uidRegex);
      
        return match && match[1] ? match[1] : null;
    };
      
    const uid = extractUIDFromURL();
    console.log("current user is " + currentUser); // This will print the extracted UID or null if not found in the URL
    console.log("uid is" + uid);
    if (uid === null && currentUser === null) {
        navigate("/login");
    }
    console.log(uid); // This will print the extracted UID or null if not found in the URL
    let isCurrentUser = false;
    let hasCurrentUser = currentUser != null;
    if (hasCurrentUser) {
        console.log("currentUser id is" + currentUser._id);
        isCurrentUser = uid === currentUser._id;
    }

    console.log(profile)

    useEffect(() => {
        const asyncFetchData = async () => {
            const {payload} = uid ? await dispatch(profileByUIDThunk(uid)) : await dispatch(profileThunk());
            setProfile(payload);

            const likes = await dispatch(findLikesByUserId(payload._id));
            setLikes(likes.payload);
        }
        asyncFetchData();
    }, []);

    useEffect(() => {
        const fetchTrackData = async () => {
            if (likes.length > 0) {
                const tracks = await Promise.all(
                    likes.map((like) => getTrack(like.trackId))
                );
                setTrackData(tracks);
            }
        };
        fetchTrackData();
    }, [likes]);

    useEffect(() => {
        const fetchUserComments = async () => {
            if (profile && profile._id) {
                const commentsResult = await dispatch(findCommentsByUserId(profile._id));
                setComments(commentsResult.payload);
            }
        };
        fetchUserComments();
    }, [profile]);



    console.log(likes)
    console.log(trackData)
    return (
        <div className="spotify-container">
            <h1 className="spotify-heading">Profile Screen</h1>
            <div className="profile-content">
                <div className="profile-info">
                    {profile && (
                        <>
                            <div className="spotify-input-group">
                                <label className="spotify-input-label">Username</label>
                                <input className="spotify-input readOnly" type="text" readOnly
                                       value={profile.username}/>
                            </div>
                            {(isCurrentUser || !uid) && (
                            <div className="spotify-input-group">
                                <label className="spotify-input-label">Password</label>
                                <input className="spotify-input readOnly" type="text" readOnly
                                       value={profile.password}/>
                            </div>
                            )}
                            <div className="spotify-input-group">
                                <label className="spotify-input-label">Role</label>
                                <input className="spotify-input readOnly" type="text" readOnly value={profile.role}/>
                            </div>
                            {(isCurrentUser || !uid) && (
                            <div className="spotify-input-group">
                                <label className="spotify-input-label">Email</label>
                                <input className="spotify-input" type="email"
                                       value={profile.email}
                                       onChange={(event) => {
                                           const newProfile = {
                                               ...profile,
                                               email: event.target.value,
                                           };
                                           setProfile(newProfile);
                                       }}
                                />
                            </div>
                            )}
                            {(isCurrentUser || !uid) && (
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
                            )}
                            {(isCurrentUser || !uid) && (
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
                            )}
                        </>
                    )}
                    {currentUser && (
                        <button className="spotify-button"
                                onClick={() => {
                                    dispatch(logoutThunk());
                                    navigate("/login");
                                }}>
                            Logout
                        </button>
                    )}
                    <button className="spotify-button" onClick={save}>Save</button>
                    <button className="spotify-button" onClick={() => navigate("/")}>Home</button>
                </div>
                {hasCurrentUser && (
                <div className="user-activity-container">
                    <div className="likes-container">
                         <MusicList title="Likes" data={trackData} />
                    </div>
                    <div className="comments-container">
                        <h4 className="spotify-heading">Comments</h4>
                        <ul>
                            {comments.map((comment, index) => (
                                <li key={index}>
                                    <input
                                        type="text"
                                        value={comment.comment}
                                        className="spotify-input comment-textbox"
                                        onClick={() => {
                                            navigate(`/music/track/${comment.trackId}`);
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}
export default ProfileScreen;

