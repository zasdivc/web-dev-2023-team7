import React, { useState, useEffect } from 'react';
import {getTrackImage} from "../music/music-service";

export default function TrackImageComponent({trackId}) {
    const [trackImage, setTrackImage] = useState({});
    const fetchTrackImage = async () => {
        const response = await getTrackImage(trackId);
        setTrackImage(response);
    }
    useEffect(() => {
        fetchTrackImage();
    }, [trackId]);
    return (
        <div>
            <img width="30px" height="30px" src={trackImage} />
        </div>
    );
}