import {useSelector} from "react-redux";
import "./track.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getArtist, getArtistTopTracks, getTrack } from "./music-service";
import CommentList from "../comment/CommentList";
import AddComment from "../comment/AddComment";


function TrackDetailsScreen() {
  const { id } = useParams();
  const [track, setTrack] = useState({});
  const [artist, setArtist] = useState({});
  const [artistTracks, setArtistTracks] = useState([]);
  const { currentUser } = useSelector((state) => state.auth);
  console.log("current user" + currentUser);
  const fetchTrack = async () => {
    const response = await getTrack(id);
    console.log("get track response");
    console.log(JSON.stringify(response, null, 2));
    setTrack(response);
  };

  const fetchArtist = async () => {
    if (track.album === undefined) {
      return;
    }
    // console.log("fetching artist");
    const response = await getArtist(track.album.artists[0].id);
    // console.log("get artist response");
    // console.log(JSON.stringify(response, null, 2));
    setArtist(response);
  };

  const fetchArtistTracks = async () => {
    if (track.album === undefined) {
      return;
    }
    console.log("fetching artist tracks");
    const response = await getArtistTopTracks(track.album.artists[0].id);
    console.log("get artist tracks response");
    console.log(JSON.stringify(response, null, 2));
    setArtistTracks(response);
  };

  useEffect(() => {
    // console.log("fetching track");
    fetchTrack();
  }, [id]);

  useEffect(() => {
    // console.log("fetching artist and its tracks");
    fetchArtist();
    fetchArtistTracks();
  }, [track]);

  // console.log("rendering track");
  // console.log(JSON.stringify(track, null, 2));
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
            <i className="bi bi-heart size-40 ms-4 text-muted"></i>
          </div>

          <h2 className="mt-5 mb-4">
            Popular tracks by {track.album.artists[0].name}
          </h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Album</th>
                  <th scope="col">Preview</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {artistTracks.map((artistTrack, index) => (
                  <tr key={index}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">
                      <img
                        className="float-start"
                        width="40px"
                        height="40px"
                        src={artistTrack.album.images[1].url}
                      />
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/music/track/${artistTrack.id}`}
                      >
                        <span
                          style={{ color: "#fff" }}
                          className="size-20 ms-2"
                        >
                          {artistTrack.name}
                        </span>
                      </Link>
                    </td>
                    <td className="align-middle">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/music/album/${artistTrack.album.id}`}
                      >
                        <span style={{ color: "#fff" }}>
                          {artistTrack.album.name}
                        </span>
                      </Link>
                    </td>
                    <td className=" d-flex  align-items-center">
                      <audio
                        className="float-start"
                        controls
                        src={artistTrack.preview_url}
                      ></audio>
                      <i className="bi bi-heart size-20 ms-4 text-muted"></i>
                    </td>
                    <td className="align-middle">
                      {Math.floor(artistTrack.duration_ms / 60000)}:
                      {Math.floor((artistTrack.duration_ms % 60000) / 1000)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h1>Comments</h1>
            <AddComment />
            <CommentList />
          </div>
          {/*<pre>{JSON.stringify(track, null, 2)}</pre>*/}
          {/*<p>{JSON.stringify(artist, null, 2)}</p>*/}
          {/*<pre>{JSON.stringify(artistTracks, null, 2)}</pre>*/}
        </div>
      )}
    </div>
  );
}

export default TrackDetailsScreen;
