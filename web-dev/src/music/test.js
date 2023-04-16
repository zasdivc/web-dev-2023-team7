import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    getAlbum,
    getNewReleasedAlbums,
    getTrackImage,
    getTrackRecommendations,
    searchAlbumsAndTracks
} from "./music-service";
import TrackImageComponent from "../component/trackImageComponent";

function TestScreen() {
    const [newReleasedAlbums, setNewReleasedAlbums] = useState([]);
    const [recommendation, setRecommendations] = useState([]);
    const [searchResults, setSearchResults] = useState({});

    const fetchRecommendations = async () => {
        const response = await getTrackRecommendations();
        setRecommendations(response);
    };

    const fetchNewReleases = async () => {
        const response = await getNewReleasedAlbums();
        setNewReleasedAlbums(response);
    }

    const fetchSearch = async () => {
        const response = await searchAlbumsAndTracks("La Bebe");
        setSearchResults(response);
    }

    useEffect(() => {
        fetchRecommendations();
        fetchNewReleases();
        fetchSearch();
    }, []);
    return (
        <div>

            <pre>{JSON.stringify(newReleasedAlbums, null, 2)}</pre>
            <pre>{JSON.stringify(recommendation, null, 2)}</pre>
            <pre>{JSON.stringify(searchResults, null, 2)}</pre>
        </div>

    );
}

export default TestScreen;
