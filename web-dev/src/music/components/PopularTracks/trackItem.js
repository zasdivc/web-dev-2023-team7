import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {createLike, deleteLike, findLikesByTrackIdAndUserId} from "../../../likes/likes-service";
import {useEffect, useState} from "react";

const TrackItem = ({ index, artistTrack }) => {
    const { currentUser } = useSelector((state) => state.auth);
    const [like, setLike] = useState([]);
    const fetchLike = async () => {
        console.log("fetching like");
        const response = await findLikesByTrackIdAndUserId(artistTrack.id, currentUser._id);
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
            trackId: artistTrack.id,
            trackName: artistTrack.name,
        };
        const newLike = await createLike(createdLike);
        setLike([...like, newLike]);
    }

    useEffect(() => {
      fetchLike();
    },[index]);

    return (
        <tr>
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
                {like.length > 0 ? <i className="bi bi-heart-fill size-20 ms-4 text-danger" onClick={() => diskLike()}> </i> : <i className="bi bi-heart size-20 ms-4 text-muted" onClick={() => clickLike()}> </i>}
            </td>
            <td className="align-middle">
                {Math.floor(artistTrack.duration_ms / 60000)}:
                {Math.floor((artistTrack.duration_ms % 60000) / 1000)}
            </td>
        </tr>
    );
}

export default TrackItem;