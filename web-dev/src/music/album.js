import "./album.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAlbum, getTrackImage } from "./music-service";
import TrackImageComponent from "../component/trackImageComponent";

function AlbumDetailScreen() {
  const { id } = useParams();
  const [album, setAlbum] = useState({});
  const fetchAlbum = async () => {
    const response = await getAlbum(id);
    setAlbum(response);
  };
  useEffect(() => {
    fetchAlbum();
  }, []);
  return (
    <div className="m-3 album">
      {album.images !== undefined && (
        <div>
          <div className="row">
            <div className="col-3 align-items-end">
              <img
                className="float-start"
                width="100%"
                src={album.images[1].url}
              />
            </div>
            <div className="col-9 align-self-end">
              <span className="size-20">Single</span>
              <h1 className="mt-4 mb-4 size-60">{album.name}</h1>
              <span className="size-20">{album.artists[0].name}</span>
              <i className="bi bi-dot bi-4x"></i>
              <span className="size-20">
                {album.release_date.split("-")[0]}
              </span>
              <i className="bi bi-dot bi-4x"></i>
              <span className="size-20">{album.total_tracks} songs</span>
            </div>
          </div>

          <h2 className="mt-5 mb-4">Tracks in this album</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Preview</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {album.tracks.items.map((albumTrack, index) => (
                  <tr key={index}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">
                      <Link
                        to={`/music/track/${albumTrack.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        <span
                          className="size-20 ms-2"
                          style={{ color: "#fff" }}
                        >
                          {albumTrack.name}
                        </span>{" "}
                      </Link>
                      {/*<span className="size-20 ms-2">{albumTrack.id}</span>*/}
                    </td>
                    <td className=" d-flex align-items-center">
                      <audio
                        className="float-start"
                        controls
                        src={albumTrack.preview_url}
                      ></audio>
                    </td>
                    <td className="align-middle">
                      {Math.floor(albumTrack.duration_ms / 60000)}:
                      {Math.floor((albumTrack.duration_ms % 60000) / 1000)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*<pre>{JSON.stringify(album, null, 2)}</pre>*/}
        </div>
      )}
    </div>
  );
}

export default AlbumDetailScreen;
