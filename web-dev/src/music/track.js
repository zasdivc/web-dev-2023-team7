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
                        <span className="size-20">{track.album.artists[0].name} </span>
                        <i className="bi bi-dot bi-4x"></i>
                        <span className="size-20">{track.album.release_date.split('-')[0]}</span>
                        <i className="bi bi-dot bi-4x"></i>
                        <span className="size-20">{Math.floor(track.duration_ms / 60000)} : {Math.floor((track.duration_ms % 60000) / 1000)} </span>
                    </div>
                </div>

                <div>
                    Hw
                </div>
                <pre>{JSON.stringify(track, null, 2)}</pre>

            </div>
            }
        </div>
    );
}

export default TrackDetailsScreen;
