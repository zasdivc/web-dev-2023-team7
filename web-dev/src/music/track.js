import {useSelector} from "react-redux";
import "./track.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getArtist, getArtistTopTracks, getTrack } from "./music-service";
import {createLike, deleteLike, findLikesByTrackIdAndUserId} from "../likes/likes-service";
import {createComment, deleteComment, findCommentsByTrackId} from "../comment/comments-service";
import Tracklist from "./components/PopularTracks/tracklist";

function TrackDetailsScreen() {
  const { id } = useParams();
  const [track, setTrack] = useState({});
  const [artist, setArtist] = useState({});
  const [artistTracks, setArtistTracks] = useState([]);
  const { currentUser } = useSelector((state) => state.auth);
  const [like, setLike] = useState([]);
  const [commentsArray, setCommentsArray] = useState([]);
  console.log("current user" + JSON.stringify(currentUser, null, 2));
  let [comment, setComment] = useState('');
  const fetchTrack = async () => {
    console.log("fetching track");
    const response = await getTrack(id);
    console.log("get track response");
    console.log(JSON.stringify(response, null, 2));
    setTrack(response);
  };

  const postComment = async () => {
    console.log("post comment");
    const createdComment = {
      user: currentUser._id,
      username: currentUser.username,
      role: currentUser.role,
      trackId: id,
      trackName: track.name,
      comment: comment
    };
    console.log(createdComment);
    const newComment = await createComment(createdComment);
    setCommentsArray([...commentsArray, newComment]);
  };

  const deleteCommentHandler = async (id) => {
    await deleteComment(id);
    setCommentsArray(commentsArray.filter((comment) => comment._id !== id));
  }
  const fetchLike = async () => {
    console.log("fetching like");
    const response = await findLikesByTrackIdAndUserId(id, currentUser._id);
    console.log("get like response" + JSON.stringify(response, null, 2));
    setLike(response);
    console.log("like length" + response.length);
  }

  const diskLike = async () => {
    console.log("deleting like");
    await deleteLike(like[0]._id);
    setLike([]);
  }

  const clickLike = async () => {
    console.log("creating like");

    const createdLike = {
      user: currentUser._id,
      trackId: id,
      trackName: track.name,
    };
    const newLike = await createLike(createdLike);
     setLike([...like, newLike]);
  }


  // useEffect(() => {
  //   fetchLike();
  // },[like]);


  const fetchArtist = async () => {
    console.log("fetching artist");
    if (track.album === undefined) {
      return;
    }
    const response = await getArtist(track.album.artists[0].id);
    setArtist(response);
  };

  const fetchArtistTracks = async () => {
    console.log("fetching artist tracks");
    if (track.album === undefined) {
      return;
    }
    console.log("fetching artist tracks");
    const response = await getArtistTopTracks(track.album.artists[0].id);
    console.log("get artist tracks response");
    console.log(JSON.stringify(response, null, 2));
    setArtistTracks(response);
  };

  const fetchCommentsByTrackId = async () => {
    console.log("fetch comments by track id");
    const comments = await findCommentsByTrackId(id);
    console.log(comments);
    setCommentsArray(comments);
  }

  useEffect(() => {
    fetchTrack();
    fetchCommentsByTrackId();
    fetchLike();
  }, [id]);

  useEffect(() => {
    fetchArtist();
    fetchArtistTracks();
  }, [track]);

  return (
    <div className="m-3 track">
      {track.album !== undefined && (
        <div>
          <div className="row">
            <div className="col-3 align-items-end">
              <img
                className="float-start"
                width="100%"
                src={track.album.images[1].url}
              />
            </div>
            <div className="col-9 align-self-end">
              <span className="size-20">Song</span>
              <h1 className="mt-4 mb-4 size-60">{track.name}</h1>
              <div>
                {artist.images !== undefined && (
                  <img
                    className="float-start rounded-circle"
                    width="30px"
                    height="30px"
                    src={artist.images[1].url}
                  />
                )}
                <span className="size-20 ms-2">
                  {track.album.artists[0].name}{" "}
                </span>
                <i className="bi bi-dot bi-4x"></i>
                <span className="size-20">
                  {track.album.release_date.split("-")[0]}
                </span>
                <i className="bi bi-dot bi-4x"></i>
                <span className="size-20">
                  {Math.floor(track.duration_ms / 60000)}:
                  {Math.floor((track.duration_ms % 60000) / 1000)}{" "}
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex  align-items-center mt-3">
            <audio controls src={track.preview_url}></audio>
            {like.length > 0 ? <i className="bi bi-heart-fill size-40 ms-4 text-danger" onClick={() => diskLike()}> </i> : <i className="bi bi-heart size-40 ms-4 text-muted" onClick={() => clickLike()}> </i>}          </div>

          <h2 className="mt-5 mb-4">
            Popular tracks by {track.album.artists[0].name}
          </h2>
          <Tracklist artistTracks={artistTracks} />
          <h1>Comments</h1>

          <div className="row">
            <div className="col-auto">
              <img className="rounded-circle" src="/images/default.JPG" width={50}/>
            </div>
            <div className="col-10">
                <textarea value={comment} placeholder="Type your comment about this track!"
                          className="form-control"
                          onChange={(event) => setComment(event.target.value)}>
                </textarea>
              <div>
                <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                        onClick={postComment}>
                  Comment
                </button>
              </div>
            </div>
            <div className="col-12"><hr/></div>
          </div>

          <div>
            <ul className="list-group">
              {
                commentsArray.map(comment =>
                    <li className="list-group-item  pt-2 pb-2">
                      <img className="rounded-circle float-start me-5"
                           width="50px" height="50px"
                           src="/images/default.JPG"/>

                      {currentUser.role === 'admin'&&<i className="bi bi-x-lg float-end"
                                                       onClick={() => deleteCommentHandler(comment._id)}></i>}
                      <Link to={`/profile/${comment.user}`} onClick={() => console.log("Username clicked")}>
                      <span className={`${comment.role === "admin" ? "text-danger" : (comment.role  === "moderator" ? "text-primary" : "")}`}>
                        <span className="fw-bold me-3">{comment.username}</span><i className="bi bi-patch-check-fill"></i>
                    </span>
                    </Link>
                      <span className="text-muted"> {comment.createdAt.split("T")[0]} {comment.createdAt.split("T")[1].split(".")[0]}</span>
                      <br/>
                      <div className={`${comment.role === "admin" ? "text-danger" : (comment.role  === "premium" ? "text-primary" : "")}`}>
                        {comment.comment}
                      </div>
                    </li>
                )
              }
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackDetailsScreen;
