import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTrack } from "./music-service";

function TrackDetailsScreen() {
    const { id } = useParams();
    const [track, setTrack] = useState({});
    const fetchTrack = async () => {
        const response = await getTrack(id);
        console.log("get track response");
        console.log(JSON.stringify(response, null, 2));
        setTrack(response);
    };
    useEffect(() => {
        console.log("fetching track");
        fetchTrack();
    }, []);
    console.log("rendering track");
    console.log(JSON.stringify(track, null, 2))
    return (
        <div>{
            track.album !== undefined && <div>
            <img src={track.album.images[1].url}/>
                <h1>{track.name}</h1>
                <h1>{track.album.album_type}</h1>
                <h2>{track.album.artists[0].name}</h2>
                <h2>{track.album.artists[0].id}</h2>
                <h2>{track.album.name}</h2>
                <h2>{track.album.release_date}</h2>
                <h2>{track.album.total_tracks} songs</h2>
                <h2>{track.album.id}</h2>
                <h2>{Math.floor(track.duration_ms / 60000)} minutes {Math.floor((track.duration_ms % 60000) / 1000)} seconds</h2>
                <pre>{JSON.stringify(track, null, 2)}</pre>
            </div>
        }
        </div>
    );
}

export default TrackDetailsScreen;
