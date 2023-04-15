import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getArtist, getArtistTopTracks, getTrack} from "./music-service";

function TrackDetailsScreen() {
    const { id } = useParams();
    const [track, setTrack] = useState({});
    const [artist, setArtist] = useState({});
    const [artistTracks, setArtistTracks] = useState([]);
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
        console.log("fetching artist");
        const response = await getArtist(track.album.artists[0].id);
        console.log("get artist response");
        console.log(JSON.stringify(response, null, 2));
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
    }

    useEffect(() => {
        console.log("fetching track");
        fetchTrack();
    }, []);

    useEffect(() => {
        console.log("fetching artist and its tracks");
        fetchArtist();
        fetchArtistTracks();
    }, [track]);

    console.log("rendering track");
    console.log(JSON.stringify(track, null, 2))
    return (
        <div className="m-3">{
            track.album !== undefined &&
            <div>
                <div className="row">
                    <div className="col-3 align-items-end">
                        <img className="float-start" width="100%" src={track.album.images[1].url}/>
                    </div>
                    <div className="col-9 align-self-end">
                        <span className="size-20">Song</span>
                        <h1 className="mt-4 mb-4 size-60">{track.name}</h1>
                        <div>
                            {artist.images !== undefined && <img className="float-start rounded-circle" width="30px" height="30px" src={artist.images[1].url}/>}
                            <span className="size-20 ms-2">{track.album.artists[0].name} </span>
                            <i className="bi bi-dot bi-4x"></i>
                            <span className="size-20">{track.album.release_date.split('-')[0]}</span>
                            <i className="bi bi-dot bi-4x"></i>
                            <span className="size-20">{Math.floor(track.duration_ms / 60000)} : {Math.floor((track.duration_ms % 60000) / 1000)} </span>
                        </div>
                    </div>
                </div>

                <div>
                    <i className="bi bi-play-circle-fill text-primary size-60"></i>
                    <i className="bi bi-heart size-40 ms-4 text-muted"></i>
                </div>
                <pre>{JSON.stringify(track, null, 2)}</pre>
                {/*<p>{JSON.stringify(artist, null, 2)}</p>*/}
                {/*<pre>{JSON.stringify(artistTracks, null, 2)}</pre>*/}

            </div>
            }
        </div>
    );
}

export default TrackDetailsScreen;
