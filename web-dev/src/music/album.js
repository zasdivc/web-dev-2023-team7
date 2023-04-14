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
                <pre>{JSON.stringify(album, null, 2)}</pre>
            </div>

    );
}

export default AlbumDetailScreen;
