import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getAlbum} from "./music-service";

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
        <div>
            <div>{
                album.images !== undefined && <div>
                    <img src={album.images[1].url}/>
                    <h1>{album.name}</h1>
                    <h1>{album.artists[0].name}</h1>
                    <h1>{album.release_date}</h1>
                    <h1>{album.total_tracks} songs</h1>
                    <h1>{album.id}</h1>
                    <pre>{JSON.stringify(album, null, 2)}</pre>
                </div>
            }
            </div>
        </div>

    );
}

export default AlbumDetailScreen;
